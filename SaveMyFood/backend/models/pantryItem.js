const mongoose = require('mongoose');

const pantryItemSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  name:{
    type:String,
    required:true,
  },
  quantity:{
    type:Number,
    required:true,
    default:1,
  },
  expiryDate:{
    type:Date,
    required:true,
  },
  category: { 
  type: String, 
  enum: [
    // 🇮🇳 Indian-specific categories
    "Dal & Pulses",      // Toor Dal, Moong Dal, Masoor Dal
    "Rice & Flours",     // Basmati, Wheat Flour, Ragi
    "Spices & Masalas",  // Garam Masala, Turmeric, Red Chili Powder
    "Pickles & Chutneys",// Mango Pickle, Coconut Chutney
    "Papad & Fryums",    // Lijjat Papad, Fryums
    "Instant Mixes",     // Dosa Mix, Upma Mix
    "Snacks (Indian)",   // Samosa, Namkeen, Bhujia
    "Sweets (Indian)",   // Gulab Jamun, Rasgulla, Laddu
    "Oils & Ghee",
    "Curry",       // Mustard Oil, Groundnut Oil, Desi Ghee

    // 🌍 Existing Global Categories
    "Dairy",             // Milk, Cheese, Yogurt, Butter
    "Vegetables",        // Carrots, Spinach, Broccoli
    "Fruits",            // Apples, Bananas, Berries
    "Meat",              // Beef, Lamb
    "Poultry",           // Chicken, Turkey
    "Seafood",           // Fish, Shrimp
    "Eggs",              // Eggs
    "Bakery",            // Bread, Cakes, Pastries
    "Snacks",            // Chips, Biscuits
    "Beverages",         // Juices, Tea, Coffee
    "Frozen",            // Frozen Veggies, Ice Cream
    "Canned",            // Canned Beans, Tuna
    "Grains",            // Rice, Quinoa
    "Pasta",             // Noodles, Spaghetti
    "Spices",            // Salt, Pepper, Masala
    "Condiments",        // Ketchup, Mustard, Soy Sauce
    "Nuts & Seeds",      // Almonds, Sunflower Seeds
    "Sweets & Desserts", // Chocolate, Candy
    "Other"              // Anything uncategorized
  ]
  , 
  default: "Other" 
  },
  lastNotificationDate: {
  type: Date,
  default: null
}

},{
  timestamps:true,
});

module.exports = mongoose.models.PantryItem || mongoose.model("PantryItem", pantryItemSchema);