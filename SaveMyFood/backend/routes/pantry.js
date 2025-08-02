const { getPantry, postPantry,deletePantryItem,updatePantryItem} = require('../controllers/pantryController');
const { postPantryMiddleware } = require('../middlewares/pantryMiddleware');

const router = require('express').Router();


router.post("/",postPantryMiddleware,postPantry)
router.get("/",getPantry);
router.delete("/:id",deletePantryItem);
router.put("/:id",postPantryMiddleware,updatePantryItem);

module.exports = router