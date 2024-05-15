import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const MyFoodRequests = () => {
  const [foods, setFoods] = useState([]);
  const { user } = useContext(AuthContext);
const {setLoading} = useContext(AuthContext)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/requestedFood`).then((res) => {
      // filter with usr email and set to the state
      const filteredFoods = res.data.filter(
        (food) => food.userEmail === user.email
      );
      setFoods(filteredFoods);
      setLoading(false)
    });
  }, []);
  console.log(foods);
  return (
    <div className=" container mx-auto text-center my-10 min-h-[calc(100vh-150px)]">
      <h1 className="text-3xl font-lobster">My Food Requests</h1>
      <div className="flex flex-col mb-6 mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block lg:min-w-full md:min-w-2xl  py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full container mx-auto divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="">
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex font-semibold justify-center items-center gap-x-3">
                        <span>Food Name</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex font-semibold justify-center items-center gap-x-3">
                        <span>Food Image</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right  text-gray-500"
                    >
                      <div className="flex font-semibold justify-center items-center gap-x-3">
                        <span>Donar Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-semibold flex justify-center text-sm  text-left rtl:text-right text-gray-500 "
                    >
                      <span>Pickup Location</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-center text-sm font-semibold rtl:text-right text-gray-500"
                    >
                      <span>Expire Date</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-500"
                    >
                      Request Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {foods.map((food) => (
                    <tr key={food._id}>
                      <td className=" py-2 text-sm text-gray-500  whitespace-nowrap">
                        <div className="avatar">
                          <div className="w-10 rounded-xl">
                            <img src={food.foodImage} />
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-sm text-gray-500  whitespace-nowrap">
                        {food.foodName}
                      </td>
                      <td className="py-2 text-sm text-gray-500  whitespace-nowrap">
                        {food.donatorName}
                      </td>

                      <td className="py-2 text-sm text-gray-500  whitespace-nowrap  ">
                        {food.pickupLocation}
                      </td>

                      <td className="py-2 text-sm text-gray-500  whitespace-nowrap">
                        {food.expiredDate}
                      </td>
                      <td className="py-2 px-4 text-sm whitespace-nowrap text-gray-500  ">
                        <div className="flex items-center gap-x-2">
                          {food.requestDate}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFoodRequests;
