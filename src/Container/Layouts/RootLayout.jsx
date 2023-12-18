import { Outlet } from "react-router-dom";
import { Navbar } from "src/Components";

const RootLayout = () => {
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