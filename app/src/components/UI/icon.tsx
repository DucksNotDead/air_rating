import React from 'react';
import {motion} from "framer-motion";

const Icon = ({ name, size = 28, onClick, background}: {
  name: string
  size?: number
  onClick?: () => void
  background?: boolean
}) => {
  return (
      <motion.div
          whileTap={onClick? { scale: .8 } : {}}
          onClick={() => onClick&& onClick()}
          className={`app-icon${onClick? ' cursor-pointer' : ''}${background? ' bg-primary p-sm rounded-full' : ''}`}
          style={{ width: size }}
      >
        <img
            className={"w-full"}
            src={`/icons/${name}${name.includes('.png')? '' : '.svg'}`}
            alt={name+'-icon'}
        />
      </motion.div>
  );
};

export default Icon;