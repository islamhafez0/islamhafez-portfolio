import { motion } from "framer-motion";
import React, { SetStateAction, useEffect } from "react";
export const Toast = ({
  message,
  show,
  setShow,
  isError,
}: {
  message: string;
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  isError: boolean;
}) => {
  useEffect(() => {
    let timer: any;
    if (show) {
      timer = setTimeout(() => {
        setShow(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [show]);
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className={`fixed right-4 bottom-4 p-4 md:px-8 bg-indigo-500 text-white rounded-md z-10 ${
        show ? "!translate-y-0" : "!translate-y-36"
      } ${isError ? "bg-red-500" : ""} transition-transform`}
    >
      {message}
    </motion.div>
  );
};
