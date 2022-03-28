const User=require("../models/user.model")
const jwt=require("jsonwebtoken")


const gentoken=(user)=>{
    return jwt.sign({user},"noorish")
}

const register=async(req,res)=>{
      try {
          
         let user=await User.findOne({email:req.body.email}).lean().exec()

         if(user){
             return res.status(401).send("already registered")
         }
         else{
             const token=gentoken(user)
             user=await User.create({
                 firstName:req.body.firstName,
                 lastname:req.body.lastName,
                 email:req.body.email,
                 password:req.body.password
             })
             return res.status(201).send({user,token})
         }
     


      } catch (error) {

        return res.status(401).send(error)
          
      }
}



const login=async(req,res)=>{
    try {
        
       let user=await User.findOne({email:req.body.email}).lean().exec()

       if(!user){
           return res.status(401).send("wrong credential")
       }
       const match=User.checkpassword(req.body.password)
       if(!match){
        return res.status(401).send("wrong credential")
       }
       else{
           const token=gentoken(user)
           return res.status(201).send({user,token})
       }



    } catch (error) {

      return res.status(401).send(error)
        
    }
}

module.exports={register,login}