// import express web server framework
import express from 'express'

// initialize an instance of express
const app = express();
// declare a port for application to start listening (Port 3000 is standard)
let PORT = 3000;

// accessing the homepage via HTTP GET request method route
// app.get() route handles GET request from root/homepage 
app.get('/', (req, res) => {
    // sends out response message to webpage
    res.send('Welcome welcome!👋');
});

// Express listen method for where the server will be listening to 
// app.listen() always towards the end in app file (sequencing matters)
app.listen(PORT,() => {
    // prints output in CLI --- check for functioning server
    console.log(`Server is running on http:localhost.com/${PORT}`);
});