import React, {useMemo, useRef, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import Button from "./UI/button";
import CompareCompaniesFormPopup from "./popups/compare-companies-form-popup";
import useData from "../hooks/useData";

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const companies = useData('companies')

  const [company, setCompany] = useState<number|null>(null)

  const breadcrumbs = useMemo(() => {
    const mainpath = pathname.split('/')[1]

    const names = {
      '': 'Главная',
      'rating': 'Рейтинг',
      'companies': 'Компании'
    }

    let postnames = ''
    const ids = pathname.split(mainpath)[1]?.split('/').filter(s => s.length).map(s => Number(s))
    if (ids?.length) {
      if (ids.length === 1) setCompany(() => ids[0])
      else setCompany(() => null)
      postnames = ' / ' + ids.map(id => companies?.find((c:any) => c.id === id).full_name).join(' / ')
    }
    else setCompany(() => null)

    //@ts-ignore
    return names[mainpath] + postnames
  }, [pathname, companies])

  const comparePopup = useRef<any>(null)
  return (
      <div className={"w-full flex gap-md py-sm items-center"}>
       <div className={"overflow-hidden rounded"}>
         <img
             onClick={() => navigate('/')}
             src={"/icons/logo.svg"} alt={"app-logo"}
             className={"w-[120px] cursor-pointer"}
         />
       </div>
        <div className={"py-xs"}>
          <span>Сервис по отслеживанию рейтинга авиаперевозок</span>
          <h1 className={"text-black mt-xs"}>{breadcrumbs}</h1>
        </div>
        <div className={"flex flex-1 items-center justify-end px-sm gap-lg"}>
          {/*<div className={"app-input w-[280px]"}>
            <input type="text" placeholder={"Отследить рейс"}/>
            <Icon name={"arrow-right"} size={26}/>
          </div>*/}
          {pathname === '/'
              ? (
                  <Button onClick={() => comparePopup.current.show()}>
                    Сравнить авиакомпании
                  </Button>
              )
              : company
                  ? (
                      <Button onClick={() => comparePopup.current.show(company)}>
                        Сравнить c другими
                      </Button>
                  )
                  : <></>
          }
        </div>
        <CompareCompaniesFormPopup ref={comparePopup}/>
      </div>
  );
};

export default Header;