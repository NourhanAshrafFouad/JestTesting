require('dotenv').config()

const {app}= require('./app')
const mongoose= require('mongoose')

mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
.then(console.log('Successfully Connected to The Database'))

app.listen(process.env.PORT)



















