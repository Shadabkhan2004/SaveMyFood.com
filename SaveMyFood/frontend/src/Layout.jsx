import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { handleSuccess } from "./toast";

export default function Layout({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        {/* HEADER / NAVBAR */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto flex items-center justify-between p-4">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-green-600">
              SaveMyFood<span className="text-orange-500">.com</span>
            </h1>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
              <Link to="/" className="hover:text-green-600 transition">
                Home
              </Link>
              <Link to="/pantry" className="hover:text-green-600 transition">
                Pantry
              </Link>
              <Link to="/about" className="hover:text-green-600 transition">
                About
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                  onClick={() => {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    handleSuccess("Logged out successfully");
                  }}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-green-600 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="md:hidden flex flex-col items-center bg-white border-t border-gray-200 py-4 space-y-4 shadow-lg">
              <Link to="/" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              <Link to="/pantry" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                Pantry
              </Link>
              <Link to="/about" className="hover:text-green-600" onClick={() => setMenuOpen(false)}>
                About
              </Link>

              {isLoggedIn ? (
                <Link
                  to="/"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                  onClick={() => {
                    localStorage.clear();
                    setIsLoggedIn(false);
                    handleSuccess("Logged out successfully");
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 container mx-auto px-6 py-12">
          <Outlet />
        </main>

        {/* FOOTER */}
        <footer className="bg-green-700 text-white mt-10 py-8">
          <div className="container mx-auto text-center space-y-2">
            <p className="text-lg font-semibold">
              “Every meal saved is a step toward a better planet.”
            </p>
            <p className="text-sm text-green-200">
              © {new Date().getFullYear()} SaveMyFood.com · Built to reduce food waste
            </p>
          </div>
        </footer>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </>
  );
}
