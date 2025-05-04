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

const FocusSection = () => {
  const currentTimePeriod = useRef(0);
  const timer = useRef(null);
  const { focusSession, toggleStartFocusSession } = useFullFocusSession();
  const { setShowDismiss, setShowTimeOnDismiss, setMainName, setName } = useDismissPopup();
  
  // Ensure focusSession has data before accessing it
  const initialSecs = focusSession.length > 0 ? focusSession[currentTimePeriod.current] * 60 : 0;
  const [secs, setSecs] = useState(initialSecs);
  const [playing, setPlaying] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [showTime, setShowTime] = useState(true);
  
  // Properly calculate notification message
  const showSessionCompleteNotification = useCallback(() => {
    setPlaying(false);
    setName("You have finished your focus session");
    setMainName("Great job!");
    setShowTimeOnDismiss(false);
    setShowDismiss(true);
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
    
    const startTimer = () => {
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
            setName(`Now starting ${isBreak ? 'break' : 'focus'} period`);
            setMainName(isBreak ? "Take a break!" : "Time to focus!");
            setShowTimeOnDismiss(true);
            setShowDismiss(true);
            
            // Restart the timer
            setTimeout(startTimer, 300);
            return nextDuration;
          }
          return prev - 1;
        });
      }, 1000);
    };
    
    startTimer();
    return () => clearInterval(timer.current);
  }, [playing, focusSession, showSessionCompleteNotification, setName, setMainName, setShowDismiss, setShowTimeOnDismiss]);

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
      <div className="flex items-center justify-center relative bg-[#3c3c3c] h-64 w-64 rounded-full border-2 border-[#414141] shadow-md">
        <span className="flex items-baseline text-5xl leading-tight">
          {showTime ? (
            <>
              {displayMinutes > 0 ? (
                <>
                  {displayMinutes}
                  <p className="text-2xl text-[#b8b8b8] ml-1">min</p>
                </>
              ) : (
                <>
                  {displaySeconds}
                  <p className="text-2xl text-[#b8b8b8] ml-1">sec</p>
                </>
              )}
            </>
          ) : (
            <img src={plant} className="h-36" alt="Plant illustration" />
          )}
        </span>
        
        {/* Timer segments showing progress */}
        {Array(24).fill(0).map((_, i) => (
          <div
            key={i}
            className={`absolute ${
              i < segmentsToShow ? "bg-customColor-blue" : "bg-[#494949]"
            } w-5 h-1.5 rounded-full transform`}
            style={{ 
              transform: `rotate(${i * 15}deg) translateX(100px)`,
              transformOrigin: "center"
            }}
          ></div>
        ))}
      </div>
    );
  }, [secs, showTime, focusSession]);

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
    <div className="focus-section flex flex-col items-center gap-8 max-w-2xl mx-auto">
      <header className="w-full">
        <h1 className="text-2xl font-semibold text-center md:text-left">
          {currentPeriodType === 'Focus'
            ? `Focus period (${currentFocusPeriodNumber} of ${totalFocusPeriods})`
            : `Break time`}
        </h1>
        
        {/* Focus session progress bar */}
        <div className="mt-4">
          <FocusSessionBar currentPeriod={currentTimePeriod.current} />
        </div>
      </header>
      
      {timerDisplay}
      
      <div className="flex gap-4 items-center justify-center w-full">
        <button
          aria-label={playing ? "Pause session" : "Resume session"}
          className="bg-customColor-blue p-3 rounded-full hover:bg-[#68aada] transition-colors duration-150 shadow-sm"
          onClick={() => {
            setPlaying((prev) => !prev);
            setShowOptions(false);
          }}
        >
          {playing ? <Stop className="w-6 h-6"/> : <Play className="w-6 h-6"/>}
        </button>
        
        {!playing && (
          <button
            aria-label="Go back to session setup"
            onClick={() => {
              toggleStartFocusSession();
              setShowOptions(false);
            }}
            className="bg-[#3e3e3e] p-3 rounded-full border border-[#494949] hover:bg-[#4f4f4f] transition-colors duration-150 shadow-sm"
          >
            <GoBack className="w-6 h-6"/>
          </button>
        )}
        
        <div className="relative">
          {/* Options menu with improved positioning and interaction */}
          {showOptions && (
            <div className="absolute bottom-full mb-3 right-0 md:left-0 flex flex-col items-start bg-[#2e2e2e] rounded-lg border border-[#252525] shadow-lg z-10 options-menu min-w-[200px]">
              <button
                onClick={() => setShowTime((prev) => !prev)}
                className="flex items-center w-full text-left p-3 text-sm hover:bg-[#3b3b3b] rounded-t-lg transition-colors"
              >
                <div className="flex items-center justify-center w-6 h-6 mr-2">
                  {showTime && <Check className="w-4 h-4"/>}
                </div>
                Show time remaining
              </button>
            </div>
          )}
          
          <button
            aria-label="More options"
            onClick={() => setShowOptions((prev) => !prev)}
            className="bg-[#3e3e3e] p-3 rounded-full border border-[#494949] hover:bg-[#4f4f4f] transition-colors duration-150 shadow-sm options-button"
          >
            <ThreeDots className="w-6 h-6"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusSection;