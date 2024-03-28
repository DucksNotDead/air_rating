import React, {useState} from 'react';
import Icon from "../components/UI/icon";
import useData from "../hooks/useData";
import {AppCompanyType} from "../constants/types";
import Button from "../components/UI/button";
import {useNavigate} from "react-router-dom";
import BestCompanyFinder from "../components/best-company-finder";
import useLog from "../hooks/useLog";

const ANIMATION = { duration: .45 }

const HomePage = () => {

  const companies: AppCompanyType[] = useData('companies')
  const navigate = useNavigate()

  const [status, setStatus] =
      useState<'sleep'|'pending'|'error'>('sleep')

  const refreshRating = (data: any[]) => {

  }

  const onError = () => {

  }

  return (
      <div className={"flex-1 flex flex-col gap-lg mt-[50px]"}>
        <BestCompanyFinder
            onLoadStart={() => setStatus(() => 'pending')}
            onSuccess={refreshRating}
            onError={onError}
        />
        <div className={"bg-lightGrey rounded-md w-full p-lg flex flex-col"}>
          <div className={"flex justify-between"}>
            <h2 className={"text-black font-semibold text-[24px]"}>Рейтинг компаний</h2>
            <Icon name={"rating-chart"} size={32}/>
          </div>
          <div className={"flex-1 flex flex-col gap-md mt-lg"}>
            {companies?.sort((a,b) => -a.rating - -b.rating).map(({ id, full_name, rating }, index) => (
                <CompanyItem
                    key={id}
                    index={index}
                    id={id}
                    full_name={full_name}
                    rating={rating}
                    navigate={navigate}
                />
            ))}
          </div>
          <Button className={"mt-lg self-end"} color={"transparent"} onClick={() => navigate('/rating')}>
            <div className={"text-primary"}>Показать больше</div>
            <Icon name={"arrow-right"}/>
          </Button>
        </div>
      </div>
  );
};

const CompanyItem = (props: {
  index: number
  id: number
  full_name: string
  rating: number
  navigate: (path: string) => void
}) => {
  return (
      <div className={"flex items-center gap-md"}>
        <div className={"flex items-center justify-center h-[32px] aspect-square rounded-full bg-primary text-white"}>{ props.index+1 }</div>
        <div className={"border-b-[2px] cursor-pointer"} onClick={() => props.navigate('/companies/' + props.id)}>{ props.full_name }</div>
        <div className={"flex-1 flex justify-end font-[600] pr-xs"}>{ props.rating*100 }</div>
      </div>
  )
}

export default HomePage;