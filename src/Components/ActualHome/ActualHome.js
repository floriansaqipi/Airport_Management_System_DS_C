import { Fragment } from "react";
import Home from "../Home/Home";
import Search from "../Search/Search";
import Support from "../Support/Support";
import Info from "../Info/Info";
import Lounge from "../Lounge/Lounge";
import Travelers from "../Travelers/Travelers";
import Subscriber from "../Subscribers/Subscribe";

export default function ActualHome() {
  return (
    <Fragment>
      <Home />
      <Search />
      <Support />
      <Info />
      <Lounge />
      <Travelers />
      <Subscriber />
    </Fragment>
  );
}
