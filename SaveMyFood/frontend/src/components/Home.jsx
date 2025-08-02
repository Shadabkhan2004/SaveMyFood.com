import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export default function Home() {
  return (
    <>
    <div className="flex flex-col items-center justify-center text-center py-20">
      
      {/* HERO SECTION */}
      <h1 className="text-4xl md:text-6xl font-bold text-green-700 leading-tight max-w-2xl">
        Track Your Pantry. <br />
        <span className="text-orange-500">Save Food. Save Money.</span>
      </h1>

      <p className="text-gray-600 mt-6 text-lg max-w-xl">
        Stop wasting food by keeping track of expiry dates in one place.  
        Plan meals, save money, and make your kitchen smarter.
      </p>

      {/* CTA Buttons */}
      <div className="mt-8 flex space-x-4">
        <Link
          to="/signup"
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
        >
          Get Started
        </Link>
        <Link
          to="/pantry"
          className="bg-white border-2 border-green-500 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition"
        >
          View Pantry
        </Link>
      </div>

      {/* ILLUSTRATION */}
      <div className="mt-16">
        <img
          src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
          alt="Save Food Illustration"
          className="w-80 md:w-96 drop-shadow-xl"
        />
      </div>

      {/* FEATURE SECTION */}
      <section className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
        
        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-green-600 font-semibold text-xl mb-3">
            Track Expiry Dates
          </h3>
          <p className="text-gray-600">
            Easily see which items are expiring soon so you can use them before they go to waste.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-green-600 font-semibold text-xl mb-3">
            Save Money & Food
          </h3>
          <p className="text-gray-600">
            Reduce waste and save money by planning meals around items you already have.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-green-600 font-semibold text-xl mb-3">
            Simple & Accessible
          </h3>
          <p className="text-gray-600">
            Your pantry in your pocket. Access it anywhere and keep your kitchen organized.
          </p>
        </div>

      </section>
    </div>
    </>
  );
}
