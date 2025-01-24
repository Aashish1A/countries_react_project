import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Components/20. Countries_API/Home';
import Countries_API from './Components/20. Countries_API/Countries_API';
import Error from './Components/20. Countries_API/Error';
import Country_Details from './Components/20. Countries_API/Country_Details';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Countries_API />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/:country",
        element: <Country_Details />
      },
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
    </>
  </StrictMode>,
)
