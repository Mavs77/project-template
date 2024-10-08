require('dotenv').config();  //loads environment variables from a .env file

const express = require('express') //imports the express library, which is a web framework for node js. Express helps simplify building web servers and handling http requests / responses
const app = express() //initializes an instances of express. You'll use it to define routes, middleware, and handlers. 
const mongoose = require('mongoose') //imports mongoose library. Use to interact with MongoDB database in an easy and structured way. 
const cors = require('cors')
const Item = require('./models/item')


// connectDB()
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.nb0y2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err))

// require('./config/passport')(passport)


//Middleware 

//enable CORS. Allows your server to accept requests from different websites or apps. 
app.use(cors())

// use EJS for views 
app.set('view engine', 'ejs')

//static folder. Telling the server where our static files will be stored. 
app.use(express.static('public'))

//body parsing. Used to handle incoming requests and parse their data. When users submit forms, you need to be able to read and handle the form data in the request body. 
app.use(express.urlencoded({ extended: true }))

//allows your app to parse JSON-formatted data from incoming requests (e.g., when receiving JSON from a frontend or API)
app.use(express.json()) 

//route handler for root path ('/'). When user visits the homepage ('/'), this route will be triggered.  
app.get('/', (req, res) => {
    try{
        res.render('index')
    }
    catch (err) {
        console.log('Error:', err)
    }
})

//Route handler. Defines a GET route that retrieves items from the database and renders them on the page
app.get('/item', async (req, res) => {
    try {
        const items = await Item.find({}) //Mongoose query method used to retrieve documents (entries) from the MongoDB database. The empty object {} means find all documents in the Item collection
    res.render('item', {items})//used to render a template (like EJS). Takes two arguments, (1) name of the template and (2) an object that contains data to be passed to the template, in this case, {items} is the data being passed, where items contains the array of items retrieved from the database.
    }
    catch (err) {
        console.log('Error:', err)
    }     
})



//Create. When the form in your front-end submits data, this route is triggered. 
app.post('/item', async (req, res) => {
    const newItem = new Item(req.body) //this line creates a new instance of the Item model using the data sent by the client. Creates new document to be stored in MongoDB 
    try{
        await newItem.save() //saves the newly created Item to the MongoDB database
        res.redirect('/item'); 
    }
    catch (err) {
        res.redirect('/item?error=true')
    }
 })
 

 //Update
app.post('/item/update/:id', async (req, res) => {
    console.log(req)
    const {id} = req.params; //extracting the parameter (id) from the request URL
    const {name, description} = req.body
    try{
        await Item.findByIdAndUpdate(id, {name, description})
        res.redirect('/item')
    }
    catch (err) {
        res.redirect('/item?error=true')
    }
 })

 //Delete

 app.delete('/item/delete/:id', async (req, res) => {
    const {id} = req.params
    try{
        await Item.findByIdAndDelete(id)
        res.status(200).json({message: 'Item deleted successfully'})
    }
    catch (err) {
        res.redirect('/item?error=true')
    }
 })

//This sets the port your server will listen on. It first tries to get the port from the environment variables (process.env.PORT), and if it's not defined, it defaults to 2900 followed by a console message. 
app.listen(process.env.PORT || 2900, ()=>{
    console.log(`Server is running on: http://localhost:${process.env.PORT}!`)
})

