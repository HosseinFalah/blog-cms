import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/router';
import 'src/Styles/fonts.css';
import 'src/Styles/index.css';

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
