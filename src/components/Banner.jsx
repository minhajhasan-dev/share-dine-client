import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-96  bg-base-200"
      style={{
        backgroundImage:
          "url(https://static.ssb.ee/images/emtakpics/9499-0002.jpg)",
      }}
    >
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1
            data-aos="zoom-in-down"
            data-aos-duration="1000"
            className="text-5xl font-bold"
          >
            Welcome to <span className="font-lobster">ShareDine</span>
          </h1>
          <p data-aos="zoom-in-down"  data-aos-duration="1000" className="py-6">
            ShareDine connects you with neighbors to share delicious food and
            fight food waste.
          </p>
          <Link
            to={"/add-food"}
            className="btn mb-5 hover:bg-[#2B3440] bg-[#2B3440] text-white"
          >
            Add Food
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
