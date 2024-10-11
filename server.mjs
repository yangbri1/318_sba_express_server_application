// import express web server framework
import express from 'express';
// import other modules from other .mjs files for later use
import commentRoutes from './routes/commentRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
// import built-in JS body-parser from Node.js
import bodyParse from 'body-parser';


// initialize an instance of express
const app = express();
// declare a port for application to start listening (Port 3000 is standard)
let PORT = 3000;

/* middleware -- error handling should be last */  


/* routes */


// accessing the homepage via HTTP GET request method route
// app.get() route handles GET request from root/homepage 
app.get('/', (req, res) => {
    // sends out response message to webpage
    res.send('Welcome welcome!👋');
});

app.get('/albums', (req, res) => {
    res.send('Album covers');
});

app.get('/artists', (req, res) => {
    res.send('Artists corner');
});

// GET request to any other page (catch all) ...
app.get('*', (req, res) => {
    // indicate nothing there to see
    res.send('<h1>404</h1> <h2>Error</h2> \nUh-oh something went wrong');
});

app.route('/api/artists')
    .get((req, res) => {
        res.send("Retrieve artist");
    })
    .post((req, res) => {
        res.send("Create artist");
    })
    .put((req, res) => {
        res.send(("Update artist"));
    })
    .delete((req, res) => {
        res.send(("Delete artist"));
    });

/* app.listen() should always be the very last thing in the server -
   despite dealing w/ asynchronous JS but sequencing still matter */
app.listen(PORT,() => {
    // prints output in CLI --- check for functioning server
    console.log(`Server is running on http:localhost.com/${PORT}`);
});