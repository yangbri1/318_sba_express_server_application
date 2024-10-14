// import express web server framework
import express from 'express';

// import filesystem module (built-in Node module) into main app file -- used in creating a template engine
import fs from 'fs';

// import built-in JS body-parser middleware from Node.js
import bodyParser from 'body-parser';

// import morgan 3rd party middleware ("express.logger" built-in fn DN work)
import morgan from 'morgan';

// import custom middlewares, 
// Note: destructuring {} imported modules as "export default function_name" not included in respective files
import { custom_req_logger } from './utilities-middleware/custom_req_logger.mjs';
import { custom_logger } from './utilities-middleware/custom_logger.mjs';
import { custom_error } from './utilities-middleware/custom_error.mjs';

// import other router modules from .mjs files into this web application
import commentRoutes from './routes/commentRoutes.mjs';
import postRoutes from './routes/postRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';


// initialize an instance of express
const app = express();
// declare a port for application to start listening (Port 3000 is standard)
let PORT = 3000;


/* FINAL STEP IN TEMPLATE ENGINE: use Express.static middleware -- allow styling in template rendering */
// serve static files (images, CSS files, JS files) inside an Express app
app.use(express.static('./styles'));

// creating template engine (BOILERPALTE w/o replace block) -- accessing w/ extension of "who"
app.engine('who', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        // error handling if there's any error execute callback function
        if (err) return callback(err);

        // creating template, convert to string, fill in selected portions w/ inputted content (dynamic), returns value
        const rendered = content
            .toString()
            .replace('#status#', `${options.status}`)
            .replaceAll('#title#', `${options.name}`)
            .replace('#alias#', `${options.alias}`)
            .replace('#summary#', `${options.summary}`)
            .replace('#img#', `${options.img}`)
            .replace('#gif#', `${options.gif}`)

        return callback(null, rendered);

    });
});

// Express .set() method -- necessary intermediary in template engine step
app.set("views", "./views");    // specifies the file "views" to path "./views" (directory where view template exist)
app.set("view engine", "who");  // registers above newly created "view engine" /w "who" extension


/* middleware functions -- sequencing here really matters => error handling should be last */  

/* when we get a post/put request from front-end, this will be able to pull & parse it apart into usable data (ref. lecture) */
// returns a middleware in which parse through URL encoded using query string module
app.use(bodyParser.urlencoded({ extended: true })); // express.urlencoded()?
// implement built-in express.json() middleware function to parse JSON HTTP request bodies into JS objects (usable data)
app.use(bodyParser.json({ extended: true }));

// custom middleware indicating HTTP request type & whether or not connection established
app.use(custom_req_logger);

/* Morgan middleware built on top of Node.js (like Express), console.log() out HTTP requests onto terminal in the selected 
"tiny" format: : 1) HTTP Request Method, 2) Path URL, 3) Response's Content Length, 4) Response Time */
// Aside: Some people also use Winston alongside Morgan to logs into a file  -- placed before any custom error handlers
app.use(morgan('tiny'));

// custom middleware logging info & when HTTP request was made
app.use(custom_logger);

// error handling middleware using industry standard anonymous arrow function
app.use(custom_error);

/* routes */
// load router modules into the app
app.use('/api/comments', commentRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// accessing the homepage via HTTP GET request method route
// app.get() route handles GET request from root/homepage 
app.get('/', (req, res) => {
    // sends out response message to webpage
    // res.send('Welcome welcome!👋');

    // specify the options in template engine
    let options = {
        status: 'Homepage',
        name: '\tVinsmoke Sanji',
        alias: `"Black Leg" Sanji`,
        summary: 'Cook of the Straw Hat Pirates, Dreams of All Blue, Bounty of 1,032,000,000 beri (Alive Only)',
        img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/51158316-fd7e-48ca-b5fe-8542e9dfe357/dbcd4yw-8902f6f7-d3a9-4f65-a807-c1cd556eec6d.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzUxMTU4MzE2LWZkN2UtNDhjYS1iNWZlLTg1NDJlOWRmZTM1N1wvZGJjZDR5dy04OTAyZjZmNy1kM2E5LTRmNjUtYTgwNy1jMWNkNTU2ZWVjNmQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.GuK9c9C7h8Wvnfacz0xoOMl4InaqnSH_1ilwB8tyysk',
        gif: '',
    };

    /* IMPORTANT: call res.render() in EACH of app's routes so view could be rendered */
    res.render('template', options);
    
});

app.get('/api', (req, res) => {
    // sends out response message to webpage
    // res.send('Almost there ...');

    // specify the options in template engine
    let options = {
        status: 'Almost there ...',
        name: '\nTony Tony Chopper',
        alias: `"Cotton Candy Lover" Chopper`,
        summary: 'Doctor of the Straw Hat Pirates, Dreams of curing all diseases, Unofficial pet of the Straw Hats, Bounty of 50 beri',
        img: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7d562d2f-b1cf-430b-a066-7813d0891d36/ddfnvxu-b82fe601-6114-4828-bd53-edcf68d4ff68.jpg/v1/fill/w_894,h_894,q_70,strp/tony_tony_chopper_from_one_piece_by_inkartluis_ddfnvxu-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTYwIiwicGF0aCI6IlwvZlwvN2Q1NjJkMmYtYjFjZi00MzBiLWEwNjYtNzgxM2QwODkxZDM2XC9kZGZudnh1LWI4MmZlNjAxLTYxMTQtNDgyOC1iZDUzLWVkY2Y2OGQ0ZmY2OC5qcGciLCJ3aWR0aCI6Ijw9OTYwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.08mecxArLeY-yQ2VBf4EwHxhguhvwfSJ8dEXKl6pRII',
        gif: ''
    };

    /* IMPORTANT: call res.render() in EACH of app's routes so view could be rendered */
    res.render('template', options);
});

// GET request to any other page (catch all) ...
app.get('*', (req, res) => {
    // show a custom status 404 w/ respective message
    // res.status(404).send('<h1>404</h1> <h2>Error</h2> \nUh-oh something went wrong');
    // specify the options in template engine
    let options = {
        status: 'Uh-oh something went wrong',
        name: '\nCaptain Ussop',
        alias: `"神" Usopp, Sogeking`,
        summary: `Sniper of the Straw Hat Pirates, Dreams of courage, Has the "I can't-go-on-this-island-or-I'll-die-disease", Bounty of 500,000,000 beri`,
        // img: 'https://tenor.com/view/usopp-coffee-coffe-usopp-tea-usopp-tea-gif-21574255'
        img: 'https://th.bing.com/th/id/OIP.UaG2ADMUJJctq-_kPSf5sgHaEX?rs=1&pid=ImgDetMain',
        gif: ''
        // gif: 'https://tenor.com/view/usopp-one-piece-chopper-tony-tony-chopper-tony-chopper-gif-20968172'
    };
});


/* app.listen() should always be the very last thing in the server -
   despite dealing w/ asynchronous JS but sequencing still matter */
app.listen(PORT,() => {
    // prints output in CLI --- check for functioning server
    console.log(`Server is running on http:localhost.com/${PORT}`);
});