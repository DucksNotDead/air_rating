import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import useLog from "../hooks/useLog";

type Item = {
  id: number
  name: string
}

const CitySearch = forwardRef((props: {
  placeholder: string
  onSet: (value: string) => void
}, ref) => {

  const [searchQuery, setSearchQuery] = useState('')
  const [responseItems, setResponseItems] = useState<Item[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const inputRef = useRef<any>(null)

  const onListClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    //@ts-ignore
    const name = responseItems.find(i => i.id === Number(e.target.dataset.id))?.name
    props.onSet(name as string)
    setSearchQuery(name as string)
  }

  useEffect(() => {
    if (searchQuery?.length > 2) {
      console.log(searchQuery)
      fetch('http://localhost:8000/api/airports/?search=' + searchQuery).then(async res => {
        if (res.ok) {
          const data = await res.json()
          setResponseItems(() => data.map((r:any) => ({
            id: r.id,
            name: r.city + ' ' + r.code
          })))
        }
      })
    }
    else setResponseItems(() => [])
  }, [searchQuery.length]);

  useImperativeHandle(ref, () => inputRef.current, [inputRef.current])

  return (
      <div className={"relative flex-1"}>
        <input
            className={"app-input w-full"}
            ref={inputRef}
            value={searchQuery}
            placeholder={props.placeholder}
            onInput={e => {
              props.onSet('')
              //@ts-ignore
              setSearchQuery(e.target.value)
            }}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setTimeout(() => setIsOpen(() => false), 300)}
        />
        <div
            className={"absolute w-full mt-sm rounded-md bg-white shadow-md"}
            onClick={onListClick}
        >
          {isOpen? responseItems.map(({ name, id }, index) => (
              <div data-id={id} key={id} className={"cursor-pointer px-md py-sm" + (index? " border-t-[1px] border-lightGrey" : "")}>{ name }</div>
          )) : <></>}
        </div>
      </div>
  );
});

export default CitySearch;