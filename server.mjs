// import express web server framework
import express from 'express';
// import other router modules from .mjs files into this web application
import commentRoutes from './routes/commentRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
// import built-in JS body-parser middleware from Node.js
import bodyParser from 'body-parser';


// initialize an instance of express
const app = express();
// declare a port for application to start listening (Port 3000 is standard)
let PORT = 3000;

/* middleware -- error handling should be last */  

/* when we get a post/put request from front-end, this will be able to pull & parse it apart into usable data (ref. lecture) */
// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
// returns a middleware in which parse through URL encoded using query string module
app.use(bodyParser.urlencoded({ extended: true })); // express.urlencoded()?
// implement built-in express.json() middleware function to parse JSON HTTP request bodies into JS objects (usable data)
app.use(bodyParser.json({ extended: true }));



/* routes */
// load router modules into the app
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);



// accessing the homepage via HTTP GET request method route
// app.get() route handles GET request from root/homepage 
app.get('/', (req, res) => {
    // sends out response message to webpage
    res.send('Welcome welcome!👋');
});

app.get('/api', (req, res) => {
    // sends out response message to webpage
    res.send('Almost there ...');
});
// app.get('/albums', (req, res) => {
//     res.send('Album covers');
// });

// app.get('/artists', (req, res) => {
//     res.send('Artists corner');
// });

// GET request to any other page (catch all) ...
app.get('*', (req, res) => {
    // show a custom status 404 w/ respective message
    res.status(404).send('<h1>404</h1> <h2>Error</h2> \nUh-oh something went wrong');
});



/* app.listen() should always be the very last thing in the server -
   despite dealing w/ asynchronous JS but sequencing still matter */
app.listen(PORT,() => {
    // prints output in CLI --- check for functioning server
    console.log(`Server is running on http:localhost.com/${PORT}`);
});