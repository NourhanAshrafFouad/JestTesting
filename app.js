const express= require('express')
const StudentRoutes= require('./routes/students_routes')

const app= express()
app.use(express.json())
app.use('/students', StudentRoutes)

module.exports.app= app;
