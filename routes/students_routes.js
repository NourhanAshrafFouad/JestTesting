const express= require('express');
const router= express.Router()
const StudentModel= require('../models/students_model')
router.route('')
.get(async (req, res)=>{
    const result= await StudentModel.find()
    if(result.length>0){
        res.send(result)

    }
    else{
        res.status(404).send('No Students in the database')
    }
 })
.post(async(req, res)=>{
    const result= await StudentModel(req.body).save()
    res.send(result)
})

router.route('/:id')
.get(async (req, res)=>{
    const result= await StudentModel.find({"id": req.params.id})
    if(result.length ==0){
        res.status(404).send('No Student with this ID')
    }
    else{
        res.send(result)
    }
 })
.put(async(req, res)=>{
    const result= await StudentModel.findOneAndUpdate({"id": req.params.id},
    req.body, {new:true})
    res.send(result)
})
.delete(async(req, res)=>{
     const result= await StudentModel.findOneAndRemove({"id": req.params.id})
     //console.log(result)
     if(result != null){
        res.send(result)
     }
     else{
        res.send("No Student with this ID")
     }

 })


 module.exports= router