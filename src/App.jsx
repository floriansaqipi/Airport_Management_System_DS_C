import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import Search from './Components/Search/Search'
import Support from './Components/Support/Support'
import Info from './Components/Info/Info'

import './main.scss'


function App() {
  return (
   <div>
    <Navbar />
    <Home />
    <Search />
    <Support />
    <Info />
   </div>
  )
}

export default App;
