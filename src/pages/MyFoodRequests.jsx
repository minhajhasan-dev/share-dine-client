import { useLoaderData } from "react-router-dom";

const MyFoodRequests = () => {
  const requestedFoods = useLoaderData();
  console.log(requestedFoods);
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-150px)]">
      <h1 className="text-3xl font-lobster">My Food Requests</h1>
      <p>Test: </p>
    </div>
  );
};

export default MyFoodRequests;
