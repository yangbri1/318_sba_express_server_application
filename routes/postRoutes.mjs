// importing web application framework Express.js (built off of runetime env Node.js)
import express from 'express';
// importing relevant JavaScript module and array destructuring it for later use
import { posts } from '../data/posts.mjs';

// use express.Router() class to create modular & mountable route handlers
// Aside: replace "app" prefix (in server.mjs) to "router" (here) 
let router = express.Router();

/* Notice: Every Express routes follow a similar structure: 
    instance.method(path URL on server, handler function exe on route) */

// @route:  GET api/posts
// @desc:   Reads all posts
// @access: Public
router.get('/', (req, res) => {

    // imitates accessing the database 
    const options = [
        {
            // cache dynamic "id" request by user
            href: 'posts/:id',
            rel: ':id',
            method: 'GET',
        },
    ];
    // besides res.send() which sends a String text 
    /* res.json() converts given parameters into JSON string format & send to client */ 
    /* Aside: .json() normally used when dealing w/ data in API creation  (ref. lecture) */
    res.json({ posts, options });
});

/* Note:  Handler arrow callback function takes in next() object as a parameter because
    here it is a middleware function */

// @route   POST api/posts
// @desc:   Creates a post
// @access: Public
router.post('/', (req, res, next) => {
    
    /* Aside: Express' req.body property provides access to parsed request body from bodyParser in server.mjs*/
    // checks the parsed data for userId, title, content (properties in posts.mjs)
    if(req.body.userId && req.body.title && req.body.content){
        // if given user data proves to be sufficient ...
        // create a new post object with parsed out JSON data & attach new id number to it
        const post = {
            id: posts[posts.length - 1].id + 1,
            userId: req.body.userId,
            title: req.body.title,
            content: req.body.content,
        };
        // since posts are an array of objects, we can use Array.push() method to append new post to end
        posts.push(post);
        // converts newly created post object into JSON string format 
        // output JSON string to browser
        res.json(posts[posts.length - 1]);
    }

    // if the supplied data is inadequate ...
    else{
        // show status custom status "500" with custom error message
        // next(error(500, "Need your userId, rating, and opinion"));
        next();
    }
});

/* GET route with query parameter at end '?limit=1' */
// @route:  GET api/posts/search
// @desc:   Return number of posts given by query parameter
// @access: Public
router.get('/search', (req, res, next) => {
    
    // declare a local empty array for posts to be appended to
    const posts_array = [];

    // declare const variable limit to cache req.query.limit retrieved from HTTP GET request
    /* Aside: req.query are automatically parsed by Node Express when an HTTP GET request is made*/
    const limit = req.query.limit;

    // initialize an iterator 
    let itr = 0;
    // iterate through the given "posts" data set
    while(itr < limit){
        // append posts to an array
        posts_array.push(posts[itr]);
        // increment by 1 to keep cycle moving
        itr++;
    }
    // output the array of posts as JSON string to browser
    res.json(posts_array);
    
});

/* GET route takes in route parameter :id (inserted dynamic data) from path URL, caches and manipulate it */
// @route:  GET api/posts/:id
// @desc:   Retrieve a post
// @access: Public
router.get('/:id', (req, res, next) => {

    // accessing the database, declare variable "options" to be const since there will NOT be any redeclaration in this scope
    const options = [
        {
            // location property get or set the path URL to api/posts/:id
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
    "posts" array was already destructured once during import? */
    
    // employ JS array method .find() to search container for 1st instance of mentioned property
    let post = posts.find((elem) => 
        // if the :id were to be found in the database, initialize obj to variable post
        elem.id == req.params.id); // loose comparison so data type do NOT have to match in URL (1 vs "1" in JS)
    /* Question: Unsure why {} for above arrow function would interfere with status code */

    // use Object.keys() method to return an array of object's properties in conjunction ...
    // if the array is not empty => post object was not empty ...
    if(Object.keys(posts).length > 0){
        // res.json() function sends JSON string response to browser
        res.json({ post, options });
    }
    // otherwise if the post object is empty ...
    else{
        // goes to next middleware function (if there's any) or pass control to next route
        // next('route');
        next();
    }
});

// @route:  PATCH api/posts/:id
// @desc:   Updates a post
// @access: Public
router.patch('/:id', (req, res, next) => {
    // look through the posts array ...
    const post = posts.find((elem, index) => {
        // if value of :id in req.params is detected on the database ...
        if(elem.id == req.params.id){
            // loops through the keys in req.body (data retrieved from body-parsing middleware) for specific :id
            for(let key in req.body){
                // change the post
                posts[index][key] = req.body[key];
            }
            // adjust status code to okay
            return true;
        }
    });
    /* practice D.R.Y. : this is the same to if(Object.keys(post) ...) but much more succinct */
    // if "post" exists
    if(post){
        // sends out JSON string to browser
        res.json(post);
    }
    // otherwise 
    else{
        // move to next middleware function or move to next route
        next();
    }
});    

// @route:  DELETE api/posts/:id
// @desc:   Remove a post
// @access: Public
router.delete('/:id', (req, res, next) => {
    // utilize array.find() method to find 1st instance of ...
    const post = posts.find((elem, index) => {
        // if :id in request params matches an id on the database ...
        if(elem.id == req.params.id){
            // removes the post object from any index the array
            posts.splice(index, 1);  //.pop() would only from end, .shift() only from start
            // adjust status code to okay
            return true;
        }
    });
    // even D.R.Y.er?!! -- sends out JSON string to browser
    if(post){ res.json(post); }
    // otherwise move to next middleware function or move to next route
    else{ next(); }
});  

// @route:  GET api/posts/user/:userId
// @desc:   Gather up all of the user's posts
// @access: Public
router.get('/user/:userId', (req, res, next) => {
    // declare an empty array for later use
    const empty_array = [];
    // iterate through the array of posts
    let itr = 0;
    while(itr < posts.length){
        // if the userId in the database matches up with the requested userId
        if(posts[itr].userId == req.params.userId){
            // append their post to the the empty_array
            empty_array.push(posts[itr]);
        }
        // increment by 1 to continue cycling through
        itr++;
    }
    // if the array is populated ...
    if(empty_array.length != 0){
        // essentially console out JSON string to browser of the empty
        res.json(empty_array);
    }
    // if the array remained empty ...
    else{
        // res.send("No posts from this user");
        /* "Like a 'finally' ... it always run" (ref. Mykee) */
        // next(res.send("No posts from this user"));
        next("No POSTS from this user");
    }
});


// export out the router into server.mjs for further use
export default router;