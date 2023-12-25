import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "src/Components";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    document.scrollingElement.scrollTo(0,0);
  }, [location.pathname])
  
  return (
    <div className="min-h-screen bg-zinc-600">
        <Navbar/>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout