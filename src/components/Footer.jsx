import logo2 from "/charity.png";
const Footer = () => {
  return (
    <footer className="footer p-10 bg-base-200 text-base-content">
      <aside className="w-[100%] h-[100%] flex gap-4 justify-center items-center ">
        <img src={logo2} className="size-14" />
        <div>
          <p>
            <span className="font-lobster text-2xl">Share Dine Ltd.</span>
            <br />
            <span className="font-serif ">
              Bringing People Together Through Food
            </span>
          </p>
          <p className="text-xs font-lato">
            {" "}
            &copy; 2024 Share Dine Ltd. All rights reserved.
          </p>
        </div>
      </aside>

      <nav className=" flex md:gap-24 gap-16 justify-center">
        <nav className="grid grid-cols-1">
          <h6 className="footer-title">Contact Info</h6>
          <a className="link link-hover">Email: info@sharedine.com</a>
          <a className="link link-hover">Website: www.sharedine.com</a>
          <a className="link link-hover">Phone: +1 123-456-7890</a>
          <a className="link link-hover">Address: 123 Main St, City, Country</a>
        </nav>

        <nav className="grid grid-cols-1">
          <h6 className="footer-title">About</h6>
          <a className="link link-hover">Our Story</a>
          <a className="link link-hover">Team</a>
          <a className="link link-hover">Testimonials</a>
          <a className="link link-hover">FAQ</a>
        </nav>

        <nav className="grid grid-cols-1">
          <h6 className="footer-title">Connect</h6>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">Instagram</a>
          <a className="link link-hover">LinkedIn</a>
        </nav>
      </nav>
    </footer>
  );
};

export default Footer;
