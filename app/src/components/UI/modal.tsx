import React, {forwardRef, ReactNode, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {createPortal} from "react-dom";
import {motion} from "framer-motion"
import Icon from "./icon";

const ANIMATION = { duration: .2 }

const Modal = forwardRef(({ title, children, onClose }: {
  title: string
  children: ReactNode
  onClose?: () => void
}, ref) => {

  const [isVisible, setIsVisible] = useState(false)
  const [isHidden, setIsHidden] = useState(!isVisible)

  const cardRef = useRef<any>(null)

  const closeModal = () => {
    setIsVisible(false)
    onClose&& onClose()
  }

  const onBackdropClick = ({ target }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!(cardRef.current.contains(target) || cardRef.current === target)) {
      closeModal()
    }
  }

  useEffect(() => {
    isVisible
        ? setIsHidden(() => false)
        : setTimeout(() => setIsHidden(() => true), ANIMATION.duration*1000)
  }, [isVisible])

  useEffect(() => {
    const onKeyPress = ({ key }: { key: string }) => key==="Escape"&& closeModal()
    window.addEventListener("keypress", onKeyPress)
    return () => window.removeEventListener("keypress", onKeyPress)
  }, [])

  useImperativeHandle(ref, () => ({
    show: () => setIsVisible(() => true),
    hide: () => closeModal(),
  }))

  return createPortal(
      <motion.div
          onClick={onBackdropClick}
          className={"app-modal-wrapper"}
          style={{ zIndex: isHidden? -1 : 999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible? 1 : 0 }}
          transition={ANIMATION}
      >
        <motion.div
            ref={cardRef}
            className="app-modal"
            animate={{ translateY: isVisible? 0 : 10 }}
            transition={ANIMATION}
        >
          <div className={"w-full flex justify-between items-center"}>
            <h3 className={"text-black"}>{ title }</h3>
            <Icon name={"close"} onClick={closeModal}/>
          </div>
          <div className="p-sm flex-1 flex flex-col justify-center">
            { children }
          </div>
        </motion.div>
      </motion.div>,
      document.querySelector("#root") as HTMLElement
  )
})

export default Modal;