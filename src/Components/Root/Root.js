import { Outlet, useNavigation } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

function Root() {
  // const navigation = useNavigation();

  return (
    <>
      <Navbar/>
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default Root;