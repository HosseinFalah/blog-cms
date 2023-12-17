import { createBrowserRouter } from "react-router-dom";
import { NotFound } from "src/Components";
import RootLayout from "src/Container/Layouts/RootLayout";
import App from "src/App";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {path: '/', element: <App/>}
        ]
    }
])

export default router;