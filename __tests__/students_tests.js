require('dotenv').config()
const mongoose= require('mongoose')
const studentModel= require('../models/students_model')
const request= require('supertest')
const {app}= require('../app')
mongoose.connect(process.env.DB_URL_TEST,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('Successfully Connected to The Test Database')) 

beforeEach(async ()=>{
    await studentModel.deleteMany({})
})

test('Save new student with jest without using routes', async ()=>{

    const newUser= new studentModel({
        "name": "New Student",
        "age": 12,
        "id": 2
        
    })
    await newUser.save()
    .then(async ()=>{
        expect(await studentModel.find({ "id" : 2})).toHaveLength(1); })
})

describe('Students routes with supertest', ()=>{

    test('Getting students with empty collection', async()=>{
        await request(app).get('/students')
        .expect('Content-Type', /text/)
        .expect(404)
    })
    
    test('Getting students with  collection', async()=>{
        const newStudent= new studentModel({
            "name": "New Student",
            "age" : 22,
            "id": 1
        })
        await newStudent.save()
        await request(app).get('/students')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response)=>{
            expect(response.body[0].name).toBe("New Student")
            expect(response.body[0].age).toBe(22)
            expect(response.body[0].id).toBe(1)
    
        })
    })
    
    test('Posting a new student', async()=>{
        await request(app).post('/students')
        .send({ "name": "New Student",
            "age" : 22,
            "id": 1})
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async(response)=>{
            expect(response.body.name).toBe("New Student")
            expect(response.body.age).toBe(22)
            expect(response.body.id).toBe(1)
    
            expect( await studentModel.find({id : 1})).toHaveLength(1)
    
        })
    })
    
})



