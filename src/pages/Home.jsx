import Banner from "../components/Banner";
import FeaturedFoods from "../components/FeaturedFoods";

const Home = () => {
  return (
    <div className=" min-h-[calc(100vh-150px)]">
      {/* Banner */}
      <Banner></Banner>
      <FeaturedFoods></FeaturedFoods>
    </div>
  );
};

export default Home;
