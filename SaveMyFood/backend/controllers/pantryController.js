const PantryItem = require('../models/pantryItem');

const getPantry = async (req,res,next) => {
  try {
    const items = await PantryItem.find({userId:req.user.id});
    if(items.length>0){
      return res.status(200).json({message:`Hi ${req.user.name}, here’s what’s currently in your pantry:`,success:true,items});
    }else{
      return res.status(200).json({message:`There are no items in your pantry ${req.user.name}`,success:true,items:[]});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Bad Request"});
  }
}

const postPantry = async (req,res,next) => {
  try {
    const {name,quantity,expiryDate,category} = req.body;
    const pantryItem = new PantryItem({name,quantity,expiryDate,category,userId:req.user.id});
    await pantryItem.save();
    return res.status(201).json({message:"Pantry item added Successfully",success:true,item:{
        _id:pantryItem._id,
        name:pantryItem.name,
        quantity:pantryItem.quantity,
        expiryDate:pantryItem.expiryDate,
        category:pantryItem.category,
        userId:req.user.id
    }});

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Pantry item not added, please try again",
      success: false
    });
  }
}

const deletePantryItem = async (req,res,next) => {
  try {
    const id = req.params.id;
    const deletedItem = await PantryItem.findOneAndDelete({
        _id:id,
        userId:req.user.id
    });

    if(deletedItem){
      return res.status(200).json({message:'Item deleted from Pantry',success:true});
    }else{
      return res.status(404).json({message:'Item not found',success:false});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Bad Request"});
  }
  
}

const updatePantryItem = async (req,res,next) => {
  try {
    const id = req.params.id;
    const {name,quantity,expiryDate,category} = req.body;
    const updatedItem = await PantryItem.findOneAndUpdate({
      _id:id,
      userId:req.user.id
    },{
      name,quantity,expiryDate,category
    },{ new: true });

    if(updatedItem){
      return res.status(200).json({message:'Item Updated Successfully',success:true,item:updatedItem});
    }else{
      return res.status(404).json({message:'Item not found',success:false});
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Bad Request"});
  }
}


module.exports = {
  getPantry,
  postPantry,
  deletePantryItem,
  updatePantryItem
}