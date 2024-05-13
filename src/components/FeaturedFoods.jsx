const FeaturedFoods = ({ demo }) => {
  return (
    <div className="mt-10 text-center">
      <h1 className="text-3xl font-lobster">Featured Foods</h1>
      <div className="grid grid-cols-3">
        {demo?.map((food) => (
          <div key={food._id} className="mt-5">
            <img
              src={food.image}
              alt={food.name}
              className="w-40 h-40 object-cover mx-auto rounded-full"
            />
            <p className="text-lg font-bold mt-2">{food.food_name}</p>
            <p className="text-gray-500">{food.food_quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedFoods;
