import { Outlet } from "react-router-dom";
import { Navbar } from "src/Components";

const RootLayout = () => {
  return (
    <div>
        <Navbar/>
        <main>
            <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout