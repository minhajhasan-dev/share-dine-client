import Lottie from "lottie-react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import errorAnimation from "../assets/404.json";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col min-h-[calc(100vh-20px)] items-center justify-center">
        <Lottie className="size-96" animationData={errorAnimation} />
        <Link to={"/"} className="btn btn-outline">
          {" "}
          <FaHome /> Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
