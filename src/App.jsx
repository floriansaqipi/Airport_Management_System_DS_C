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

import './main.scss'


function App() {
  return (
   <div>
    <Navbar />
    <Home />
    <Search />
    <Support />
    <Flights />
    <Info />
    <Lounge />
    <Travelers />
    <Subscriber />
    <Footer /> 
   </div>
  )
}

export default App;
