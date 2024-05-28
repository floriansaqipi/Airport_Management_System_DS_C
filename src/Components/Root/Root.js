import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";

import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import { getTokenDuration } from "../../util/auth";

function Root() {
  // const navigation = useNavigation();
  const auth = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!auth) {
      return;
    }
    if (auth === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration)

  }, [auth, submit]);

  return (
    <>
      <Navbar />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;
