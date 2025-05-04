import React, { useState } from "react";
import { times } from "../../data/focusSessionTimes";
import { useFocusPresets } from "../../store/useFocusPresets";
import { useSession } from "../../store/useSetSessionTimes";
import Edit from "../../assets/icons/Edit";
import BinTrash from "../../assets/icons/BinTrash";
import Check from "../../assets/icons/Check";
import Xmark from "../../assets/icons/Xmark";

const FocusPresets = () => {
  const { presets, addPreset, updatePreset, deletePreset } = useFocusPresets();
  const { setSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [editingPresetId, setEditingPresetId] = useState(null);
  const [newPresetName, setNewPresetName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPreset, setNewPreset] = useState({
    name: "",
    focusIndex: 5, // Default to 25 min
    breakIndex: 1, // Default to 5 min
    skipBreaks: false
  });

  const applyPreset = (preset) => {
    setSession("focus", preset.focusIndex);
    setSession("breaks", preset.breakIndex);
  };

  const handleEditClick = (preset) => {
    setEditingPresetId(preset.id);
    setNewPresetName(preset.name);
    setIsEditing(true);
  };

  const savePresetName = () => {
    if (newPresetName.trim() === "") return;
    
    updatePreset(editingPresetId, { name: newPresetName });
    setIsEditing(false);
    setEditingPresetId(null);
  };

  const handleDeletePreset = (e, id) => {
    e.stopPropagation();
    deletePreset(id);
  };

  const handleAddNewPreset = () => {
    if (newPreset.name.trim() === "") return;
    
    addPreset(newPreset);
    setShowAddForm(false);
    setNewPreset({
      name: "",
      focusIndex: 5,
      breakIndex: 1, 
      skipBreaks: false
    });
  };

  return (
    <div className="mb-6">
      <header className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium">Presets</h2>
        
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="text-sm text-customColor-blue hover:text-[#68a8d6] transition-colors"
          >
            + Create Preset
          </button>
        )}
      </header>
      
      {showAddForm && (
        <div className="bg-[#2a2a2a] rounded-lg p-4 mb-4">
          <h3 className="font-medium mb-3">Create New Preset</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-[#a0a0a0] block mb-1">Preset Name</label>
              <input
                type="text"
                value={newPreset.name}
                onChange={(e) => setNewPreset({...newPreset, name: e.target.value})}
                placeholder="e.g., My Work Routine"
                className="w-full bg-[#3a3a3a] text-white border border-[#4a4a4a] rounded-md px-3 py-2 focus:outline-none focus:border-customColor-blue"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#a0a0a0] block mb-1">Focus Time</label>
                <select
                  value={newPreset.focusIndex}
                  onChange={(e) => setNewPreset({...newPreset, focusIndex: parseInt(e.target.value, 10)})}
                  className="w-full bg-[#3a3a3a] text-white border border-[#4a4a4a] rounded-md px-3 py-2 focus:outline-none focus:border-customColor-blue"
                >
                  {times.map((time, index) => (
                    <option key={index} value={index}>
                      {time} minutes
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm text-[#a0a0a0] block mb-1">Break Time</label>
                <select
                  value={newPreset.breakIndex}
                  onChange={(e) => setNewPreset({...newPreset, breakIndex: parseInt(e.target.value, 10)})}
                  className="w-full bg-[#3a3a3a] text-white border border-[#4a4a4a] rounded-md px-3 py-2 focus:outline-none focus:border-customColor-blue"
                >
                  {times.slice(0, 6).map((time, index) => (
                    <option key={index} value={index}>
                      {time} minutes
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="skipBreaks"
                checked={newPreset.skipBreaks}
                onChange={(e) => setNewPreset({...newPreset, skipBreaks: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="skipBreaks" className="text-sm">Skip breaks</label>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1 rounded-md bg-[#3e3e3e] hover:bg-[#4e4e4e] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewPreset}
                className="px-3 py-1 rounded-md bg-customColor-blue text-black hover:bg-[#68a8d6] transition-colors"
                disabled={!newPreset.name.trim()}
              >
                Save Preset
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {presets.map(preset => (
          <div
            key={preset.id}
            onClick={() => applyPreset(preset)}
            className="bg-[#2a2a2a] rounded-md px-3 py-2 cursor-pointer hover:bg-[#333] transition-colors flex items-center"
          >
            {isEditing && editingPresetId === preset.id ? (
              <input
                type="text"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#3a3a3a] border border-[#4a4a4a] rounded px-2 py-1 mr-2 w-24 focus:outline-none focus:border-customColor-blue"
                autoFocus
              />
            ) : (
              <span className="mr-2">{preset.name}</span>
            )}
            
            <span className="text-xs text-[#a0a0a0]">
              {times[preset.focusIndex]}m
              {!preset.skipBreaks && <span> / {times[preset.breakIndex]}m</span>}
            </span>
            
            {/* For built-in presets, don't show edit/delete */}
            {preset.id !== 'pomodoro' && preset.id !== 'long-focus' && preset.id !== 'short-bursts' && (
              <div className="ml-2 flex" onClick={(e) => e.stopPropagation()}>
                {isEditing && editingPresetId === preset.id ? (
                  <>
                    <button 
                      onClick={savePresetName}
                      className="p-1 text-customColor-blue hover:text-[#68a8d6] transition-colors"
                    >
                      <Check />
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="p-1 text-[#a0a0a0] hover:text-white transition-colors"
                    >
                      <Xmark className="w-3 h-3" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => handleEditClick(preset)}
                      className="p-1 text-[#a0a0a0] hover:text-white transition-colors"
                    >
                      <Edit />
                    </button>
                    <button 
                      onClick={(e) => handleDeletePreset(e, preset.id)}
                      className="p-1 text-[#a0a0a0] hover:text-[#c47b8c] transition-colors"
                    >
                      <BinTrash className="w-3 h-3" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusPresets;
