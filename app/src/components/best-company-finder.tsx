import React, {RefObject, useRef, useState} from 'react';
import Icon from "./UI/icon";

const BestCompanyFinder = (props: {
  onLoadStart: () => void
  onSuccess: (data: any[]) => void
  onError: () => void
}) => {
  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const firstInputRef = useRef(null)
  const secondInputRef = useRef(null)

  const checkInput = (ref: RefObject<any>, state: string) => {
    if (!state.length) {
      ref.current.classList.add('error')
      return false
    }
    else {
      ref.current.classList.remove('error')
      return true
    }
  }

  const submit = () => {
    if (checkInput(firstInputRef, firstInput) && checkInput(secondInputRef, secondInput)) {
      console.log('/companies/' + new URLSearchParams({
        from: firstInput,
        to: secondInput
      }))
    }
  }

  return (
      <div className={"flex gap-lg items-center justify-between shadow-sm p-md rounded-md pr-lg"}>
        <h2 className={"mr-xl font-[500] text-nowrap text-[16px]"}>Найти лучшую авиакомпанию</h2>
        <input
            ref={firstInputRef}
            value={firstInput}
            //@ts-ignore
            onInput={e => setFirstInput(() => e.target.value)}
            placeholder={"Откуда?"}
            type="text"
            className={"app-input flex-1"}
        />
        <span className={"text-primary font-medium text-[30px]"}>-</span>
        <input
            ref={secondInputRef}
            value={secondInput}
            //@ts-ignore
            onInput={e => setSecondInput(() => e.target.value)}
            placeholder={"Куда?"}
            type={"text"}
            className={"app-input flex-1"}
        />
        <Icon name={"search"} size={38} background onClick={submit}/>
      </div>
  );
};

export default BestCompanyFinder;