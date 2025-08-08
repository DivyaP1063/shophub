
import Header from "../components/Header";

import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <div className="w-screen max-w-full  min-h-screen ">
    
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
