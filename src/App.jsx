import "./main.scss";

import ActualHome from "./Components/ActualHome/ActualHome";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/Root/Root";
import Flights from "./Components/Flights/Flights";
import AirportList from "./Components/Airport/AirportList";
import PassengerList from "./Components/Passenger/PassengerList";
import EmployeeList from "./Components/Employee/EmployeeList";
import UserList from "./Components/Users/UserList";
import Login from "./Components/Users/Login";
import Signup from "./Components/Passenger/Signup";
import PassengerDetail from "./Components/Passenger/PassengerDetail";
import EditPassengerFrom from "./Components/Passenger/EditPassengerForm";
import AddPassengerForm from "./Components/Passenger/AddPassengerForm";
import AirlineList from "./Components/Airline/AirlineList";
import AirlineDetail from "./Components/Airline/AirlineDetail";
import EditAirlineForm from "./Components/Airline/EditAirlineForm";
import AddAirlineForm from "./Components/Airline/AddAirlineForm";
import BaggageList from "./Components/Baggage/BaggageList";
import BaggageDetails from "./Components/Baggage/BaggageDetail";
import EditBaggageForm from "./Components/Baggage/EditBaggageForm";
import AddBaggageForm from "./Components/Baggage/AddBaggageForm";
import { action as LogoutAction } from "./Components/Users/Logout";
import { authLoader } from './util/auth'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: 'root',
    loader: authLoader,
    children: [
      { index: true, element: <ActualHome /> },
      { path: "flights", element: <Flights /> },
      // { path : 'tickets', element: <Tickets /> },
      { path: "airports", element: <AirportList /> },
      {
        path: "baggage",
        children: [
          { index: true, element: <BaggageList /> },
          {
            path: ":baggageId",
            children: [
              { index: true, element: <BaggageDetails /> },
              { path: "edit", element: <EditBaggageForm /> },
            ],
          },
          {
            path: "new",
            element: <AddBaggageForm />,
          },
        ],
      },
      {
        path: "passengers",
        children: [
          { index: true, element: <PassengerList /> },
          {
            path: ":passengerId",
            children: [
              { index: true, element: <PassengerDetail /> },
              { path: "edit", element: <EditPassengerFrom /> },
            ],
          },
          {
            path: "new",
            element: <AddPassengerForm />,
          },
        ],
      },
      {
        path: "airlines",
        children: [
          { index: true, element: <AirlineList /> },
          {
            path: ":airlineId",
            children: [
              { index: true, element: <AirlineDetail /> },
              { path: "edit", element: <EditAirlineForm /> },
            ],
          },
          {
            path: "new",
            element: <AddAirlineForm />,
          },
        ],
      },
      { path: "employees", element: <EmployeeList /> },
      { path: "users", element: <UserList /> },
      { path: "signup", element: <Signup /> },
      { path: "logout", action: LogoutAction },
    ],
  },
  { path: "/login", element: <Login />},
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
