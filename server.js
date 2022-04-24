const express = require('express')
const connectDB = require("./config/db")
const path = require('path')

const app = express()

//connect db
connectDB()

//init middleware => get data in req.body
app.use(express.json({ extended: false }))

//send data to browser
// app.get('/', (req, res) => res.send('API Running'))

//define routes (make "/api/users pertain to the "/" in users.js )
//把 /api/users 派发给users route 的 ‘/’
app.use("/api/users", require("./routes/api/users"))
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

//Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
  })
}

//look for PORT variable in environment when deployed on Heroku || local port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}`))