import HomePage from "../pages/home-page";
import {ReactNode} from "react";
import AirportsPage from "../pages/airports-page";
import CompaniesPage from "../pages/companies-page";
import RatingPage from "../pages/rating-page";
import CompanyPage from "../pages/company-page";
import AirportPage from "../pages/airport-page";
import ErrorPage from "../pages/error-page";

type AppRouteType = {
  path: string
  element: ReactNode
}

const routes: AppRouteType[] = [
  {
    path: '/',
    element: <HomePage/>
  },
  {
    path: '/airports',
    element: <AirportsPage/>
  },
  {
    path: '/companies',
    element: <CompaniesPage/>
  },
  {
    path: '/rating',
    element: <RatingPage/>
  },
  {
    path: '/companies/:id',
    element: <CompanyPage/>
  },
  {
    path: '/airports/:id',
    element: <AirportPage/>
  },
  {
    path: '/notfound',
    element: <ErrorPage/>
  }
]

export default routes