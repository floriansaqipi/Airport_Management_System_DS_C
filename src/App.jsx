
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Search from './Components/Search/Search'
import Support from './Components/Support/Support'
import Info from './Components/Info/Info'
import Lounge from './Components/Lounge/Lounge'
import Travelers from './Components/Travelers/Travelers'
import Subscriber from './Components/Subscribers/Subscribe'
import Footer from './Components/Footer/Footer'
import Flights from './Components/Flights/Flights'
import Maintenances from './Components/Maintenances/Maintenances'
import Feedbacks from './Components/Feedbacks/Feedbacks'
import FullFeaturedCrudGrid from './Components/test/test'

import './main.scss'
import NavbarObsolette from './Components/Navbar/NavbarObsolette'
import ActualHome from './Components/ActualHome/ActualHome'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import RootLayout from './Components/Root/Root'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <ActualHome /> },
      { path : 'asd', element: <ActualHome /> },

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
