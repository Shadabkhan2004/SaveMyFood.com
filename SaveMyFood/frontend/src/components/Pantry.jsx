import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../toast";
import {
  pantryPostService,
  pantryGetService,
  pantryDeleteService,
  pantryPutService,
} from "../services/service";

function Pantry() {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    category: "",
  });

  const [userItems, setUserItems] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [
    "Dal & Pulses",
    "Rice & Flours",
    "Spices & Masalas",
    "Pickles & Chutneys",
    "Papad & Fryums",
    "Instant Mixes",
    "Snacks (Indian)",
    "Sweets (Indian)",
    "Oils & Ghee",
    "Curry",
    "Dairy",
    "Vegetables",
    "Fruits",
    "Meat",
    "Poultry",
    "Seafood",
    "Eggs",
    "Bakery",
    "Snacks",
    "Beverages",
    "Frozen",
    "Canned",
    "Grains",
    "Pasta",
    "Spices",
    "Condiments",
    "Oils & Fats",
    "Nuts & Seeds",
    "Sweets & Desserts",
    "Other",
  ];

  useEffect(() => {
    pantryGetService()
      .then((res) => {
        const { message, success, items } = res;
        if (!success) {
          handleError(message);
        } else {
          setUserItems(items);
        }
      })
      .catch((err) => console.log(err));
  }, [refresh]);

  const getRemainingDays = (expiryDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    const result = await pantryPutService(
      editItem,
      formData.name,
      formData.quantity,
      formData.expiryDate,
      formData.category
    );
    const { message, success, error } = result;
    if (error) {
      handleError(message);
    } else if (success) {
      handleSuccess(message);
      setRefresh((prev) => !prev);
      setEditingMode(false);
      setEditItem(null);
      setFormData({ name: "", quantity: "", expiryDate: "", category: "" });
    } else {
      handleError(message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.quantity &&
      formData.expiryDate &&
      formData.category
    ) {
      const result = await pantryPostService(
        formData.name,
        formData.quantity,
        formData.expiryDate,
        formData.category
      );

      const { message, error, success } = result;

      if (error) {
        handleError(error);
      } else if (success) {
        handleSuccess(message);
        setFormData({ name: "", quantity: "", expiryDate: "", category: "" });
        setRefresh((prev) => !prev);
      } else {
        handleError(message);
      }
    } else {
      handleError("Please fill all the details");
    }
  };

  const handleDelete = async (id) => {
    const result = await pantryDeleteService(id);
    const { success, message } = result;
    if (!success) {
      handleError(message);
    } else {
      handleSuccess(message);
      setRefresh((prev) => !prev);
    }
  };

  // --- Search & Filter ---
  const filteredItems = userItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory
      ? item.category === filterCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // --- Group & Sort ---
  const expiredItems = filteredItems
    .filter((item) => getRemainingDays(item.expiryDate) <= 0)
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  const expiringSoonItems = filteredItems
    .filter((item) => {
      const days = getRemainingDays(item.expiryDate);
      return days > 0 && days <= 5;
    })
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  const freshItems = filteredItems
    .filter((item) => getRemainingDays(item.expiryDate) > 5)
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate));

  // --- Item Card Component ---
  const renderItemCard = (item) => {
    const daysLeft = getRemainingDays(item.expiryDate);
    const badgeColor =
      daysLeft <= 0
        ? "bg-red-500"
        : daysLeft <= 5
        ? "bg-orange-500"
        : "bg-green-600";

    return (
      <div
        key={item._id}
        className={`shadow rounded-lg p-4 border-l-4 flex flex-col justify-between
          ${
            daysLeft <= 0
              ? "border-red-500 bg-red-100"
              : daysLeft <= 5
              ? "border-orange-500 bg-orange-100"
              : "border-green-500 bg-green-100"
          }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="font-bold text-lg">{item.name}</p>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-500 text-sm">
              Expires: {new Date(item.expiryDate).toDateString()}
            </p>
            <p className="text-green-600 text-sm font-medium">{item.category}</p>
          </div>
          <span
            className={`${badgeColor} text-white text-xs font-semibold px-2 py-1 rounded`}
          >
            {daysLeft <= 0 ? "Expired" : `${daysLeft}d left`}
          </span>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            className="flex-1 bg-yellow-400 text-white py-1 rounded hover:bg-yellow-500 transition"
            onClick={() => {
              setEditItem(item._id);
              setEditingMode(true);
              setFormData({
                name: item.name,
                quantity: item.quantity,
                expiryDate: item.expiryDate.split("T")[0],
                category: item.category,
              });
            }}
          >
            Update
          </button>
          <button
            className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {editingMode ? (
        // --- Edit Form ---
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold text-center text-yellow-600 mb-6">
            Edit Pantry Item
          </h1>

          <form
            onSubmit={handleUpdateFormSubmit}
            className="bg-white shadow-md rounded-xl p-6 mb-6 space-y-4"
          >
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Item Name</label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 focus:outline-yellow-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Quantity</label>
              <input
                type="number"
                className="border rounded-lg px-3 py-2 focus:outline-yellow-500"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Expiry Date</label>
              <input
                type="date"
                className="border rounded-lg px-3 py-2 focus:outline-yellow-500"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Category</label>
              <select
                className="border rounded-lg px-3 py-2 focus:outline-yellow-500"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Update Item
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500 transition"
                onClick={() => {
                  setEditingMode(false);
                  setEditItem(null);
                  setFormData({
                    name: "",
                    quantity: "",
                    expiryDate: "",
                    category: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        // --- Add Form + List ---
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
            Pantry Management
          </h1>

          {/* Add Form */}
          <form
            onSubmit={handleFormSubmit}
            className="bg-white shadow-md rounded-xl p-6 mb-6 space-y-4"
          >
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Item Name</label>
              <input
                type="text"
                placeholder="e.g., Basmati Rice, Milk"
                className="border rounded-lg px-3 py-2 focus:outline-green-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Quantity</label>
              <input
                type="number"
                placeholder="e.g., 1, 2, 500"
                className="border rounded-lg px-3 py-2 focus:outline-green-500"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Expiry Date</label>
              <input
                type="date"
                className="border rounded-lg px-3 py-2 focus:outline-green-500"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Category</label>
              <select
                className="border rounded-lg px-3 py-2 focus:outline-green-500"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Add to Pantry
            </button>
          </form>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              placeholder="Search items..."
              className="flex-1 border rounded-lg px-3 py-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="flex-1 border rounded-lg px-3 py-2"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterCategory("");
              }}
              className="bg-gray-400 text-white px-4 rounded hover:bg-gray-500 transition"
            >
              Clear
            </button>
          </div>

          {/* Grouped Sections */}
          {[
            { title: "Expired Items", data: expiredItems },
            { title: "Expiring Soon", data: expiringSoonItems },
            { title: "Fresh Items", data: freshItems },
          ].map(
            (section) =>
              section.data.length > 0 && (
                <div key={section.title} className="mb-8">
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {section.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.data.map(renderItemCard)}
                  </div>
                </div>
              )
          )}

          {expiredItems.length === 0 &&
            expiringSoonItems.length === 0 &&
            freshItems.length === 0 && (
              <p className="text-gray-500">No items match your search/filter.</p>
            )}
        </div>
      )}
    </>
  );
}

export default Pantry;
