export default function About() {
  return (
    <div className="max-w-5xl mx-auto text-center">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold text-green-700 mb-6">
        About SaveMyFood<span className="text-orange-500">.com</span>
      </h1>
      
      {/* SUBTITLE */}
      <p className="text-lg text-gray-600 mb-12">
        Every year, billions of meals are thrown away while millions of people go hungry.  
        Our mission is to help you save food, save money, and protect the planet.
      </p>

      {/* GLOBAL STATS SECTION */}
      <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-3xl font-bold text-green-600">1.3B</h2>
          <p className="text-gray-600 mt-2 text-sm">Tons of food wasted annually worldwide</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-3xl font-bold text-orange-500">40%</h2>
          <p className="text-gray-600 mt-2 text-sm">Of food waste happens in households</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-3xl font-bold text-green-600">$1,500</h2>
          <p className="text-gray-600 mt-2 text-sm">Average yearly food waste per family</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
          <h2 className="text-3xl font-bold text-orange-500">8-10%</h2>
          <p className="text-gray-600 mt-2 text-sm">Of global emissions come from wasted food</p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="grid md:grid-cols-3 gap-8 text-left mb-16">
        
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-green-600 font-semibold text-xl mb-3">
            🌱 Our Mission
          </h3>
          <p className="text-gray-600">
            SaveMyFood was built to inspire a world where no food goes to waste. 
            By keeping track of your pantry, you save money, food, and the environment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-green-600 font-semibold text-xl mb-3">
            🥗 How It Works
          </h3>
          <p className="text-gray-600">
            Add your groceries, set their expiry dates, and get reminders before
            they expire. Make smart meal plans and reduce your food footprint.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
          <h3 className="text-green-600 font-semibold text-xl mb-3">
            🌎 Our Impact
          </h3>
          <p className="text-gray-600">
            Every item you save contributes to reducing global food waste and 
            greenhouse gas emissions, making the planet greener and cleaner.
          </p>
        </div>

      </section>

      {/* CALL TO ACTION */}
      <div className="mt-16">
        <p className="text-lg text-gray-600 mb-4">
          Join thousands of people taking action to save food and money today.
        </p>
        <a
          href="/signup"
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow hover:bg-green-600 transition"
        >
          Start Saving Food
        </a>
      </div>

    </div>
  );
}
