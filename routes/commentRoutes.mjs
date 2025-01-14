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
        // next(error(500, "Need your userId, rating, and opinion"));
        next();
    }
});

/* GET route with query parameter at end '?limit=1' */
// @route:  GET api/comments/search
// @desc:   Return number of comments given by query parameter
// @access: Public
router.get('/search', (req, res, next) => {
    
    // declare a local empty array for comments to be appended to
    const comments_array = [];

    // declare const variable limit to cache req.query.limit retrieved from HTTP GET request
    /* Aside: req.query are automatically parsed by Node Express when an HTTP GET request is made*/
    const limit = req.query.limit;

    // initialize an iterator 
    let itr = 0;
    // iterate through the given "comments" data set
    while(itr < limit){
        // append comment to an array
        comments_array.push(comments[itr]);
        // increment by 1 to keep cycle moving
        itr++;
    }
    // output the array of comments as JSON string to browser
    res.json(comments_array);

});

/* GET route takes in route parameter :id (inserted dynamic data) from path URL, caches and manipulate it */
// @route:  GET api/comments/:id
// @desc:   Retrieve a comment
// @access: Public
router.get('/:id', (req, res, next) => {

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
    // console.log("get patch, delete");
    /* Aside: Array Destructuring not needed here for "elem" in anonymous function since 
    "comments" array was already destructured once during import? */
    
    // employ JS array method .find() to search container for 1st instance of mentioned property
    let comment = comments.find((elem) => 
        // if the :id were to be found in the database, initialize obj to variable comment
        elem.id == req.params.id); // loose comparison so data type do NOT have to match in URL (1 vs "1" in JS)
    /* Question: Unsure why {} for above arrow function would interfere with status code */

    // use Object.keys() method to return an array of object's properties in conjunction ...
    // if the array is not empty => comment object was not empty ...
    if(Object.keys(comments).length > 0){
        // res.json() function sends JSON string response to browser
        res.json({ comment, options });
    }
    // otherwise if the comment object is empty ...
    else{
        // goes to next middleware function (if there's any) or pass control to next route
        // next('route');
        next();
    }
});

// @route:  PATCH api/comments/:id
// @desc:   Updates a comment
// @access: Public
router.patch('/:id', (req, res, next) => {
    // look through the comments array ...
    const comment = comments.find((elem, index) => {
        // if value of :id in req.params is detected on the database ...
        if(elem.id == req.params.id){
            // loops through the keys in req.body (data retrieved from body-parsing middleware) for specific :id
            for(let key in req.body){
                // change the comment
                comments[index][key] = req.body[key];
            }
            // adjust status code to okay
            return true;
        }
    });
    /* practice D.R.Y. : this is the same to if(Object.keys(comment) ...) but much more succinct */
    // if "comment" exists
    if(comment){
        // sends out JSON string to browser
        res.json(comment);
    }
    // otherwise 
    else{
        // move to next middleware function or move to next route
        next();
    }
});    

// @route:  DELETE api/comments/:id
// @desc:   Remove a comment
// @access: Public
router.delete('/:id', (req, res, next) => {
    // utilize array.find() method to find 1st instance of ...
    const comment = comments.find((elem, index) => {
        // if :id in request params matches an id on the database ...
        if(elem.id == req.params.id){
            // removes the comment object from any index the array
            comments.splice(index, 1);  //.pop() would only from end, .shift() only from start
            // adjust status code to okay
            return true;
        }
    });
    // even D.R.Y.er?!! -- sends out JSON string to browser
    if(comment){ res.json(comment); }
    // otherwise move to next middleware function or move to next route
    else{ next(); }
});  

// @route:  GET api/comments/user/:userId
// @desc:   Gather up all of the user's comments
// @access: Public
router.get('/user(s)?/:userId', (req, res, next) => {
    // declare an empty array for later use
    const empty_array = [];
    let route_params = req.params;
    // let userId = comments[itr].itr
    // iterate through the array of comments
    let itr = 0;
    while(itr < comments.length){
        // if the userId in the database matches up with the requested userId
        if(comments[itr].userId == route_params.userId){
            // append their comment to the the empty_array
            empty_array.push(comments[itr]);
        }
        // increment by 1 to continue cycling through
        itr++;
    }
    // user_info(route_params, comments, userId, id);
    // if the array is populated ...
    if(empty_array.length != 0){
        // essentially console out JSON string to browser of the empty
        res.json(empty_array);
    }
    // if the array remained empty ...
    else{
        // res.send("No posts from this user");
        /* "Like a 'finally' ... next() always run" (ref. Mykee) */
        // next(res.send("No comments from this user")); 
        /* above res.send() will override & print out text to browser */
        
        // next();
        /* below's next() is required to continue otherwise "processing" forever on Thunder-Client testing
         --- text with will be console.log() to terminal 
         --- DN interfere w/ custom_error middleware function being called back in server.mjs yielding 
            1) a JSON string out to browser, 2) custom status in Thunder-Client/Postman */
        
        // res.status(700).json({error: "Comments not found"});
        next("No COMMENTS from this user");
    }
});

// export out the router into server.mjs for further use
export default router;