import axios from "axios";
import { useContext } from "react";
import { Slide, Zoom } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const { setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      donatorName: `${user.displayName}`,
      donatorEmail: `${user.email}`,
      donatorImage: `${user.photoURL}`,
      expiredDate: new Date().toLocaleDateString(),
    },
  });

  const handleAddFood = (data) => {
    console.log(data);
    setLoading(false);
    axios
      .post(`${import.meta.env.VITE_API_URL}/allFoods`, data)
      .then((response) => {
        console.log(response.data);
        if (response.data.insertedId) {
          toast.success("Food added successfully");
        }
        navigate("/manage-my-foods");
      });
  };
  return (
    <div className="min-h-[calc(100vh-150px)]">
      <Slide>
        <h1 className="text-3xl text-center my-10 font-lobster mb-5">
          Add Food
        </h1>
      </Slide>
      {/* form div here */}
      <Zoom>
        <div className="max-w-2xl mx-auto mb-10">
          <form
            onSubmit={handleSubmit(handleAddFood)}
            className="border m-4 md:m-0 p-5 rounded-xl shadow-lg "
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
                        message: "Food Name should have at least 3 characters",
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
                    <span className="label-text">Food Quantity</span>
                  </div>
                  <input
                    {...register("foodQuantity", {
                      required: {
                        value: true,
                        message: "Food Quantity is required",
                      },
                      validate: {
                        value: (value) =>
                          !isNaN(value) || "Enter a valid number",
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
                  />
                  {/* <DatePicker
                  {...register("expiredDate")}
                  className="input input-bordered w-full"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                /> */}

                  {errors.expiredDate && <span className="text-red-500"></span>}
                </label>
              </div>
              <div className="mb-5">
                <label className="form-control w-full max-w-xl mx-auto">
                  <div className="label">
                    <span className="label-text">Food Status</span>
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
                    <span className="label-text">Donator Image</span>
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
              Add Food
            </button>
          </form>
        </div>
      </Zoom>
    </div>
  );
};

export default AddFood;
