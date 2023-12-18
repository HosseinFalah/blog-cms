import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { store } from 'src/App/store';
import router from 'src/Routes/router';

import 'react-toastify/dist/ReactToastify.css';
import 'src/Styles/fonts.css';
import 'src/Styles/index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer position='top-center' />
    <RouterProvider router={router}/>
  </Provider>
)
