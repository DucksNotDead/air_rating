import React, {ReactNode} from 'react';
import { motion } from 'framer-motion'

const Button = (props: {
  color?: string
  children: ReactNode
  onClick: () => void
  className?: string
}) => {
  return (
      <motion.div
          whileHover={{ opacity: .7 }}
          whileTap={{ scale: .97 }}
          onClick={props.onClick}
          className={"app-button"
              + (props.color? (" bg-" + props.color) : " bg-primary")
              + (props.className? (" " + props.className) : "")
              + (props.color === "transparent"? "" : " px-lg py-sm")
          }
      >
        { props.children }
      </motion.div>
  );
};

export default Button;