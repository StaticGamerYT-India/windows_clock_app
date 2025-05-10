import React, { memo } from "react";
import Pen from "../assets/icons/Pen";
import Plus from "../assets/icons/Plus";
import Check from "../assets/icons/Check";
import { useEdit } from "../store/useEditTimer";
import { useShowPopup } from "../store/useShopPopup";
import { motion } from "framer-motion";

const AddEditButtons = () => {
  const { setEdit, edit } = useEdit();
  const { setShow } = useShowPopup();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed flex gap-2 bottom-6 right-6 bg-[#2e2e2e] rounded-lg p-1.5 shadow-lg border border-[#3e3e3e] backdrop-blur-sm bg-opacity-90 z-30"
    >
      <motion.button
        onClick={setEdit}
        whileHover={{ backgroundColor: "#3e3e3e" }}
        whileTap={{ scale: 0.9 }}
        className="p-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-customColor-blue focus:ring-opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={edit ? "Save changes" : "Edit items"}
      >
        {edit ? <Check /> : <Pen />}
      </motion.button>
      
      <motion.button
        onClick={setShow}
        whileHover={!edit ? { backgroundColor: "#3e3e3e" } : {}}
        whileTap={!edit ? { scale: 0.9 } : {}}
        disabled={edit}
        className={`p-3 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-customColor-blue focus:ring-opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center ${
          edit ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Add new item"
      >
        <Plus color={!edit ? "white" : "#7e7e7e"} />
      </motion.button>
    </motion.div>
  );
};

export default memo(AddEditButtons);
