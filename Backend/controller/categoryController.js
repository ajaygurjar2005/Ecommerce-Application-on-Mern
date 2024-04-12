import CategoryModal from "../Modal/CategoryModal.js";
import slugify from "slugify";
export const createCategoryController = async (req, res) => {
  try {
    const {name} = req.body;
    if(!name){
        return res.status(200).send({msg:"name is required"})
    }
    const existingCategory = await CategoryModal.findOne({name})
    if(existingCategory){
        return res.status(200).send({
            success:false,
            msg:"Category Already Exists"
        })
    }

    const category = await new CategoryModal({name,slug:slugify(name)}).save()
    res.status(200).send({
        msg:"Categroy generated successfully",
        success:true,
        category
    })
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      err,
      msg: "Error in category",
    });
  }
};


export const updateCategoryController = async(req,res) => {
    try{
        const {name} = req.body
        const {id} = req.params
        const category = await CategoryModal.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            msg:"Category Updated successfully",
            success:true,
            category
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            msg:"Error while update category",
            success:false,
            err
        })
    }
}


export const categoryController = async(req,res) =>{
    try{
        const category = await CategoryModal.find({})
        res.status(200).send({
            success:true,
            category,
            msg:"All Categories list"
        })
    }
    catch(err){
        res.status(500).send({
            msg:"Error while geting the categories",
            err,
            success:false
        })
    }
}


export const singleCategoryController = async(req,res) => {
    try{
        
        const category = await CategoryModal.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            msg:"Get single category successfully",
            category
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            err,
            msg:"Error while getting the category"
        })
    }
}

export const deleteCategoryController = async(req,res) => {
    try{
        const {id} = req.params;
        await CategoryModal.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            msg:"deleting category successfully ",
        })
    }
    catch(err){
        res.status(500).send({
            success:false,
            err,
            msg:"Error while deleting the category"
        })
    }
}
