import bcrypt from 'bcryptjs'
import db from "../models"
import { raw } from 'body-parser';
const salt = bcrypt.genSaltSync(10);

let createNewUser=async(data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let hashUserPasswordFromBcryptjs=  await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashUserPasswordFromBcryptjs,
                firstName: data.firstName,
                lastName:  data.lastName,
                address:  data.address,
                gender: data.gender==="1" ? true: false,
                phonenumber:  data.phonenumber,
                roleId:  data.roleId
            })
            resolve()
        }catch(e){
            reject(e)
        }
    })
   
}

let hashUserPassword=(password)=>{
    return new Promise(async(resolve,reject)=>{
        
        try{
            let hashUserPassword =await bcrypt.hashSync(password, salt);
            resolve(hashUserPassword)
        }catch(e){
            reject(e)
        }
    })
}

let getAllUser=()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let users= db.User.findAll()
            raw:true
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let getUserInfoById=(userId)=>{
    return new Promise( async(resolve,reject)=>{
        try{
            let user= await db.User.findOne({
                where: {id: userId},
                raw: true
            })
            if(user){
                resolve(user)
            }else{
                resolve([])
            }
        }catch(e){
            reject(e)
        }
    })
}

let updateUserData=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user = await db.User.findOne({
                where: { id: data.id}
            })
            if(user){
                user.firstName=data.firstName
                user.lastName=data.lastName
                user.address=data.address

                await user.save()

                let allUsers= await db.User.findAll()
                resolve(allUsers)
            }else{
                resolve()
            }
        }catch(e){
            console.log(e)
        }
    })
}
let deleteUserById=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user=await db.User.findOne({
                where: {id : userId}
            })
            if(user){
                await user.destroy()
            }
            resolve()
        }catch(e){
            reject(e)
        }
    })
}

module.exports={
    createNewUser:createNewUser,
    getAllUser: getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserById:deleteUserById,
}