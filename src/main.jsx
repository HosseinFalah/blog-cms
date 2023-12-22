import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from 'src/App/store';
import router from 'src/Routes/router';

import 'src/Styles/fonts.css';
import 'src/Styles/index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Toaster toastOptions={{ duration: 3000 }} position="top-center"/>
    <RouterProvider router={router}/>
  </Provider>
)
