import React from "react";
import { useFullFocusSession } from "../../store/useFullFocusSession";
import { times } from "../../data/focusSessionTimes";
import { calculatePercentage } from "../../utils/calculatePercentage";
import { useSession } from "../../store/useSetSessionTimes";
import { motion } from "framer-motion";

const FocusSessionBar = ({ currentPeriod = 0 }) => {
  const { session } = useSession();
  const { focusSession } = useFullFocusSession();

  // Ensure session.focus is a valid index for times array
  const totalDuration = times[session.focus] !== undefined ? times[session.focus] : 1;

  return (
    <div className="flex w-full h-6 rounded-full overflow-hidden bg-gray-700 shadow-inner">
      {focusSession.map((fs, i) => {
        // Calculate percentage safely
        const percentage = calculatePercentage(fs, totalDuration);
        const showText = percentage > 5;
        
        // Highlight current period
        const isCurrentPeriod = i === currentPeriod;
        
        return (
          <motion.div
            key={i}
            style={{ width: `${percentage}%` }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: i * 0.1, 
              ease: "easeOut" 
            }}
            className={`flex items-center justify-center h-full ${
              i % 2 === 0 
                ? isCurrentPeriod ? "bg-[#14b891]" : "bg-[#16cca2]" 
                : isCurrentPeriod ? "bg-[#4a4a4a]" : "bg-[#5a5a5a]"
            } text-[11px] font-semibold text-black overflow-hidden relative`}
            title={`${fs} min ${i % 2 === 0 ? 'Focus' : 'Break'}`}
          >
            {isCurrentPeriod && (
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
            )}
            
            {showText && (
              <motion.span 
                className="flex items-baseline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
              >
                {fs}
                <span className="text-[8px] ml-0.5 mt-0.5">m</span>
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default FocusSessionBar;