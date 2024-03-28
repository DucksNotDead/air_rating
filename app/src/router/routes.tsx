import HomePage from "../pages/home-page";
import {ReactNode} from "react";
import RatingPage from "../pages/rating-page";
import CompanyPage from "../pages/company-page";
import ErrorPage from "../pages/error-page";
import CompaniesComparePage from "../pages/companies-compare-page";

type AppRouteType = {
  path: string
  element: ReactNode
  name?: string
}

const routes: AppRouteType[] = [
  {
    path: '/',
    element: <HomePage/>,
    name: 'Главная'
  },
  {
    path: '/rating',
    element: <RatingPage/>,
    name: 'Рейтинг'
  },
  {
    path: '/companies/:id',
    element: <CompanyPage/>,
  },
  {
    path: '/companies/:firstId/:secondId',
    element: <CompaniesComparePage/>
  },
  {
    path: '/notfound',
    element: <ErrorPage/>,
  }
]

export default routes