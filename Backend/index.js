const { connectDB } = require("./src/database/db");
const { app } = require("./src/app");
const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port || 5000, () => {
    console.log(
      `server running on Port ${port} url : http://localhost:${port}`
    );
  });
}).catch(()=>{
  console.log("error from index.js database conaction problem");
  
})
