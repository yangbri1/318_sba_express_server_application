// importing web application framework Express.js (built off of runetime env Node.js)
import express from 'express';
// importing relevant JavaScript module and array destructuring it for later use
import { comments } from '../data/comments.mjs';

// use express.Router() class to create modular & mountable route handlers
// Aside: replace "app" prefix (in server.mjs) to "router" (here) 
let router = express.Router();

/* Notice: Every Express routes follow a similar structure: 
    instance.method(path URL on server, handler function exe on route) */

// @route:  GET api/comments
// @desc:   Reads all comments
// @access: Public
router.get('/', (req, res) => {

    // imitates accessing the database 
    const options = [
        {
            // cache dynamic "id" request by user
            href: 'comments/:id',
            rel: ':id',
            method: 'GET',
        },
    ];
    // besides res.send() which sends a String text 
    /* res.json() converts given parameters into JSON string format & send to client */ 
    /* Aside: .json() normally used when dealing w/ data in API creation  (ref. lecture) */
    res.json({ comments, options });
});

/* Note:  Handler arrow callback function takes in next() object as a parameter because
    here it is a middleware function */

// @route   POST api/comments
// @desc:   Creates a comment
// @access: Public
router.post('/', (req, res, next) => {
    
    /* Aside: Express' req.body property provides access to parsed request body from bodyParser in server.mjs*/
    // checks the parsed data for userId, rating, opinion (properties in comments.mjs)
    if(req.body.userId && req.body.rating && req.body.opinion){
        // if given user data proves to be sufficient ...
        // create a new comment object with parsed out JSON data & attach new id number to it
        const comment = {
            id: comments[comments.length - 1].id + 1,
            userId: req.body.userId,
            rating: req.body.rating,
            opinion: req.body.opinion,
        };
        // since comments are an array of objects, we can use Array.push() method to append new comment to end
        comments.push(comment);
        // converts newly created comment object into JSON string format -- for uniformity
        res.json(comments[comments.length - 1]);
    }

    // if the supplied data is inadequate ...
    else{
        // show status custom status "500" with custom error message
        next(error(500, "Need your userId, rating, and opinion"));
    }
});

/* GET route takes in route parameter :id (inserted dynamic data) from path URL, caches and manipulate it */
// @route: GET api/comments/:id
// @desc   Retrieve a comment
// @access: Public
router.get('/', (req, res, next) => {

    // accessing the database, declare variable "options" to be const since there will NOT be any redeclaration in this scope
    const options = [
        {
            // location property get or set the path URL to api/comments/:id
            href: `/${req.params.id}`,
            // link rel attribute connect linked document to current "sub-API" document  
            rel: ``,
            // type of route -- similar to "put", updates the database
            method: `PATCH`,
        },
        {
            // apply string interpolation to req.params (where dyanmic values of database are cached)
            href: `/${req.params.id}`,
            rel: ``,
            // delete object from database
            method: `DELETE`,
        }
    ];
    console.log("get patch, delete");
    /* Aside: Array Destructuring not needed here for "elem" in anonymous function since 
    "comments" array was already destructured once during import? */
    
    // employ JS array method .find() to search container for 1st instance of mentioned property
    let comment = comments.find(function(elem){
        // if the :id were to be found in the database, initialize obj to variable comment
        if(elem.id == req.params.id); // loose comparison so data type do NOT have to match in URL (1 vs "1" in JS)
    });

    // use Object.keys() method to return an array of object's properties in conjunction ...
    // if the array is not empty => comment object was not empty ...
    if(Object.keys(comment).length !== 0){
        // res.json() function sends JSON string response to browser
        res.json({ comments, options });
    }

    // otherwise if the comment object is empty ...
    else{
        // goes to next middleware function (if there's any) or pass control to next route
        // next('route');
        next();
    }
});
// route handlers chainable example
// app.route('/api/artists')
//     .get((req, res) => {
//         res.send("Retrieve artist");
//     })
//     .post((req, res) => {
//         res.send("Create artist");
//     })
//     .put((req, res) => {
//         res.send(("Update artist"));
//     })
//     .delete((req, res) => {
//         res.send(("Delete artist"));
//     });

router.put('/', (req, res) => {
    res.send('comment put route');
});

router.delete('/', (req, res) => {
    res.send('comment delete route');
});

router.get('/', (req, res) => {
    res.send('comment get route');
});


export default router;