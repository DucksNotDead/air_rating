import {RefObject} from "react";

const useCheckFields = () => (fields: {
  ref: RefObject<any>
  state: string
}[]) => {
  let error = false
  for (const field of fields) {
    if (!field.state.length) {
      field.ref.current.classList.add('error')
      error = true
      break
    }
    else {
      field.ref.current.classList.remove('error')
    }
  }
  return !error
}

export default useCheckFields