const mongoose =require("mongoose");   //
const dotenv = require("dotenv");
const app = require("./src/app.js");
const authUserRouters =require("./src/routes/authUsersRoutes.js");

//it is preparing the .env file process to be used in the file
dotenv.config();

//Registering routes before starting the server

//Route for the User Authentication during Singup/Login
app.use('/api/auth',authUserRouters);


//Connect to MongoDb
mongoose.connect(process.env.MONGO_URI)
   .then(()=>{
    console.log("MongoDB Connected");
    app.listen(process.env.PORT,()=>{
        console.log(`server running on PORT ${process.env.PORT}`);
    });

   })
   .catch(err=>("MongoDb connection Error:",err));


