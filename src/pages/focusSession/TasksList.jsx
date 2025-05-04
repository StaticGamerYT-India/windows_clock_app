import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import Check from "../../assets/icons/Check";
import Plus from "../../assets/icons/Plus";
import BinTrash from "../../assets/icons/BinTrash";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div 
      className="bg-[#2a2a2a] rounded-lg p-3 md:p-5 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl font-medium">Focus Tasks</h2>
        
        <AnimatePresence>
          {!isAddingTask && (
            <motion.button 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingTask(true)}
              className="flex items-center gap-1 text-sm text-customColor-blue hover:text-[#68a8d6] transition-colors tap-target"
            >
              <Plus color="currentColor" />
              <span>Add Task</span>
            </motion.button>
          )}
        </AnimatePresence>
      </header>
      
      <AnimatePresence>
        {isAddingTask && (
          <motion.div 
            className="mb-4 flex flex-col xs:flex-row gap-2 xs:gap-0"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="What do you want to focus on?"
              className="flex-grow bg-[#3a3a3a] text-white border border-[#4a4a4a] rounded-md xs:rounded-l-md xs:rounded-r-none px-3 py-2 min-h-[44px] focus:outline-none focus:border-customColor-blue"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              autoFocus
            />
            <div className="flex xs:flex-none">
              <motion.button 
                whileHover={{ backgroundColor: "#68a8d6" }}
                whileTap={{ scale: 0.95 }}
                onClick={addTask}
                className="flex-1 xs:flex-none bg-customColor-blue text-black px-4 py-2 rounded-l-md xs:rounded-l-none xs:rounded-r-none transition-colors tap-target"
              >
                Add
              </motion.button>
              <motion.button 
                whileHover={{ backgroundColor: "#4e4e4e" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddingTask(false)}
                className="flex-1 xs:flex-none ml-2 xs:ml-0 bg-[#3e3e3e] text-white px-3 py-2 rounded-r-md xs:rounded-r-md transition-colors tap-target"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {tasks.length === 0 ? (
        <motion.div 
          className="text-center py-6 text-[#a0a0a0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p>Add tasks to focus on during your session</p>
        </motion.div>
      ) : (
        <motion.ul 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <AnimatePresence>
            {tasks.map(task => (
              <motion.li 
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center justify-between p-3 rounded-md transition-all ${
                  task.completed ? 'bg-[#2d3b33]' : 'bg-[#333]'
                }`}
              >
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTaskCompletion(task.id)}
                    className={`w-5 h-5 rounded-sm flex items-center justify-center mr-3 transition-all duration-300 ${
                      task.completed ? 'bg-[#16cca2] text-black' : 'border border-[#5a5a5a]'
                    } tap-target`}
                  >
                    <AnimatePresence>
                      {task.completed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Check />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                  <span className={`transition-all duration-300 ${task.completed ? 'line-through text-[#a0a0a0]' : ''}`}>
                    {task.text}
                  </span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, color: "#c47b8c" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeTask(task.id)}
                  className="text-[#a0a0a0] transition-colors tap-target"
                >
                  <BinTrash className="w-4 h-4" />
                </motion.button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </motion.div>
  );
};

export default TasksList;
