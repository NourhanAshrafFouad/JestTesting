const mongoose= require('mongoose')

const courseSchema= new mongoose.Schema({
    name : String

})
const studentSchema= new mongoose.Schema({
    name: {
        type: String,
        minlength:4,
        maxlength: 30
    },
    id: {
        type: Number,
        min: 1,
        required: true,
        unique: true

    },
    course : [courseSchema]
},
{
 strict:false,
 timestamps: true   
})

module.exports= mongoose.model('Studentmodel' ,studentSchema)