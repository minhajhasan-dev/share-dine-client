import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaGift, FaLocationDot, FaUser } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const FoodDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const {
    _id,
    donatorName,
    donatorEmail,
    expiredDate,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    additionalNotes,
  } = useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      foodName: foodName,
      foodImage: foodImage,
      foodId: _id,
      pickupLocation: pickupLocation,
      expiredDate: expiredDate,
      requestDate: new Date().toISOString().split("T")[0],
      donatorName: donatorName,
      userEmail: userEmail,
      donatorEmail: donatorEmail,
      additionalNotes: additionalNotes,
    },
  });
  const handleFoodRequest = (data) => {
    data.status = "requested";
    axios
      .post(`${import.meta.env.VITE_API_URL}/requestedFood`, data)
      .then((response) => {
        if (response.data.insertedId) {
          toast.success("Food requested successfully");
        }
        navigate("/manage-my-foods");
      })
      .catch((error) => {
        console.error("Error requesting food:", error);
        toast.error("Error requesting food");
      });

    axios
      .delete(`${import.meta.env.VITE_API_URL}/allFoods/${_id}`)
      .then(() => {
        console.log("Food deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting food:", error);
        toast.error("Error deleting food");
      });
  };
  return (
    <div className=" mx-auto min-h-[calc(100vh-150px)]">
      <div className="flex justify-center gap-2 items-center px-6 py-3 bg-gray-900">
        <FaGift className="w-5 h-5 fill-white" />
        <h1 className="mx-0 flex gap-2 font-semibold text-white">
          {foodName} by {donatorName}
        </h1>
      </div>
      <div
        className="hero md:min-h-[500px] min-h-72   bg-base-200"
        style={{
          backgroundImage: `url(${foodImage})`,
          backgroundSize: "cover",
        }}
      ></div>
      {/* food info and donar info */}
      <div className="px-6  md:min-h-96  py-4">
        <div className="border md:min-h-80 container mx-auto justify-center flex flex-col  items-center gap-1 mb-2 space-y-2 bg-stone-50 rounded-lg p-3 ">
          <div className="flex md:flex-row flex-col justify-around w-full">
            <div className="space-y-2">
              {" "}
              <div className="flex md:justify-center w-full">
                <h1 className="md:text-2xl text-xl font-lobster">
                  Food Details
                </h1>
              </div>
              <span className="flex gap-1 text-sm font-semibold items-center text-gray-80">
                <GiMeal className="text-xl" />
                {foodName} For {foodQuantity} people
              </span>
              <span className="flex gap-1 text-sm font-semibold items-center text-gray-80">
                <BsCalendar2DateFill className="text-xl" />
                Collect by {expiredDate}
              </span>
            </div>

            <div className="divider lg:divider-horizontal"></div>
            {/* don */}
            <div className="space-y-2 ">
              {" "}
              <div className="flex md:justify-center w-full">
                <h1 className="md:text-2xl text-xl font-lobster">
                  Donor Information
                </h1>
              </div>
              <span className="flex gap-1 text-sm font-semibold items-center text-gray-80">
                <FaUser className="text-xl" />
                {donatorName}
              </span>
              <span className="flex gap-1 text-sm font-semibold items-center text-gray-80">
                <FaLocationDot className="text-xl" />
                Collect your {foodName} at {pickupLocation}
              </span>
            </div>
          </div>
        </div>
        <div className="border mb-2 min-h-16 container mx-auto bg-stone-50 rounded-lg p-3">
          <button
            className="btn w-full hover:bg-[#2B3440] bg-[#2B3440] text-[#D7DDE4]"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Request Food
          </button>
          {/* modal here */}
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box flex flex-col items-center w-fit h-full max-w-5xl">
              <div className="modal-header">
                <h1 className="md:text-3xl mb-4 text-xl font-lobster">
                  Request Food
                </h1>
              </div>
              <form
                onSubmit={handleSubmit(handleFoodRequest)}
                className="border w-full m-4 md:m-0 p-5 rounded-xl shadow-lg "
              >
                <div className="md:grid md:grid-cols-2 gap-3">
                  <div className="mb-5">
                    <label className="form-control w-full max-w-xl mx-auto">
                      <div className="label">
                        <span className="label-text">Food Name</span>
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
                        readOnly
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
                        <span className="label-text">Food Image</span>
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
                        readOnly
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
                        <span className="label-text">Food ID</span>
                      </div>
                      <input
                        {...register("foodId", {
                          required: {
                            value: true,
                            message: "Food ID is required",
                          },
                        })}
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full "
                        readOnly
                      />
                    </label>
                  </div>
                  <div className="mb-5">
                    <label className="form-control w-full max-w-xl mx-auto">
                      <div className="label">
                        <span className="label-text">Pickup Location</span>
                      </div>
                      <input
                        {...register("pickupLocation", {
                          required: {
                            value: true,
                            message: "Pickup Location is required",
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
                        readOnly
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
                        <span className="label-text">Expired Date</span>
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
                        readOnly
                      />
                      {errors.expiredDate && (
                        <span className="text-red-500"></span>
                      )}
                    </label>
                  </div>
                  <div className="mb-5">
                    <label className="form-control w-full max-w-xl mx-auto">
                      <div className="label">
                        <span className="label-text">Request Date</span>
                      </div>
                      <input
                        type="date"
                        {...register("requestDate", {
                          required: {
                            value: true,
                            message: "Request Date is required",
                          },
                        })}
                        className="input input-bordered w-full"
                        readOnly
                      />
                      {errors.requestDate && (
                        <span className="text-red-500"></span>
                      )}
                    </label>
                  </div>
                  {/* donator info here */}
                  <div className="mb-5">
                    <label className="form-control w-full max-w-xl mx-auto">
                      <div className="label">
                        <span className="label-text">Donator Name</span>
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
                        readOnly
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
                        <span className="label-text">User Email</span>
                      </div>
                      <input
                        {...register("userEmail", {
                          required: {
                            value: true,
                            message: "User Email is required",
                          },
                        })}
                        type="text"
                        placeholder="User Email"
                        className="input input-bordered w-full"
                        readOnly
                      />
                      {errors.userEmail && (
                        <span className="text-red-500">
                          {errors.userEmail.message}
                        </span>
                      )}
                    </label>
                  </div>
                  {/* donator email */}
                  <div className="mb-5">
                    <label className="form-control w-full max-w-xl mx-auto">
                      <div className="label">
                        <span className="label-text">Donator Email</span>
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
                        readOnly
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
                        <span className="label-text">Additional Notes</span>
                      </div>
                      <textarea
                        {...register("additionalNotes", {
                          required: {
                            value: true,
                            message: "Additional Notes is required",
                          },
                          maxLength: {
                            value: 35,
                            message: "Maximum 35 characters allowed",
                          },
                        })}
                        className="textarea text-sm textarea-xs textarea-bordered"
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
                  Confirm Request
                </button>
              </form>
              <div className="modal-action">
                <button
                  className="btn absolute top-4 right-4 btn-circle btn-sm bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  <IoMdClose />
                </button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
