import React, {useEffect, useMemo, useRef, useState} from 'react';
import Icon from "./icon";
import useClickOutside from "../../hooks/useClickOutside";
import {motion} from "framer-motion";

const ANIMATION = { duration: .3 }

const Select = (props: {
  items: {
    id: number
    name: string
  }[]
  selectedId: number|null
  placeholder: string
  onChange: (selectedId: number|null) => void
}) => {
  const [inputText, setInputText] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const wrapperRef = useRef<any>(null)
  const inputRef = useRef<any>(null)

  const filteredItems = useMemo(() => {
    return inputText
        ? props.items.filter(i => i.name.toLowerCase().includes(inputText.toLowerCase()))
        : props.items
  }, [inputText, props.items])

  const getName = (itemId: number|null) => {
    const name = props.items.find(i => i.id === itemId)?.name
    return name ? name : ''
  }

  const toggle = (value?: boolean) => {
    setIsOpen(prev => {
      const newValue = value ? value : !prev
      newValue
          ? setIsVisible(() => {
            inputRef.current.focus()
            return true
          })
          : setTimeout(() => setIsVisible(() => false), ANIMATION.duration*1000)
      return newValue
    })
  }

  const update = (itemId: number|null) => {
    toggle(false)
    props.onChange(itemId)
  }

  useEffect(() => {
    setInputText(getName(props.selectedId))
  }, [props.selectedId]);

  useClickOutside(wrapperRef, () => toggle(false), isOpen)

  return (
      <div ref={wrapperRef} className={"relative w-full"}>
        <div className={"app-input"}>
          <input
              ref={inputRef}
              value={inputText}
              placeholder={props.placeholder}
              //@ts-ignore
              onInput={e => setInputText(() => e.target.value)}
              onFocus={() => {
                update(null)
                toggle(true)
              }}
          />
          <motion.div
              initial={{ rotate: 180 }}
              animate={{ rotate: isOpen? 0 : 180 }}
          >
            <Icon name={"arrow-up"} size={28}/>
          </motion.div>
        </div>
        <motion.div
            //@ts-ignore
            onClick={e => update(Number(e.target.dataset.id))}
            initial={{ opacity: 1, translateY: 0 }}
            animate={{ opacity: isOpen? 1 : 0, translateY: isOpen? 0 : 5 }}
            transition={ANIMATION}
            className={"z-50 bg-white mt-sm absolute w-full max-h-[130px] rounded-md shadow-md overflow-y-auto" + (isVisible? "" : " hidden")}
        >
          {filteredItems?.map(({ id, name }, index) => (
              <div key={id} className={"px-lg py-md cursor-pointer" + (index? " border-t-[1px] border-lightGrey" : "")} data-id={id}>{ name }</div>
          ))}
        </motion.div>
      </div>
  );
};

export default Select;