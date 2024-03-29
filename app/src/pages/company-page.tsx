import React from 'react';
import {useParams} from "react-router-dom";
import useData from "../hooks/useData";
import {motion} from "framer-motion";

const CompanyPage = () => {
  const { id } = useParams()
  const company = useData('companies', Number(id))

  const variants = {
    hidden: { opacity: 0, translateY: 10 },
    shown: { opacity: 1, translateY: 0 }
  }

  return (
    <motion.div
        className={"mt-lg"}
        initial={variants.hidden}
        animate={variants[company? "shown" : "hidden"]}
        transition={{ duration: .45 }}
    >
      <img src={"/images/" + company?.name + ".png"} alt={"diagram"}/>
    </motion.div>
  );
};

export default CompanyPage;