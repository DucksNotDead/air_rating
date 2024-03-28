import {useEffect, useMemo, useState} from "react";

const useData = (dataType: 'companies'|'airports'|'flights', param?: number|{
  limit?: string
  page?: string
}) => {
  const [result, setResult] = useState<any>(null)

  const path = useMemo(() => {
    return `/${dataType}/${param
        ? typeof param === "number"
            ? param
            : new URLSearchParams(param)
        : ''
    }`
  }, [dataType, param])

  useEffect(() => {
    fetch('http://localhost:8000/api' + path).then(async res => {
      if (res.ok) {
        const data = await res.json()
        setResult(() => data)
      }
    })
  }, []);

  return result
}

export default useData