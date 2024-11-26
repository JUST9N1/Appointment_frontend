import { useContext, useEffect, useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import "../../App.css";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import "../../index.css";
import doctor from "../../assets/images/doctor-img01.png";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(AuthContext);

  const handleScroll = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  return (
    <header className="header flex items-center" ref={headerRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          {/* =================== logo =============== */}
          <div>
            <img src={logo} style={{ width: "150px", height: "150px" }} alt="App Logo" />
          </div>

          {/* ====================== menu ======================== */}
          <nav
            className="navigation"
            ref={menuRef}
            onClick={toggleMenu}
            role="navigation"
          >
            <ul className="menu flex items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* ========================= nav right ==================================== */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : role === "admin"
                      ? "/admin/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[35px] h-[35px] rounded-full overflow-hidden cursor-pointer">
                    <img
                      src={user.photo}
                      className="w-full h-full object-cover"
                      alt={user?.name || "User Avatar"}
                    />
                  </figure>
                </Link>
                <h2 className="text-[16px] font-[500]">{user.name}</h2>
              </div>
            ) : (
              <Link to="/login">
                <button
                  className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex 
                                items-center justify-center rounded-[50px]"
                >
                  Login
                </button>
              </Link>
            )}

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
