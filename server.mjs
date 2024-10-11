// import express web server framework
import express from 'express'

// initialize an instance of express
const app = express();
// declare a port for application to start listening
let PORT = 3000;


// Express listen method for where the server will be listening to 
app.listen(PORT,() => {
    // prints output in CLI --- check for functioning server
    console.log(`Server is running on http:localhost.com/${PORT}`);
});