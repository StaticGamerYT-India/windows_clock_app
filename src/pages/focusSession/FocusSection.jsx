import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import Play from "../../assets/icons/Play";
import Stop from "../../assets/icons/Stop";
import GoBack from "../../assets/icons/Goback";
import ThreeDots from "../../assets/icons/ThreeDots";
import Check from "../../assets/icons/Check";
import plant from "../../assets/images/plant.png";
import { useDismissPopup } from "../../store/useDismissPopup";
import FocusSessionBar from "./FocusSessionBar";
import { motion, AnimatePresence } from 'framer-motion';

const FocusSection = () => {
  const currentTimePeriod = useRef(0);
  const timer = useRef(null);
  const lastNotificationTime = useRef(0);
  const { focusSession, toggleStartFocusSession } = useFullFocusSession();
  const { setShowDismiss, setShowTimeOnDismiss, setMainName, setName } = useDismissPopup();
  
  // Ensure focusSession has data before accessing it
  const initialSecs = focusSession.length > 0 ? focusSession[currentTimePeriod.current] * 60 : 0;
  const [secs, setSecs] = useState(initialSecs);
  const [playing, setPlaying] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showTime, setShowTime] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Properly calculate notification message with rate limiting
  const showSessionCompleteNotification = useCallback(() => {
    const now = Date.now();
    // Only show notification if 5 seconds have passed since the last one
    if (now - lastNotificationTime.current > 5000) {
      setPlaying(false);
      setName("You have finished your focus session");
      setMainName("Great job!");
      setShowTimeOnDismiss(false);
      setShowDismiss(true);
      lastNotificationTime.current = now;
    }
  }, [setName, setMainName, setShowDismiss, setShowTimeOnDismiss]);
  
  // Function to handle period transitions with rate limiting
  const handlePeriodTransition = useCallback((isBreak) => {
    const now = Date.now();
    // Only show notification if 5 seconds have passed since the last one
    if (now - lastNotificationTime.current > 5000) {
      setName(`Now starting ${isBreak ? 'break' : 'focus'} period`);
      setMainName(isBreak ? "Take a break!" : "Time to focus!");
      setShowTimeOnDismiss(true);
      setShowDismiss(true);
      lastNotificationTime.current = now;
    }
  }, [setName, setMainName, setShowDismiss, setShowTimeOnDismiss]);
  
  // Reset timer if focusSession changes
  useEffect(() => {
    if (focusSession.length > 0) {
      currentTimePeriod.current = 0;
      setSecs(focusSession[0] * 60);
      setPlaying(true);
    } else {
      clearInterval(timer.current);
      setPlaying(false);
      setSecs(0);
    }
    
    return () => clearInterval(timer.current);
  }, [focusSession]);

  // Handle timer countdown
  useEffect(() => {
    if (!playing || focusSession.length === 0) {
      clearInterval(timer.current);
      return;
    }
    
    // Clear any existing timer first
    clearInterval(timer.current);
    
    timer.current = setInterval(() => {
      setSecs(prev => {
        if (prev <= 1) {
          clearInterval(timer.current);
          const nextPeriodIndex = currentTimePeriod.current + 1;
          
          // If we've reached the end of the session
          if (nextPeriodIndex >= focusSession.length) {
            showSessionCompleteNotification();
            return 0;
          }
          
          // Move to next period
          currentTimePeriod.current = nextPeriodIndex;
          const nextDuration = focusSession[nextPeriodIndex] * 60;
          
          // Show period transition notification
          const isBreak = nextPeriodIndex % 2 !== 0;
          handlePeriodTransition(isBreak);
          
          return nextDuration;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer.current);
  }, [playing, focusSession, showSessionCompleteNotification, handlePeriodTransition]);

  // Timer display with improved visual feedback
  const timerDisplay = useMemo(() => {
    // Guard against accessing focusSession when empty or index out of bounds
    const currentDuration = focusSession.length > currentTimePeriod.current
                           ? focusSession[currentTimePeriod.current] * 60
                           : 1;
    const progressRatio = currentDuration > 0 ? (currentDuration - secs) / currentDuration : 0;
    const segmentsToShow = Math.floor(progressRatio * 24);

    const displayMinutes = Math.floor(secs / 60);
    const displaySeconds = secs % 60;

    return (
      <div className={`flex items-center justify-center relative bg-[#3c3c3c] rounded-full border-2 border-[#414141] shadow-md ${isMobile ? 'h-36 w-36' : 'h-48 w-48 md:h-64 md:w-64'}`}>
        <span className="flex items-baseline text-3xl md:text-5xl leading-tight">
          {showTime ? (
            <>
              {displayMinutes > 0 ? (
                <>
                  {displayMinutes}
                  <p className="text-lg md:text-2xl text-[#b8b8b8] ml-1">min</p>
                </>
              ) : (
                <>
                  {displaySeconds}
                  <p className="text-lg md:text-2xl text-[#b8b8b8] ml-1">sec</p>
                </>
              )}
            </>
          ) : (
            <img src={plant} className={`${isMobile ? 'h-24' : 'h-36'}`} alt="Plant illustration" />
          )}
        </span>
        
        {/* Timer segments showing progress */}
        {Array(24).fill(0).map((_, i) => (
          <div
            key={i}
            className={`absolute ${
              i < segmentsToShow ? "bg-customColor-blue" : "bg-[#494949]"
            } w-1.5 md:w-2 h-1 md:h-1.5 rounded-full`}
            style={{ 
              transform: `rotate(${i * 15}deg) translateX(${isMobile ? '65px' : '100px'})`,
              transformOrigin: "center"
            }}
          ></div>
        ))}
      </div>
    );
  }, [secs, showTime, focusSession, isMobile]);

  // Determine current period type safely
  const currentPeriodType = focusSession.length > 0 && currentTimePeriod.current < focusSession.length
                         ? (currentTimePeriod.current % 2 === 0 ? 'Focus' : 'Break')
                         : 'Focus';
  const totalFocusPeriods = focusSession.length > 0 ? Math.ceil(focusSession.length / 2) : 0;
  const currentFocusPeriodNumber = focusSession.length > 0 ? Math.floor(currentTimePeriod.current / 2) + 1 : 0;

  // Click outside handler for options menu
  useEffect(() => {
    if (!showOptions) return;
    
    const handleClickOutside = (e) => {
      if (!e.target.closest('.options-menu') && !e.target.closest('.options-button')) {
        setShowOptions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  return (
    <motion.div 
      className="focus-section flex flex-col items-center gap-4 md:gap-8 max-w-2xl mx-auto px-2 md:px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.header 
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h1 className="text-lg md:text-2xl font-semibold text-center">
          {currentPeriodType === 'Focus'
            ? `Focus period (${currentFocusPeriodNumber} of ${totalFocusPeriods})`
            : `Break time`}
        </h1>
        
        {/* Focus session progress bar */}
        <motion.div 
          className="mt-3 md:mt-4"
          initial={{ scaleX: 0.9, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <FocusSessionBar currentPeriod={currentTimePeriod.current} />
        </motion.div>
      </motion.header>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, type: "spring", stiffness: 200 }}
        className="relative"
      >
        {timerDisplay}
      </motion.div>
      
      <motion.div 
        className="flex gap-4 items-center justify-center w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={playing ? "Pause session" : "Resume session"}
          className="bg-customColor-blue p-3 md:p-4 rounded-full hover:bg-[#68aada] transition-colors shadow-md"
          style={{ touchAction: "manipulation" }}
          onClick={() => {
            setPlaying((prev) => !prev);
            setShowOptions(false);
          }}
        >
          {playing ? <Stop className="w-5 h-5 md:w-6 md:h-6"/> : <Play className="w-5 h-5 md:w-6 md:h-6"/>}
        </motion.button>
        
        <AnimatePresence>
          {!playing && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go back to session setup"
              onClick={() => {
                toggleStartFocusSession();
                setShowOptions(false);
              }}
              style={{ touchAction: "manipulation" }}
              className="bg-[#3e3e3e] p-3 md:p-4 rounded-full border border-[#494949] hover:bg-[#4f4f4f] transition-colors shadow-md"
            >
              <GoBack className="w-5 h-5 md:w-6 md:h-6"/>
            </motion.button>
          )}
        </AnimatePresence>
        
        <div className="relative">
          {/* Options menu with improved positioning and interaction */}
          <AnimatePresence>
            {showOptions && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full mb-3 right-0 flex flex-col items-start bg-[#2e2e2e] rounded-lg border border-[#252525] shadow-lg z-10 options-menu min-w-[180px]"
              >
                <button
                  onClick={() => setShowTime((prev) => !prev)}
                  className="flex items-center w-full text-left p-3 text-sm hover:bg-[#3b3b3b] rounded-lg transition-colors"
                  style={{ minHeight: "44px", touchAction: "manipulation" }}
                >
                  <div className="flex items-center justify-center w-6 h-6 mr-2">
                    {showTime && <Check className="w-4 h-4"/>}
                  </div>
                  Show time remaining
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="More options"
            onClick={() => setShowOptions((prev) => !prev)}
            style={{ touchAction: "manipulation" }}
            className="bg-[#3e3e3e] p-3 md:p-4 rounded-full border border-[#494949] hover:bg-[#4f4f4f] transition-colors shadow-md options-button"
          >
            <ThreeDots className="w-5 h-5 md:w-6 md:h-6"/>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FocusSection;