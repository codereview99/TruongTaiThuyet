
import db from "../models"
import CRUDservices from "../services/CRUDservices";

let gethomePage= async(req,res)=>{
    try{     
        let data = await db.User.findAll();
        console.log(data)
        return res.render("homePage.ejs",{
            data: JSON.stringify(data)
        });
    }catch(e){
        console.log(e)
    }

}

let getCRUD=(req,res)=>{
    return res.render("crud.ejs")
}
let postCRUD= async(req,res)=>{
    await CRUDservices.createNewUser(req.body)
    return res.send("post crud")
}


let displayGETCRUD= async(req,res)=>{
    let data= await CRUDservices.getAllUser()
    return res.render("displayCRUD.ejs",{
        dataTable: data
    })
}

let getEditCRUD=async(req,res)=>{
    let userId= req.query.id
    if(userId){
        let userData=await CRUDservices.getUserInfoById(userId)
        //check user data not found

        return res.render("editCRUD.ejs",{
            user:userData
        })
    }else{
        return res.send("user not found")
    }
}

let putCRUD= async(req,res)=>{
        let data=req.body
        let allUsers= await CRUDservices.updateUserData(data)
        return res.render("displayCRUD.ejs",{
            dataTable: allUsers
        })
}
let deleteCRUD=async(req,res)=>{
    let id= req.query.id
    if(id){
        await CRUDservices.deleteUserById(id);
        return res.send("Delete  fond!")
    }else{
        return res.send("Delete not fond!")
    }
    
}

module.exports={
    gethomePage:gethomePage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGETCRUD:displayGETCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}