import { Outlet, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess } from "./toast";
export default function Layout({isLoggedIn,setIsLoggedIn}) {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-green-100">
        {/* HEADER / NAVBAR */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto grid grid-cols-3 items-center p-4">
            {/* Left Logo */}
            <h1 className="text-2xl font-bold text-green-600">
              SaveMyFood<span className="text-orange-500">.com</span>
            </h1>

            {/* Center Nav */}
            <nav className="flex justify-center space-x-6 text-gray-700 font-medium">
              <Link to="/" className="hover:text-green-600">
                Home
              </Link>
              <Link to="/pantry" className="hover:text-green-600">
                Pantry
              </Link>
              <Link to="/about" className="hover:text-green-600">
                About
              </Link>
            </nav>

            {/* Right Button */}
            <div className="flex justify-end space-x-3">
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
            </div>
          </div>
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
              © {new Date().getFullYear()} SaveMyFood.com · Built to reduce food
              waste
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
