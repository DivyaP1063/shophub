import Header from "../components/Header";
import LandingHeader from "../components/Home/LandingHeader";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const showLandingHeader =
    location.pathname === "/" ||
    location.pathname === "/aboutus" ||
    location.pathname === "/contactus";

  return (
    <div className="w-screen max-w-full min-h-screen">
      {showLandingHeader ? <LandingHeader /> : <Header />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
