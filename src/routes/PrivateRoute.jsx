/* eslint-disable react/prop-types */
import Lottie from "lottie-react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import loadingSpinner from "../assets/loading.json";
import { AuthContext } from "../provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-268px)] justify-center items-center">
        <Lottie className="w-56 h-56" animationData={loadingSpinner}></Lottie>
      </div>
    );
  }

  if (user) {
    return children;
  }
  return (
    <Navigate state={location.pathname} replace={true} to={`/login`}>
      {" "}
    </Navigate>
  );
};

export default PrivateRoute;
