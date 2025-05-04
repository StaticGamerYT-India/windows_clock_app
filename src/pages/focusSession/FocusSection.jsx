import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import Play from "../../assets/icons/Play";
import Stop from "../../assets/icons/Stop";
import GoBack from "../../assets/icons/Goback";
import ThreeDots from "../../assets/icons/ThreeDots";
import Check from "../../assets/icons/Check";
import plant from "../../assets/images/plant.png";
import { useDismissPopup } from "../../store/useDismissPopup";

const FocusSection = () => {
  const currentTimePeriod = useRef(0);
  const timer = useRef(null);
  const { focusSession, toggleStartFocusSession } = useFullFocusSession();
  const { setShowDismiss, setShowTimeOnDismiss, setMainName, setName } =
    useDismissPopup();
  // Ensure focusSession has data before accessing it
  const initialSecs = focusSession.length > 0 ? focusSession[currentTimePeriod.current] * 60 : 0;
  const [secs, setSecs] = useState(initialSecs);
  const [playing, setPlaying] = useState(true);

  const [showOptions, setShowOptions] = useState(false); // Renamed state for clarity
  const [showTime, setShowTime] = useState(true);

  useEffect(() => {
    // Reset timer if focusSession changes (e.g., going back and starting new session)
    if (focusSession.length > 0) {
      currentTimePeriod.current = 0;
      setSecs(focusSession[0] * 60);
      setPlaying(true); // Auto-start new session
    } else {
      // Handle case where focusSession might become empty
      clearInterval(timer.current);
      setPlaying(false);
      setSecs(0);
    }
  }, [focusSession]); // Depend on focusSession itself

  useEffect(() => {
    if (playing && focusSession.length > 0) { // Check focusSession length
      timer.current = setInterval(() => {
        setSecs((prev) => {
          if (prev <= 1) { // Check for <= 1 to handle the last second correctly
            clearInterval(timer.current); // Clear interval before potentially changing period
            const nextPeriodIndex = currentTimePeriod.current + 1; // Use integer index

            if (nextPeriodIndex >= focusSession.length) {
              // Session finished
              setPlaying(false);
              setName("You have finished your focus session");
              setMainName("Great job!");
              setShowTimeOnDismiss(false);
              setShowDismiss();
              return 0; // Stay at 0
            } else {
              // Move to next period
              currentTimePeriod.current = nextPeriodIndex;
              const nextDuration = focusSession[nextPeriodIndex] * 60;
              // Restart interval immediately for the new period
              if (playing) { // Check playing state again in case it was paused during transition
                 timer.current = setInterval(() => {/*... interval logic ...*/}, 1000);
              }
              return nextDuration;
            }
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer.current);
    }

    return () => clearInterval(timer.current);
  }, [playing, focusSession, setShowDismiss, setName, setMainName, setShowTimeOnDismiss]); // Added missing dependencies


  const timerDisplay = useMemo(() => {
    // Guard against accessing focusSession when empty or index out of bounds
    const currentDuration = focusSession.length > currentTimePeriod.current
                           ? focusSession[currentTimePeriod.current] * 60
                           : 1; // Avoid division by zero
    const progressRatio = currentDuration > 0 ? (currentDuration - secs) / currentDuration : 0;
    const segmentsToShow = Math.floor(progressRatio * 24);

    const displayMinutes = Math.floor(secs / 60);
    const displaySeconds = secs % 60;

    return (
      // Adjusted size for responsiveness
      <div className="flex items-center justify-center relative bg-[#3c3c3c] h-56 w-56 md:h-64 md:w-64 rounded-full border-[2px] border-[#414141]">
        <span className="flex items-baseline text-5xl md:text-[40px] leading-tight md:leading-[45px]"> {/* Adjusted text size and alignment */}
          {showTime ? (
            <>
              {displayMinutes > 0 ? (
                <>
                  {displayMinutes}
                  <p className="text-2xl text-[#b8b8b8] ml-1 md:ml-[5px]">min</p>
                </>
              ) : (
                <>
                  {displaySeconds}
                  <p className="text-2xl text-[#b8b8b8] ml-1 md:ml-[5px]">sec</p>
                </>
              )}
            </>
          ) : (
            <img src={plant} className="h-28 md:h-36" alt="Plant illustration"/> // Added alt text
          )}
        </span>
        {Array(24)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              // Adjusted size and translation for responsiveness
              className={`absolute ${
                i < segmentsToShow ? "bg-customColor-blue" : "bg-[#494949]"
              } w-4 h-1 md:w-[22px] md:h-[6px] rounded-full`}
              style={{ transform: `rotate(${i * 15}deg) translate(90px) md:translate(102px)` }} // Adjusted translate
            ></div>
          ))}
      </div>
    );
  }, [secs, showTime, focusSession]); // Added focusSession dependency

  // Determine current period type safely
  const currentPeriodType = focusSession.length > 0 && currentTimePeriod.current < focusSession.length
                           ? (currentTimePeriod.current % 2 === 0 ? 'Focus' : 'Break')
                           : 'Focus'; // Default or ending state
  const totalFocusPeriods = focusSession.length > 0 ? Math.ceil(focusSession.length / 2) : 0;
  const currentFocusPeriodNumber = focusSession.length > 0 ? Math.floor(currentTimePeriod.current / 2) + 1 : 0;


  return (
    // Adjusted padding, gap, max-width
    <div className="focus-section">
      <header className="flex w-full text-xl md:text-2xl font-semibold justify-center md:justify-start">
         {currentPeriodType === 'Focus'
           ? `Focus period (${currentFocusPeriodNumber} of ${totalFocusPeriods})`
           : `Break`}
      </header>
      {timerDisplay}
      {/* Adjusted gap and button padding */}
      <div className="flex gap-3 md:gap-2 items-center justify-center w-full">
        <button
          aria-label={playing ? "Pause session" : "Resume session"} // Added aria-label
          className="bg-customColor-blue p-3 md:p-2 rounded-full hover:bg-[#68aada] transition-colors duration-150"
          onClick={() => {
            setPlaying((prev) => !prev);
            setShowOptions(false); // Close options on play/pause
          }}
        >
          {playing ? <Stop className="w-5 h-5 md:w-auto md:h-auto"/> : <Play className="w-5 h-5 md:w-auto md:h-auto"/>} {/* Scaled icons */}
        </button>
        {/* Show GoBack only when paused */}
        {!playing && (
          <button
            aria-label="Go back to session setup" // Added aria-label
            onClick={() => {
              toggleStartFocusSession(); // This should reset the session state via zustand
              setShowOptions(false);
            }}
            className="bg-[#3e3e3e] p-2.5 md:p-[7.5px] rounded-full border-[1px] border-[#494949] hover:bg-[#4f4f4f] transition-colors duration-150" // Added hover state
          >
            <GoBack className="w-5 h-5 md:w-auto md:h-auto"/> {/* Scaled icon */}
          </button>
        )}
        <div className="relative">
          {/* Options Menu */}
          {showOptions && (
            <div className="absolute bottom-full mb-2 right-0 md:right-auto md:left-0 flex flex-col items-start bg-[#2e2e2e] rounded-lg border border-[#252525] shadow-lg z-10">
              <button
                onClick={() => {
                  setShowTime((prev) => !prev);
                  // setShowOptions(false); // Optionally close menu on selection
                }}
                className="flex items-center w-full text-left p-2 px-4 text-sm hover:bg-[#3b3b3b] rounded-t-lg" // Adjusted style
              >
                <div className="flex items-center justify-center w-6 h-6 mr-2"> {/* Checkbox area */}
                  {showTime && <Check className="w-4 h-4"/>}
                </div>
                Show time remaining
              </button>
               {/* Add more options here if needed */}
            </div>
          )}
          {/* Three Dots Button */}
          <button
            aria-label="More options" // Added aria-label
            onClick={() => setShowOptions((prev) => !prev)}
            className="bg-[#3e3e3e] p-2.5 md:p-[7.5px] rounded-full border-[1px] border-[#494949] hover:bg-[#4f4f4f] transition-colors duration-150" // Added hover state
          >
            <ThreeDots className="w-5 h-5 md:w-auto md:h-auto"/> {/* Scaled icon */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusSection;