import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Check from "../../assets/icons/Check";
import Plus from "../../assets/icons/Plus";
import BinTrash from "../../assets/icons/BinTrash";

const TasksList = () => {
  const [tasks, setTasks] = useLocalStorage("focusTasks", []);
  const [newTaskText, setNewTaskText] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  const addTask = () => {
    if (newTaskText.trim() === "") return;
    
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    setIsAddingTask(false);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  const removeTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="bg-[#2a2a2a] rounded-lg p-5 mb-6">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium">Focus Tasks</h2>
        
        {!isAddingTask && (
          <button 
            onClick={() => setIsAddingTask(true)}
            className="flex items-center gap-1 text-sm text-customColor-blue hover:text-[#68a8d6] transition-colors"
          >
            <Plus color="currentColor" />
            <span>Add Task</span>
          </button>
        )}
      </header>
      
      {isAddingTask ? (
        <div className="mb-4 flex">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What do you want to focus on?"
            className="flex-grow bg-[#3a3a3a] text-white border border-[#4a4a4a] rounded-l-md px-3 py-2 focus:outline-none focus:border-customColor-blue"
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            autoFocus
          />
          <button 
            onClick={addTask}
            className="bg-customColor-blue text-black px-4 py-2 rounded-r-md hover:bg-[#68a8d6] transition-colors"
          >
            Add
          </button>
          <button 
            onClick={() => setIsAddingTask(false)}
            className="ml-2 bg-[#3e3e3e] text-white px-3 py-2 rounded-md hover:bg-[#4e4e4e] transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : null}
      
      {tasks.length === 0 ? (
        <div className="text-center py-6 text-[#a0a0a0]">
          <p>Add tasks to focus on during your session</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {tasks.map(task => (
            <li 
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-md ${
                task.completed ? 'bg-[#2d3b33]' : 'bg-[#333]'
              }`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-5 h-5 rounded-sm flex items-center justify-center mr-3 ${
                    task.completed ? 'bg-[#16cca2] text-black' : 'border border-[#5a5a5a]'
                  }`}
                >
                  {task.completed && <Check />}
                </button>
                <span className={task.completed ? 'line-through text-[#a0a0a0]' : ''}>
                  {task.text}
                </span>
              </div>
              
              <button
                onClick={() => removeTask(task.id)}
                className="text-[#a0a0a0] hover:text-[#c47b8c] transition-colors"
              >
                <BinTrash className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksList;
