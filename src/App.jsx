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
const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxNjc1ODUyMiwiZXhwIjoxNzE2NzYyMTIyfQ.flsJSwSZtCuGTsL90avqKGWc6SorUPkWCTirnmr4dxqVQRRJvJFjvb5LHRPyFlhh9AmMSSBQ21cJWI89MKYPDw"
localStorage.setItem('token', token); 

function App() {
  return (
   <div>
    <Navbar />
    {/* <Home />
    <Search />
    <Support /> */}
    <Flights />
    {/* <Info />
    <Lounge />
    <Travelers />
    <Subscriber />
    <Footer />  */}
   </div>
  )
}

export default App;
