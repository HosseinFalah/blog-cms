import { createBrowserRouter } from "react-router-dom";
import { NotFound, Blog, CraeteBlogForm, EditBlogForm } from "src/Components";
import RootLayout from "src/Container/Layouts/RootLayout";
import { Home } from "src/Pages";

const router = createBrowserRouter([
    {
        path: '/', 
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {path: '/', element: <Home/>},
            {path: '/blogs/:blogId', element: <Blog/>},
            {path: '/blogs/:create-blog', element: <CraeteBlogForm/>},
            {path: '/edit-blog/:blogId', element: <EditBlogForm/>}
        ]
    }
])

export default router;