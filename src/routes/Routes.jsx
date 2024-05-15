import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import AddFood from "../pages/AddFood";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import AvailableFoods from "../pages/AvailableFoods";
import FoodDetails from "../pages/FoodDetails";
import Home from "../pages/Home";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequests from "../pages/MyFoodRequests";
import NotFound from "../pages/NotFound";
import UpdateFood from "../pages/UpdateFood";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-requests",
        element: (
          <PrivateRoute>
            <MyFoodRequests></MyFoodRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "/food/:id",
        element: <FoodDetails></FoodDetails>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/allFoods/${params.id}`),
      },
      {
        path: "/update-food/:id",
        element: <UpdateFood></UpdateFood>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/allFoods/${params.id}`),
      },
    ],
  },
]);

export default router;
