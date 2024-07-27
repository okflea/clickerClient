import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../pages/Login";
import ErrorPage from "@/ErrorPage";
import TopBar from "@/components/TopBar";
import Register from "@/pages/Register";
import Admin from "@/pages/Admin";
import Play from "@/pages/Play";
import { Rank } from "@/pages/Rank";

const Routes = () => {

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/service",
      element: <div>Service Page</div>,
    },
    {
      path: "/about-us",
      element: <div>About Us</div>,
    },
    {
      path: "/login",
      element: <><TopBar /><Login /></>
    },
    {
      path: "/register",
      element: <><TopBar /><Register /></>
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      errorElement: <><TopBar /><ErrorPage /></>,
      children: [
        {
          path: "",
          element: <><TopBar /><Play /></>
        },
        {
          path: "/admin",
          element: <><TopBar /><Admin /></>
        },
        {
          path: "/rank",
          element: <><TopBar /><Rank /></>
        },
      ],
    },
  ];


  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
