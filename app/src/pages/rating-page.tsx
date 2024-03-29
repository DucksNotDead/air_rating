import React, { useState } from "react";
import Icon from "../components/UI/icon";
import useData from "../hooks/useData";
import { AppCompanyType } from "../constants/types";
import Button from "../components/UI/button";
import { useNavigate } from "react-router-dom";
import BestCompanyFinder from "../components/best-company-finder";
import { motion } from "framer-motion";

const ANIMATION = { duration: 0.45 };
const COLUMN_WIDTH = 110;

const RatingPage = () => {
  const companies: AppCompanyType[] = useData("companies");
  const navigate = useNavigate();

  const [status, setStatus] = useState<"sleep" | "pending" | "error">("sleep");

  const refreshRating = (data: any[]) => {
    setStatus(() => "sleep");
  };

  const onError = () => {};

  const variants = {
    pending: { translateY: 10, opacity: 0 },
    sleep: { translateY: 0, opacity: 1 },
    error: { translateY: 0, opacity: 1 },
  };
  return (
    <div>
      <div className={"flex-1 flex flex-col gap-lg mt-[50px]"}>
        <BestCompanyFinder
          onLoadStart={() => setStatus(() => "pending")}
          onSuccess={refreshRating}
          onError={onError}
        />
        <motion.div
          initial={variants.pending}
          animate={variants[status]}
          className={"bg-lightGrey rounded-md w-full p-lg flex flex-col"}
        >
          <div className={"flex justify-between"}>
            <h2 className={"text-black font-semibold text-[24px]"}>
              Рейтинг компаний
            </h2>
            <div className={"flex-1 flex justify-end"}>
              <div
                style={{ width: COLUMN_WIDTH }}
                className={"flex justify-center"}
              >
                <Icon name={"rating-chart"} size={32} />
              </div>
            </div>
          </div>
          <div className={"flex-1 flex flex-col gap-md mt-lg"}>
            {companies
              ?.sort((a, b) => -a.avg_rating - -b.avg_rating)
              .map((company, index) => (
                <CompanyItem
                  key={company.id}
                  index={index}
                  company={company}
                  navigate={navigate}
                />
              ))}
          </div>
          <Button
            className={"mt-lg self-end"}
            color={"transparent"}
            onClick={() => navigate("/rating")}
          >
            <div className={"text-primary"}>Показать больше</div>
            <Icon name={"arrow-right"} />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

const ColumnItem = (props: { text: string | number }) => (
  <div
    style={{ width: COLUMN_WIDTH }}
    className={"flex justify-center font-[600] pr-xs"}
  >
    {props.text}
  </div>
);

const CompanyItem = (props: {
  index: number;
  navigate: (path: string) => void;
  company: AppCompanyType;
}) => {
  return props.company ? (
    <div className={"flex items-center gap-md"}>
      <div
        className={
          "flex items-center justify-center h-[32px] aspect-square rounded-full bg-primary text-white"
        }
      >
        {props.index + 1}
      </div>
      <div
        className={"border-b-[2px] cursor-pointer"}
        onClick={() => props.navigate("/companies/" + props.company.id)}
      >
        {props.company.full_name}
      </div>
      <div className={"flex-1 flex justify-end"}>
        <ColumnItem
          text={(Number(props.company.avg_rating) * 100).toFixed(2)}
        />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default RatingPage;
