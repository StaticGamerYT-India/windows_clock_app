import React, { useEffect, useRef } from "react";
import { useDismissPopup } from "../store/useDismissPopup";
import ClockLogo from "../assets/icons/ClockLogo";

const DismissPopup = () => {
  const { showDismiss, setShowDismiss, name, mainName, showTimeOnDismiss } = useDismissPopup();
  const audioRef = useRef(null);
  
  // Handle the notification sound
  useEffect(() => {
    if (showDismiss) {
      // Play sound only when the popup becomes visible
      if (audioRef.current) {
        audioRef.current.volume = 0.4; // Lower volume
        audioRef.current.currentTime = 0; // Reset to start
        
        // Only play if user has interacted with the document
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Auto-play was prevented, we'll need user interaction
            console.log("Audio play prevented:", error);
          });
        }
      }
    }
  }, [showDismiss]);

  if (!showDismiss) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50 backdrop-blur-sm"
      onClick={() => setShowDismiss(false)}
    >
      <div 
        className="bg-[#202020] shadow-xl rounded-lg overflow-hidden max-w-sm w-full mx-4 transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4">
          <div className="flex-shrink-0 h-8 w-8">
            <ClockLogo className="h-full w-full" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm text-gray-400">Clock</h3>
            {showTimeOnDismiss && (
              <p className="text-sm text-gray-300">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
            )}
          </div>
          <button 
            onClick={() => setShowDismiss(false)}
            className="ml-auto text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        <div className="px-4 pb-3">
          <h2 className="text-lg font-semibold mb-1">{mainName}</h2>
          <p className="text-gray-300 text-sm">{name}</p>
        </div>
        
        <div className="border-t border-gray-700 p-3 flex justify-end">
          <button
            onClick={() => setShowDismiss(false)}
            className="bg-[#3e3e3e] text-white px-4 py-1.5 rounded text-sm hover:bg-[#4e4e4e] transition-colors"
          >
            Dismiss
          </button>
        </div>

        {/* Audio element for notification sound */}
        <audio ref={audioRef} preload="auto">
          <source src="/sounds/notification.mp3" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
};

export default DismissPopup;
