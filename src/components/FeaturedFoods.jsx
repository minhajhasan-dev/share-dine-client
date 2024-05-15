import "animate.css";
import axios from "axios";
import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import { Slide, Zoom } from "react-awesome-reveal";
import toast from "react-hot-toast";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaGift, FaLocationDot } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import loadingSpinner from "../assets/loading.json";
import { AuthContext } from "../provider/AuthProvider";

const FeaturedFoods = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/featuredFoods`)
      .then((response) => {
        setFoods(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch(() => {
        toast.error("Failed to fetch featured foods");
      });
  }, [foods, setLoading]);
  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-268px)] justify-center items-center">
        <Lottie className="w-56 h-56" animationData={loadingSpinner}></Lottie>
      </div>
    );
  }
  return (
    <div className="mt-10 text-center">
      <Slide>
        {" "}
        <h1 className="text-3xl mb-5 font-lobster">Featured Foods</h1>
      </Slide>
      {/* filtered foods will be show here */}
      <Zoom>
        <div className="container mb-6 grid grid-cols-1 justify-items-center gap-5 md:max-w-2xl lg:max-w-5xl  md:grid-cols-2 lg:grid-cols-3 p-2  mx-auto">
          {foods
            .filter((food) => food.foodStatus === "available")
            .map((food) => (
              <div
                key={food._id}
                className="w-full relative max-w-xs overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800"
              >
                <img
                  className="object-cover  object-center w-full h-44"
                  src={food.foodImage}
                  alt="avatar"
                />
                <div className="badge absolute right-2 top-2 badge-neutral">
                  {" "}
                  <p className="animate-pulse"> {food.foodStatus}</p>
                </div>

                {/* avatar here right-2 top-40 */}

                <div className="flex gap-2 items-center px-6 py-3 bg-gray-900">
                  <FaGift className="w-5 h-5 fill-white" />
                  <h1 className="mx-0 text-sm w-full font-semibold text-white">
                    {food.foodName}
                    <span className="text-gray-400"> by </span>
                    {food.donatorName}
                  </h1>
                </div>

                <div className="px-6 py-4">
                  <div className="border mb-2 bg-stone-50 rounded-lg p-3">
                    <span className=" text-sm font-semibold text-gray-80">
                      <p className="text-center">Special Notes from Donator</p>
                    </span>
                    <h1 className=" text-xs font-semibold text-gray-600 text-center">
                      {food.additionalNotes}
                    </h1>
                  </div>
                  <div className="flex gap-2 ">
                    <div className="border flex flex-col items-start gap-1 mb-2 space-y-2 bg-stone-50 rounded-lg p-3 w-fit ">
                      <span className="flex gap-1 text-sm font-semibold items-center text-gray-80">
                        <GiMeal className="text-xl" />
                        Food For {food.foodQuantity} people
                      </span>
                      <span className="flex gap-1 text-sm font-semibold items-center text-gray-80">
                        <BsCalendar2DateFill className="text-xl" />
                        Collect by {food.expiredDate}
                      </span>
                      <span className="flex gap-1 text-sm font-semibold items-center text-gray-80">
                        <FaLocationDot className="text-xl" />
                        Collect at {food.pickupLocation}
                      </span>
                    </div>
                    <div className="border relative flex flex-col justify-center  items-start gap-1 mb-2 space-y-2 bg-stone-50 rounded-lg w-auto flex-1 ">
                      <div className="avatar bottom-10 right-4 absolute">
                        <div className="w-10  rounded-full ring ">
                          <img src={food.donatorImage} />
                        </div>
                      </div>
                      <span className=" w-full text-xs font-semibold text-gray-600 text-center">
                        <p className="text-center absolute bottom-4 w-full">
                          Donator
                        </p>
                      </span>
                    </div>
                  </div>
                  {/* button here */}
                  <Link
                    to={`/food/${food._id}`}
                    className="btn w-full hover:bg-[#2B3440] bg-[#2B3440] text-[#D7DDE4] "
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </Zoom>
      {/*  Show All  button */}
      <Link
        to={"/available-foods"}
        className="btn mb-5 hover:bg-[#2B3440] bg-[#2B3440] text-white"
      >
        Show All <IoIosArrowDropdownCircle className="animate-pulse size-4" />
      </Link>
    </div>
  );
};

export default FeaturedFoods;
