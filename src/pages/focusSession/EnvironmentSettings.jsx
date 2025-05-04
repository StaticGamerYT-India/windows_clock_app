import React, { useEffect, useRef } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const soundOptions = [
  { id: "none", name: "None", path: null },
  { id: "rain", name: "Rain", path: "/sounds/rain.mp3" },
  { id: "forest", name: "Forest", path: "/sounds/forest.mp3" },
  { id: "cafe", name: "Café", path: "/sounds/cafe.mp3" },
  { id: "waves", name: "Ocean Waves", path: "/sounds/waves.mp3" },
  { id: "fire", name: "Fireplace", path: "/sounds/fire.mp3" },
];

const themeOptions = [
  { id: "default", name: "Default", color: "#202020" },
  { id: "blue", name: "Deep Blue", color: "#1a2b3c" },
  { id: "green", name: "Forest", color: "#1c2b20" },
  { id: "purple", name: "Lavender", color: "#2d1c3b" },
  { id: "red", name: "Midnight Red", color: "#2b1617" },
];

const EnvironmentSettings = () => {
  const [ambientSound, setAmbientSound] = useLocalStorage("ambientSound", "none");
  const [volume, setVolume] = useLocalStorage("ambientVolume", 30);
  const [theme, setTheme] = useLocalStorage("focusTheme", "default");
  const audioRef = useRef(null);

  // Apply theme when it changes
  useEffect(() => {
    const selectedTheme = themeOptions.find(t => t.id === theme);
    if (selectedTheme) {
      document.documentElement.style.setProperty('--focus-bg-color', selectedTheme.color);
    }
    
    return () => {
      // Reset to default when component unmounts
      document.documentElement.style.setProperty('--focus-bg-color', '#202020');
    };
  }, [theme]);

  // Handle audio playback
  useEffect(() => {
    const selectedSound = soundOptions.find(s => s.id === ambientSound);
    
    if (audioRef.current) {
      if (selectedSound && selectedSound.path) {
        audioRef.current.src = selectedSound.path;
        audioRef.current.volume = volume / 100;
        audioRef.current.loop = true;
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio play prevented:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [ambientSound, volume]);

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value, 10);
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <div className="bg-[#2a2a2a] rounded-lg p-5 mb-6">
      <h2 className="text-xl font-medium mb-4">Focus Environment</h2>
      
      <div className="mb-5">
        <h3 className="text-[#a0a0a0] mb-2">Ambient Sound</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {soundOptions.map(sound => (
            <button
              key={sound.id}
              onClick={() => setAmbientSound(sound.id)}
              className={`px-3 py-2 rounded-md transition-colors ${
                ambientSound === sound.id 
                  ? 'bg-customColor-blue text-black'
                  : 'bg-[#3a3a3a] hover:bg-[#4a4a4a]'
              }`}
            >
              {sound.name}
            </button>
          ))}
        </div>
        
        {ambientSound !== 'none' && (
          <div className="mt-3">
            <label className="text-sm text-[#a0a0a0] mb-1 block">Volume: {volume}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-customColor-blue"
            />
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-[#a0a0a0] mb-2">Theme</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {themeOptions.map(themeOption => (
            <button
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className={`px-3 py-2 rounded-md transition-colors flex items-center gap-2 ${
                theme === themeOption.id 
                  ? 'bg-customColor-blue text-black'
                  : 'bg-[#3a3a3a] hover:bg-[#4a4a4a]'
              }`}
            >
              <span 
                className="w-3 h-3 rounded-full block" 
                style={{ backgroundColor: themeOption.color }}
              ></span>
              {themeOption.name}
            </button>
          ))}
        </div>
      </div>
      
      <audio ref={audioRef} preload="auto" />
    </div>
  );
};

export default EnvironmentSettings;
