// const express= require('express');
// const app = express();
// const {dbconnect} = require("./config/database");
// const dotenv= require("dotenv");
// const signupRouter = require('./routes/userrouter');
// const cookieParser = require('cookie-parser');
// const cloudinary = require('./config/cloudinaryUpload');
// const fileUpload = require('express-fileupload');
// const listingRouter = require('./routes/listing.route')
// // import path from 'path';
// const path = require('path');
// // const cors = require('cors')


// dotenv.config();
// const PORT = process.env.PORT || 4000 ;
// app.listen(PORT, ()=>{
//     console.log(`app running  port ${PORT}`);
// });

// app.use(express.json());
// app.use(cookieParser());
// // app.use(cors())

// //database connection
// dbconnect();
// const __dirname = path.resolve();

// app.get("/", (req,res)=>{
//     return res.status(200).json({
//         success: true,
//         message:" hello dashboard"
//     })
// })
// ///routing use
// app.use('/api/v1',signupRouter)
// app.use('/api/v1/listing',listingRouter)

// app.use(express.static(path.join(__dirname, '/client/dist')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
//   })
  
  

const express = require('express');
const app = express();
const { dbconnect } = require("./config/database");
const dotenv = require("dotenv");
const signupRouter = require('./routes/userrouter');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

dotenv.config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());

// Database connection
dbconnect();

// Routes
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Hello dashboard"
    });
});
app.use('/api/v1', signupRouter);
app.use('/api/v1/listing', require('./routes/listing.route'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});
