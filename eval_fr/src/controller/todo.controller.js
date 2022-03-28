const express=require("express")
const Todo=require("../models/todo.model")
const authenticate=require("../middlewares/authenticate")

const router=express.Router()

router.post("",authenticate,async(req,res)=>{

    try {
        const todo=await Todo.create(req.body)
        return res.status(201).send(todo)
        
    } catch (error) {
        return res.status(401).send(error)
    }

    })

    router.get("",async(req,res)=>{

        try {
            const todo=await Todo.find().lean().exec()
            return res.status(201).send(todo)
            
        } catch (error) {
            return res.status(401).send(error)
        }
    
        })

        router.get("/:id",authenticate,async(req,res)=>{
            
        try {
            const todo=await Todo.findById(req.params.id).lean().exec()
            return res.status(201).send(todo)
            
        } catch (error) {
            return res.status(401).send(error)
        }
    
        })

        router.patch("/:id",authenticate,async(req,res)=>{
            
            try {
                const todo=await Todo.findById(req.params.id,req.body,{new:true}).lean().exec()
                return res.status(201).send(todo)
                
            } catch (error) {
                return res.status(401).send(error)
            }
        
            })

            router.delete("/:id",authenticate,async(req,res)=>{
            
                try {
                    const todo=await Todo.findByIdAndDelete(req.params.id,req.body,{new:true}).lean().exec()
                    return res.status(201).send(todo)
                    
                } catch (error) {
                    return res.status(401).send(error)
                }
            
                })
    

module.exports=router