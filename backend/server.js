const express = require("express");
const cors = require("cors");
const dotnev = require("dotenv").config();
const cookieSession = require("cookie-session");
const dbConfig = require("./config/db.config");
const app = express();

const PORT = process.env.PORT || 8080;

const fetch = (...args) => import('node-fetch').then(({default:fetch})=> fetch(...args))
const bodyParser = require('body-parser')

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"], 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(
    cookieSession({
      name: "elearn-session",
      keys: ["P!yu$#p@telc0de$-secret-key"], 
      httpOnly: true,
      sameSite: 'strict',
    })
  );
  
  const db = require("./models");
  const Role = db.role;

db.mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("\x1b[32m", "Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.send("Elearn. Backend is Up and Running... @piyushpatelcodes");
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/apply.routes")(app);


app.get("/getaccesstoken", async function (req,res){
  // console.log(req.query.code)

  const params = "?client_id=" + process.env.GITHUB_CLIENT_ID + "&client_secret=" + process.env.GITHUB_CLIENT_SECRET + "&code=" + req.query.code

  await fetch("https://github.com/login/oauth/access_token"+ params, {
    method:"POST",
    headers : {
      "Accept" : "application/json"
    }
  }).then((response)=>{
    return response.json();
  }).then((data)=>{
    // console.log(data)
    res.json(data)
  })

})

app.get("/getuserdata", async function(req,res){
  req.get("Authorization")
  await fetch("https://api.github.com/user", {
    method:"GET",
    headers : {
      "Authorization" : req.get("Authorization")
    }
  }).then((response)=>{
    return response.json();
  }).then((data)=>{
    // console.log("userdata getttttt",data)
    res.json(data)
  })
})

app.listen(PORT, function (err) {
  if (err) console.error("Error in server setup");
  console.log(
    "\x1b[36m%s\x1b[0m",
    `Server listening on Port`,
    PORT,
    ` http://localhost:${PORT}`
  );
});



async function initial() {
    try {
      const count = await Role.estimatedDocumentCount();
      
      if (count === 0) {
        await new Role({ name: "user" }).save();
        console.log("added 'user' to roles collection");
        
        await new Role({ name: "moderator" }).save();
        console.log("added 'moderator' to roles collection");
        
        await new Role({ name: "admin" }).save();
        console.log("added 'admin' to roles collection");
      }
    } catch (err) {
      console.error("Error during initial role creation", err);
    }
  }
  