import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { RiDeleteBin2Fill, RiEditCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Lottie from "lottie-react";
import loadingSpinner from "../assets/loading.json";

const ManageMyFoods = () => {
  const { loading, setLoading } = useContext(AuthContext);
  const [myFoods, setMyFoods] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/allFoods`).then((response) => {
      // filter the foods based on the user email
      const foods = response.data.filter(
        (food) => food.donatorEmail === user.email
      );
      setMyFoods(foods);
    });
    setLoading(false);
  }, []);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${import.meta.env.VITE_API_URL}/allFoods/${id}`)
            .then((response) => {
              if (response.status === 200) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your food has been deleted.",
                  icon: "success",
                });
                setMyFoods(myFoods.filter((food) => food._id !== id));
              }
            });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your food is safe :)",
            icon: "error",
          });
        }
      });
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-268px)] justify-center items-center">
        <Lottie className="w-56 h-56" animationData={loadingSpinner}></Lottie>
      </div>
    );
  }
  return (
    <section className="container px-4  min-h-[calc(100vh-267px)] mx-auto pt-12">
      <div className="flex justify-center items-center gap-x-3">
        <h1 className="text-3xl font-lobster">Manage My Foods</h1>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Food Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 hidden md:block"
                    >
                      <span>Quantity</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Expiry</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Pickup Location
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 hidden md:block"
                    >
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {myFoods.map((food) => (
                    <tr key={food._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        <Link
                          className="text-amber-500 hover:animate-pulse hover:text-amber-700 hover:underline"
                          to={`/food/${food._id}`}
                        >
                          {food.foodName}
                        </Link>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap hidden md:block">
                        {food.foodQuantity}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {food.expiredDate}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          {food.pickupLocation}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="lg:inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500 hidden md:block">
                          <span className="h-1.5 w-1.5 animate-ping rounded-full bg-yellow-500"></span>
                          <h2 className="text-sm font-normal ">
                            {" "}
                            {food.foodStatus}{" "}
                          </h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 flex md:static absolute right-1 items-center gap-2 text-sm whitespace-nowrap">
                        <Link
                          to={`/update-food/${food._id}`}
                          title="Update"
                          className="text-gray-500 text-xl transition-colors duration-200   hover:text-green-500 focus:outline-none disabled:cursor-not-allowed"
                        >
                          <RiEditCircleFill />
                        </Link>

                        <button
                          onClick={() => handleDelete(food._id)}
                          title="Delete"
                          className="text-gray-500 text-xl transition-colors duration-200   hover:text-red-500 focus:outline-none disabled:cursor-not-allowed"
                        >
                          <RiDeleteBin2Fill />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageMyFoods;
