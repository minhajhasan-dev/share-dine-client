import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaGift, FaLocationDot } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";

const AvailableFoods = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("fresh");

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/allFoods?sort=${sort}&search=${search}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
      })
      .catch(() => {
        toast.error("Failed to fetch foods");
      });
  }, [sort, search]);

  const handleSearch = (e) => {
    e.preventDefault();
    const text = e.target.search.value;
    setSearch(text);
  };

  return (
    <div className=" min-h-[calc(100vh-150px)]">
      {/* sub nav here */}
      <form
        onSubmit={handleSearch}
        className="navbar form my-5 bg-base-100 container px-3 mx-auto "
      >
        <div className="flex-1">
          <h1 className="md:text-3xl text-xl font-lobster">Available Foods</h1>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search Foods"
              name="search"
              className="input input-bordered lg:w-96 md:w-auto w-36  "
            />
          </div>
          <div className="form-control text-sm">
            <select
              onChange={(e) => setSort(e.target.value)}
              value={sort}
              className="select select-bordered w-28 md:w-auto"
            >
              <option value="fresh">Freshest First</option>
              <option value="expiring">Sort by Expiry</option>
            </select>
          </div>
        </div>
      </form>
      {/* available foods */}
      <div className="container grid grid-cols-1 justify-items-center gap-5  md:grid-cols-2 lg:grid-cols-4 p-2  mx-auto">
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
              <div className="badge absolute right-2 top-2 badge-neutral ">
                {" "}
                <p className="animate-pulse"> {food.foodStatus}</p>
              </div>

              {/* avatar here right-2 top-40 */}

              <div className="flex items-center px-6 py-3 bg-gray-900">
                <h1 className="mx-0 flex gap-2 font-semibold text-white">
                  <FaGift className="w-5 h-5 fill-current" />
                  {food.foodName}
                  <span className="text-gray-400">by</span>
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
                <button className="btn w-full hover:bg-[#2B3440] bg-[#2B3440] text-[#D7DDE4] ">
                  View
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AvailableFoods;
