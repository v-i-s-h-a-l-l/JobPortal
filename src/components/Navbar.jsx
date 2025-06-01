import logo from '../assets/logo.png';
import download from '../assets/download.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-red-600 text-white hover:bg-red-700 rounded-md px-3 py-2"
      : "text-white hover:bg-red-700 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="bg-black border-b border-red-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <a className="flex flex-shrink-0 items-center mr-4" href="/index.html">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="Software Jobs"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                Software Jobs
              </span>
            </a>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={linkClass}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/jobs"
                  className={linkClass}
                >
                  Jobs
                </NavLink>
                <NavLink
                  to="/add-job"
                  className={linkClass}
                >
                  Add Job
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
