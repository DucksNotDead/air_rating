import React, {useRef, useState} from 'react';
import Icon from "./UI/icon";
import useCheckFields from "../hooks/useCheckFields";
import useData from "../hooks/useData";
import CitySearch from "./city-search";


const BestCompanyFinder = (props: {
  onLoadStart: () => void
  onSuccess: (data: any[]) => void
  onError: () => void
}) => {
  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const firstInputRef = useRef(null)
  const secondInputRef = useRef(null)

  const checkInputs = useCheckFields()

  const airports = useData('airports')

  const getCode = (str: string) => {
    const strArr = str.split(' ')
    return strArr[strArr.length-1]
  }

  const submit = async () => {
    if (checkInputs([
      {
        ref: firstInputRef,
        state: firstInput
      },
      {
        ref: secondInputRef,
        state: secondInput
      },
    ])) {
      props.onLoadStart()
      const res = await fetch('http://localhost:8000/api/flights/?' + new URLSearchParams({
        from: getCode(firstInput),
        to: getCode(secondInput)
      }))
      if (res.ok) res.json().then(data => props.onSuccess(data))
      else props.onError()
    }
  }

  return (
      <div className={"flex gap-lg items-center justify-between shadow-sm p-md rounded-md pr-lg"}>
        <h2 className={"mr-xl font-[500] text-nowrap text-[16px]"}>Найти лучшую авиакомпанию</h2>
        <CitySearch
            ref={firstInputRef}
            placeholder={"Откуда?"}
            onSet={setFirstInput}
        />
        <span className={"text-primary font-medium text-[30px]"}>-</span>
        <CitySearch
            ref={secondInputRef}
            placeholder={"Куда?"}
            onSet={setSecondInput}
        />
        <Icon name={"search"} size={38} background onClick={submit}/>
      </div>
  );
};

export default BestCompanyFinder;