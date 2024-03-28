import HomePage from "../pages/home-page";
import {ReactNode} from "react";
import AirportsPage from "../pages/airports-page";
import CompaniesPage from "../pages/companies-page";
import RatingPage from "../pages/rating-page";
import CompanyPage from "../pages/company-page";
import AirportPage from "../pages/airport-page";
import ErrorPage from "../pages/error-page";
import FlightsPage from "../pages/flights-page";
import FlightPage from "../pages/flight-page";

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
    path: '/airports',
    element: <AirportsPage/>,
    name: 'Аэропорты'
  },
  {
    path: '/companies',
    element: <CompaniesPage/>,
    name: 'Компании'
  },
  {
    path: '/flights',
    element: <FlightsPage/>,
    name: 'Рейсы'
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
    path: '/airports/:id',
    element: <AirportPage/>,
  },
  {
    path: '/flights/:id',
    element: <FlightPage/>
  },
  {
    path: '/notfound',
    element: <ErrorPage/>,
  }
]

export default routes