
import db from "../models/index"
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin=(email,password)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            let userData={}
            let isExist= await checkUserEmail(email)
            if(isExist){
                console.log("hoat dong");
                let user= await db.User.findOne({
                    attributes: ["id","email", "roleId", "password", "firstName","lastName"],
                    where :{email : email},
                    raw:true
                })
                if(user){
                    //compare password
                    let check= await bcrypt.compareSync(password,user.password)
                    if(check){
                        userData.errCode=0
                        userData.errMessage="OK!"
                        delete user.password
                        userData.user=user
                    }else{
                        userData.errCode=3
                        userData.errMessage="Wrong password"
                    }
                }else{
                    userData.errCode=2
                    userData.errMessage=`User's not found!`
                
                }
                
            }else{
                userData.errCode=1
                userData.errMessage=`Your's email isn't  exist  in your  system.Please  try other  email!`
               
            }
            
            resolve(userData)
            
        }catch(e){
            reject(e)
        }
    })
}

let compareUserPassword=()=>{
    return new Promise(async(resolve,reject)=>{
        try{

        }catch(e){
            reject(e)
        }
    })
}

let checkUserEmail=(userEmail)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let user= await db.User.findOne({
                where:{email: userEmail}
            })
            if(user){
                resolve(true)
            }else{
                resolve(false)
            }
        }catch(e){
            reject(e)
        }
    })
}

let handleGetAllUser=(userId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let users=''
            if(userId==="ALL"){
                users=await db.User.findAll({
                    attributes: {
                        exclude: ["password"],
                      },
                });
            }
            if(userId && userId!=='ALL'){
                users= await db.User.findOne({
                    where:{id :userId},
                    attributes: {
                        exclude: ["password"],
                      },
                })
            }
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}

let createNewUser=(data)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            let check= await checkUserEmail(data.email)
            if(check===true){
                resolve({
                    errCode:1,
                    errMessage:"Email đã được sử dụng, vui lòng nhập email khác!"
                })
            }else{
                let hashUserPasswordFromBcryptjs=  await hashUserPassword(data.password)
                await db.User.create({
                email: data.email,
                password: hashUserPasswordFromBcryptjs,
                firstName: data.firstName,
                lastName:  data.lastName,
                address:  data.address,
                gender: data.gender,
                phonenumber:  data.phonenumber,
                roleId:  data.roleId,
                positionId:data.positionId,
                image:data.avatar
            })
            resolve({
                errCode:0,
                errMessage:"OK"
            })
            }
            
        }catch(e){
            reject(e)
        }
    })
}

let DeleteUser=(id)=>{
    return new Promise(async(resolve,reject)=>{
        let user= await db.User.findOne({
            where: {id:id}
        })
        if(!user){
            resolve({
                errCode:2,
                errMessage:`The user isn't exist `
            })
        }
        // if(user){
        //     await user.destroy()
        // }
        await db.User.destroy({
            where: {id:id}
        })
       
        resolve({
            errCode:0,
            errMessage:'The user is deleted'
        })
    })
}

let updateUserData=(data)=>{
     return new Promise(async(resolve, reject)=>{
        try{
            if(!data.id || !data.positionId || !data.roleId || !data.gender){
                resolve({
                    errCode:2,
                    errMessage:"Hãy nhập id!"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id},
                raw:false
            })
            if(user){
                user.firstName=data.firstName
                user.lastName=data.lastName
                user.address=data.address
                user.gender=data.gender
                user.positionId= data.positionId
                user.roleId=data.roleId 
                user.phonenumber=data.phonenumber
                user.image=data.avatar
                
                await user.save()
                // await db.User.save({
                //     firstName:data.firstName,
                //     lastName:data.lastName,
                //     address:data.address
                // })

                resolve({
                    errCode:0,
                    errMessage:"Update thành công!"
                })
            }else{
                resolve({
                    errCode:1,
                    errMessage:"Update lỗi!"
                })
            }
        }catch(e){
            reject(e)
        }
     })
}

let getAllCodeSevices=(typeInput)=>{
    return new Promise(async (resolve, reject)=>{
        try{

            if(!typeInput){
                resolve({
                    errCode:1,
                    errMessage:"Missing required parameter"
                })
            }else{
                let res={}
                let all= await db.Allcode.findAll({
                    where : {type: typeInput}
                })
                res.errCode=0
                res.data=all
                resolve(res);
            }
            
        }catch(e){
            reject(e);
        }
    })
}

module.exports={
    handleUserLogin:handleUserLogin,
    handleGetAllUser:handleGetAllUser,
    createNewUser:createNewUser,
    DeleteUser:DeleteUser,
    updateUserData:updateUserData,
    getAllCodeSevices:getAllCodeSevices
}