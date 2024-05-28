import "./main.scss";

import ActualHome from "./Components/ActualHome/ActualHome";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/Root/Root";
import Flights from "./Components/Flights/Flights";
import AirportList from "./Components/Airport/AirportList";
import PassengerList from "./Components/Passenger/PassengerList";
import EmployeeList from "./Components/Employee/EmployeeList";
import UserList from "./Components/Users/UserList";
import LogIn from "./Components/Users/LogIn";
import Signup from "./Components/Passenger/Signup";
import PassengerDetail from "./Components/Passenger/PassengerDetail";
import EditPassengerFrom from "./Components/Passenger/EditPassengerForm";
import AddPassengerForm from "./Components/Passenger/AddPassengerForm";
import AirlineList from './Components/Airline/AirlineList';
import AirlineDetail from './Components/Airline/AirlineDetail';
import EditAirlineForm from './Components/Airline/EditAirlineForm';
import AddAirlineForm from './Components/Airline/AddAirlineForm';
import BaggageList from "./Components/Baggage/BaggageList";
import BaggageDetails from './Components/Baggage/BaggageDetail';
import EditBaggageForm from './Components/Baggage/EditBaggageForm';
import AddBaggageForm from './Components/Baggage/AddBaggageForm';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
            path: "new", element : <AddBaggageForm />
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
            path: "new", element : <AddPassengerForm />
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
            path: "new", element : <AddAirlineForm />
          },
        ],
      },
      { path: "employees", element: <EmployeeList /> },
      { path: "users", element: <UserList /> },
      { path: "login", element: <LogIn /> },
      // { path : 'signup', element: <Signup /> }, //TODO: implement this route element component
      // { path : 'logout', element: <Flights /> },

      // {
      //   path: 'events',
      //   element: <EventsRootLayout />,
      //   children: [
      //     {
      //       index: true,
      //       element: <EventsPage />,
      //       loader: eventsLoader,
      //     },
      //     {
      //       path: ':eventId',
      //       id: 'event-detail',
      //       loader: eventDetailLoader,
      //       children: [
      //         {
      //           index: true,
      //           element: <EventDetailPage />,
      //           action: deleteEventAction,
      //         },
      //         {
      //           path: 'edit',
      //           element: <EditEventPage />,
      //           action: manipulateEventAction,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'new',
      //       element: <NewEventPage />,
      //       action: manipulateEventAction,
      //     },
      //   ],
      // },
      // {
      //   path: 'newsletter',
      //   element: <NewsletterPage />,
      //   action: newsletterAction,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
