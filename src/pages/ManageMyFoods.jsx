import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin2Fill, RiEditCircleFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const ManageMyFoods = () => {
  const [myFoods, setMyFoods] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/allFoods`).then((response) => {
      // filter the foods based on the user email
      const foods = response.data.filter(
        (food) => food.donatorEmail === user.email
      );
      setMyFoods(foods);
    });
  }, []);

  console.log(myFoods);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donatorName: `${user.displayName}`,
      donatorEmail: `${user.email}`,
      donatorImage: `${user.photoURL}`,
    },
  });
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
  const handleUpdate = (data) => {
    console.log(data);
    axios
      .put(`${import.meta.env.VITE_API_URL}/allFoods/${data._id}`, data)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Food Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // this function will open a modal with a form to update the food

  console.log(user.email);
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
                        {food.foodName}
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
                        <button
                          onClick={() =>
                            document.getElementById("my_modal_4").showModal()
                          }
                          title="Update"
                          className="text-gray-500 text-xl transition-colors duration-200   hover:text-green-500 focus:outline-none disabled:cursor-not-allowed"
                        >
                          <RiEditCircleFill />
                        </button>
                        {/* model here */}
                        <dialog id="my_modal_4" className="modal">
                          <div className="modal-box flex flex-col items-center w-fit h-full max-w-5xl">
                            <div className="modal-header">
                              <h1 className="md:text-3xl mb-4 text-xl font-lobster">
                                Update Food
                              </h1>
                            </div>
                            <form
                              onSubmit={handleSubmit(handleUpdate)}
                              className="border m-4 md:m-0 p-5 rounded-xl shadow-lg "
                            >
                              <div className="md:grid md:grid-cols-2 gap-3">
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Food Name
                                      </span>
                                    </div>
                                    <input
                                      {...register("foodName", {
                                        required: {
                                          value: true,
                                          message: "Food Name is required",
                                        },
                                        minLength: {
                                          value: 3,
                                          message:
                                            "Food Name should have at least 3 characters",
                                        },
                                      })}
                                      type="text"
                                      placeholder="Type here"
                                      className="input input-bordered w-[100%] max-w-xl"
                                    />
                                    {errors.foodName && (
                                      <span className="text-red-500">
                                        {errors.foodName.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Food Image
                                      </span>
                                    </div>
                                    <input
                                      {...register("foodImage", {
                                        required: {
                                          value: true,
                                          message: "Food Image is required",
                                        },
                                      })}
                                      type="url"
                                      placeholder="Type URL here"
                                      className="input input-bordered w-full"
                                    />
                                    {errors.foodImage && (
                                      <span className="text-red-500">
                                        {errors.foodImage.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                <div className="mb-5">
                                  <label className="form-control w-full  max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Food Quantity
                                      </span>
                                    </div>
                                    <input
                                      {...register("foodQuantity", {
                                        required: {
                                          value: true,
                                          message: "Food Quantity is required",
                                        },
                                        validate: {
                                          value: (value) =>
                                            !isNaN(value) ||
                                            "Enter a valid number",
                                        },
                                      })}
                                      type="text"
                                      placeholder="Type here"
                                      className="input input-bordered w-full "
                                    />
                                    {errors.foodQuantity && (
                                      <span className="text-red-500">
                                        {errors.foodQuantity.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Pickup Location
                                      </span>
                                    </div>
                                    <input
                                      {...register("pickupLocation", {
                                        required: {
                                          value: true,
                                          message:
                                            "Pickup Location is required",
                                        },
                                        maxLength: {
                                          value: 10,
                                          message:
                                            "Having more words? Please write on the additional notes section",
                                        },
                                      })}
                                      type="text"
                                      placeholder="Type here"
                                      className="input input-bordered w-full "
                                    />
                                    {errors.pickupLocation && (
                                      <span className="text-red-500">
                                        {errors.pickupLocation.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Expired Date
                                      </span>
                                    </div>
                                    <input
                                      type="date"
                                      {...register("expiredDate", {
                                        required: {
                                          value: true,
                                          message: "Expired Date is required",
                                        },
                                      })}
                                      className="input input-bordered w-full"
                                    />

                                    {errors.expiredDate && (
                                      <span className="text-red-500"></span>
                                    )}
                                  </label>
                                </div>
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Food Status
                                      </span>
                                    </div>
                                    <select
                                      {...register("foodStatus", {
                                        required: {
                                          value: true,
                                          message: "Food Status is required",
                                        },
                                      })}
                                      className="select select-bordered w-full "
                                    >
                                      <option selected>available</option>
                                      <option>Unavailable</option>
                                    </select>
                                    {errors.foodStatus && (
                                      <span className="text-red-500">
                                        {errors.foodStatus.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                {/* donator info here */}
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Donator Name
                                      </span>
                                    </div>
                                    <input
                                      {...register("donatorName", {
                                        required: {
                                          value: true,
                                          message: "Donator Name is required",
                                        },
                                      })}
                                      type="text"
                                      placeholder="Type here"
                                      className="input input-bordered w-full "
                                    />
                                    {errors.donatorName && (
                                      <span className="text-red-500">
                                        {errors.donatorName.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                {/* donator image */}
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Donator Image
                                      </span>
                                    </div>
                                    <input
                                      {...register("donatorImage", {
                                        required: {
                                          value: true,
                                          message: "Donator Image is required",
                                        },
                                      })}
                                      type="url"
                                      placeholder="Type URL here"
                                      className="input input-bordered w-full"
                                    />
                                    {errors.donatorImage && (
                                      <span className="text-red-500">
                                        {errors.donatorImage.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                {/* donator email */}
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Donator Email
                                      </span>
                                    </div>
                                    <input
                                      {...register("donatorEmail", {
                                        required: {
                                          value: true,
                                          message: "Donator Email is required",
                                        },
                                      })}
                                      type="email"
                                      placeholder="Type here"
                                      className="input input-bordered w-full "
                                    />
                                    {errors.donatorEmail && (
                                      <span className="text-red-500">
                                        {errors.donatorEmail.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                                <div className="mb-5">
                                  <label className="form-control w-full max-w-xl mx-auto">
                                    <div className="label">
                                      <span className="label-text">
                                        Additional Notes
                                      </span>
                                    </div>
                                    <textarea
                                      {...register("additionalNotes", {
                                        required: {
                                          value: true,
                                          message:
                                            "Additional Notes is required",
                                        },
                                        maxLength: {
                                          value: 35,
                                          message:
                                            "Maximum 35 characters allowed",
                                        },
                                      })}
                                      className="textarea textarea-xs textarea-bordered"
                                      placeholder="Bio"
                                    ></textarea>
                                    {errors.additionalNotes && (
                                      <span className="text-red-500">
                                        {errors.additionalNotes.message}
                                      </span>
                                    )}
                                  </label>
                                </div>
                              </div>

                              <button className="btn w-full hover:bg-[#2B3440] bg-[#2B3440] text-[#D7DDE4] ">
                                Update Food
                              </button>
                            </form>
                            <div className="modal-action">
                              <button
                                className="btn absolute top-4 right-4 btn-circle btn-sm bg-red-500 hover:bg-red-600 text-white"
                                onClick={() =>
                                  document.getElementById("my_modal_4").close()
                                }
                              >
                                <IoMdClose />
                              </button>
                            </div>
                          </div>
                        </dialog>
                        {/* modal end here */}
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
