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

const headings = {
  1: "Рейтинг компаний",
  2: "Рейтинг компаний по рейсу",
};

const HomePage = () => {
  const companies: AppCompanyType[] = useData("companies");
  const navigate = useNavigate();

  const [ratingHeading, setRatingHeading] = useState(headings["1"]);

  const [currentRatingCompanies, setCurrentRatingCompanies] =
    useState<AppCompanyType[]>(companies);

  const [status, setStatus] = useState<"sleep" | "pending" | "error">("sleep");

  const refreshRating = (data: any[]) => {
    setStatus(() => "sleep");
    setRatingHeading(headings["2"]);
    setCurrentRatingCompanies(() => data);
  };

  const onError = () => {
    console.log("error");
  };

  const variants = {
    pending: { translateY: 10, opacity: 0 },
    sleep: { translateY: 0, opacity: 1 },
    error: { translateY: 0, opacity: 1 },
  };

  return (
    <div className={"flex-1 flex flex-col gap-lg mt-[50px]"}>
      <BestCompanyFinder
        onLoadStart={() => setStatus(() => "pending")}
        onSuccess={refreshRating}
        onError={onError}
      />
      <motion.div
        initial={variants.pending}
        animate={variants[status]}
        transition={ANIMATION}
        className={"bg-lightGrey rounded-md w-full p-lg flex flex-col"}
      >
        <div className={"flex justify-between"}>
          <h2 className={"text-black font-semibold text-[24px]"}>
            {ratingHeading}
          </h2>
          <div className={"flex-1 flex justify-end"}>
            <div
              style={{ width: COLUMN_WIDTH }}
              className={"flex justify-center"}
            >
              <Icon name={"airplane"} size={32} />
            </div>
            <div
              style={{ width: COLUMN_WIDTH, rotate: "30deg" }}
              className={"flex justify-center"}
            >
              <Icon name={"airplane"} size={32} />
            </div>
            <div
              style={{ width: COLUMN_WIDTH }}
              className={"flex justify-center"}
            >
              <Icon name={"rating-chart"} size={32} />
            </div>
          </div>
        </div>
        <div className={"flex-1 flex flex-col gap-md mt-lg"}>
          {currentRatingCompanies
            ?.sort((a, b) => -a.rating - -b.rating)
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
          text={
            Number(props.company.avg_arrival_delay_minutes).toFixed(1) + " мин."
          }
        />
        <ColumnItem
          text={Number(props.company.avg_delay_departure).toFixed(1) + " мин."}
        />
        <ColumnItem text={(Number(props.company.rating) * 100).toFixed(2)} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default HomePage;
