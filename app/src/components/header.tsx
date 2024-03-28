import React, {useMemo} from 'react';
import {useLocation} from "react-router-dom";
import routes from "../router/routes";
import Icon from "./UI/icon";
import Button from "./UI/button";

const Header = () => {
  const { pathname } = useLocation()
  const breadcrumbs = useMemo(() => {
    if (pathname !== '/') {
      const paths = pathname.split('/').filter(p => p.length)
      return paths.map(path => {
        const route = routes.find(route => route.path === '/' + path)
        return route? route.name : path
      }).join(' / ')
    }
    else return 'Главная'
  }, [pathname])
  return (
      <div className={"w-full flex gap-md px-md py-sm items-center"}>
        <img src={"/icons/logo.svg"} alt={"app-logo"} className={"w-[120px]"}/>
        <div className={"py-xs"}>
          <span>Сервис по отслеживанию рейтинга авиа-перевозок</span>
          <h1 className={"text-black mt-xs"}>{breadcrumbs}</h1>
        </div>
        <div className={"flex flex-1 items-center justify-end px-sm gap-lg"}>
          <div className={"app-input w-[280px]"}>
            <input type="text" placeholder={"Отследить рейс"}/>
            <Icon name={"arrow-right"} size={26}/>
          </div>
          <Button onClick={() => console.log("click")}>
            Сравнить авиа-компании
          </Button>
        </div>
      </div>
  );
};

export default Header;