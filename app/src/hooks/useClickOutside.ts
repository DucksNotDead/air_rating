import {RefObject, useEffect} from "react";

const useClickOutside = (ref: RefObject<any>, callback: () => void, active?: boolean) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) {
        removeListener()
        callback()
      }
    }
    active&& document.addEventListener('click', handleClick)
    const removeListener = () => active&& document.removeEventListener('click', handleClick)

    return () => void removeListener()
  }, [ref, active]);
}

export default useClickOutside