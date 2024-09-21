//Ensure this is at the top. ENsures that environment variables are loaded and available for use throughout your application. This ensures that all parts of your application have access to the necessary configuration values from the .env file.

require('dotenv').config();  

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')



// connectDB()

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nb0y2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// require('./config/passport')(passport)


//Middleware 

//enable CORS
app.use(cors())

// use EJS for views 
app.set('view engine', 'ejs')

//static folder. Telling the server where our static files will be stored. 
app.use(express.static('public'))

//body parsing. Used to handle incoming requests and parse their data
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 

 
app.listen(process.env.PORT || 2900, ()=>{
    console.log(`Server is running on: http://localhost:${process.env.PORT}!`)
})

