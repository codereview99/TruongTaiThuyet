
import UserSevices from "../services/userservices"


let handleLogin= async(req,res)=>{
    let email=req.body.email
    let password= req.body.password
    if(!email || !password){
        console.log("ko hoạt động");
        return res.status(500).json({
            errCode:1,
            errMessage:"Missing inputs parameter!"
        })
    }else{
        let userData= await UserSevices.handleUserLogin(email,password)
    //check email exist
    //compare password
    //return userInfo
    //access_token:json web token

        return res.status(200).json({
        errCode:userData.errCode,
        errMessage:userData.errMessage,
        user: userData.user ? userData.user:{}
    })  
    }  
}

let handleGetAllUser=async(req,res)=>{
    let id=req.query.id;

    if(!id){
        return res.status(200).json({
            errCode:1,
            errerrMessage:"Missing required parameters",
            users:[]
        })
    }

    let users= await UserSevices.handleGetAllUser(id);
    console.log(users)
    return res.status(200).json({
        errCode:0,
        errerrMessage:"OK",
        users
    })
}
let handleCreateNewUser=async(req,res)=>{
    let errMessage= await UserSevices.createNewUser(req.body)
    return res.status(200).json(errMessage)
}
let handleEditUser=async(req,res)=>{
    let data=req.body
    let errMessage= await UserSevices.updateUserData(data)
    return res.status(200).json(errMessage)
}

let handleDeleteUser=async(req,res)=>{

    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            errMessage:"id không tồn tại!"
        })
    }

    let errMessage= await UserSevices.DeleteUser(req.body.id)
    return res.status(200).json(errMessage)
}

let getAllCode= async(req,res)=>{
    try{
        let data = await UserSevices.getAllCodeSevices(req.query.type);
        return res.status(200).json(data);
    }catch(e){
        console.log("Get all code error:", e)
        return res.status(200).json({
            errCode:-1,
            errMessage:"Error from sever"
        })
    }
} 

module.exports={
    handleLogin:handleLogin,
    handleGetAllUser:handleGetAllUser,
    handleCreateNewUser:handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode:getAllCode
} 