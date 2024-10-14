// importing web application framework Express.js (built off of runetime env Node.js)
import express from 'express';
// importing relevant JavaScript module and array destructuring it for later use
import { users } from '../data/users.mjs';
import { comments } from '../data/comments.mjs';
import { posts } from '../data/posts.mjs';

// use express.Router() class to create modular & mountable route handlers
// Aside: replace "app" prefix (in server.mjs) to "router" (here) 
let router = express.Router();

/* Notice: Every Express routes follow a similar structure: 
    instance.method(path URL on server, handler function exe on route) */

// @route:  GET api/users
// @desc:   Reads all users
// @access: Public
router.get('/', (req, res) => {

    // imitates accessing the database 
    const options = [
        {
            // cache dynamic "id" request by user
            href: 'users/:id',
            rel: ':id',
            method: 'GET',
        },
    ];
    // besides res.send() which sends a String text 
    /* res.json() converts given parameters into JSON string format & send to client */ 
    /* Aside: .json() normally used when dealing w/ data in API creation  (ref. lecture) */
    res.json({ users, options });
});

/* Note:  Handler arrow callback function takes in next() object as a parameter because
    here it is a middleware function */

// @route   POST api/users
// @desc:   Creates a user
// @access: Public
router.post('/', (req, res, next) => {
    
    /* Aside: Express' req.body property provides access to parsed request body from bodyParser in server.mjs*/
    // checks the parsed data for userId, name, username, email (properties in users.mjs)
    if(req.body.name && req.body.username && req.body.email){
        // if given user data proves to be sufficient ...
        // create a new user object with parsed out JSON data & attach new id number to it
        const user = {
            id: users[users.length - 1].id + 1,
            // userId: req.body.userId,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
        };
        // since users are an array of objects, we can use Array.push() method to append new user to end
        users.push(user);
        // converts newly created user object into JSON string format -- for uniformity
        res.json(users[users.length - 1]);
    }

    // if the supplied data is inadequate ...
    else{
        // show status custom status "500" with custom error message
        // next(error(500, "Need your userId, rating, and opinion"));
        next();
    }
});

/* GET route takes in route parameter :id (inserted dynamic data) from path URL, caches and manipulate it */
// @route:  GET api/users/:id
// @desc:   Retrieve a user
// @access: Public
router.get('/:id', (req, res, next) => {

    // accessing the database, declare variable "options" to be const since there will NOT be any redeclaration in this scope
    const options = [
        {
            // location property get or set the path URL to api/users/:id
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
    "users" array was already destructured once during import? */
    
    // employ JS array method .find() to search container for 1st instance of mentioned property
    let user = users.find((elem) => 
        // if the :id were to be found in the database, initialize obj to variable user
        elem.id == req.params.id); // loose comparison so data type do NOT have to match in URL (1 vs "1" in JS)
    /* Question: Unsure why {} for above arrow function would interfere with status code */

    // use Object.keys() method to return an array of object's properties in conjunction ...
    // if the array is not empty => user object was not empty ...
    if(Object.keys(users).length > 0){
        // res.json() function sends JSON string response to browser
        res.json({ user, options });
    }
    // otherwise if the user object is empty ...
    else{
        // goes to next middleware function (if there's any) or pass control to next route
        // next('route');
        next();
    }
});

// @route:  PATCH api/users/:id
// @desc:   Updates an user
// @access: Public
router.patch('/:id', (req, res, next) => {
    // look through the users array ...
    const user = users.find((elem, index) => {
        // if value of :id in req.params is detected on the database ...
        if(elem.id == req.params.id){
            // loops through the keys in req.body (data retrieved from body-parsing middleware) for specific :id
            for(let key in req.body){
                // change the user
                users[index][key] = req.body[key];
            }
            // adjust status code to okay
            return true;
        }
    });
    /* practice D.R.Y. : this is the same to if(Object.keys(user) ...) but much more succinct */
    // if "user" exists
    if(user){
        // sends out JSON string to browser
        res.json(user);
    }
    // otherwise 
    else{
        // move to next middleware function or move to next route
        next();
    }
});    

// @route:  DELETE api/users/:id
// @desc:   Remove an user
// @access: Public
router.delete('/:id', (req, res, next) => {
    // utilize array.find() method to find 1st instance of ...
    const user = users.find((elem, index) => {
        // if :id in request params matches an id on the database ...
        if(elem.id == req.params.id){
            // removes the user object from any index the array
            users.splice(index, 1);  //.pop() would only from end, .shift() only from start
            // adjust status code to okay
            return true;
        }
    });
    // even D.R.Y.er?!! -- sends out JSON string to browser
    if(user){ res.json(user); }
    // otherwise move to next middleware function or move to next route
    else{ next(); }
});  

// @route:  GET api/users/user/:id
// @desc:  Compile all of the user's data (comments, posts, user info) into one place
// @access: Public
router.get('/user/:id', (req, res, next) => {
    // declare an empty array for later use
    const empty_array = [];
    // iterate through the array of users
    let itr = 0;
    while(itr < users.length){
        // if the id in the database matches up with the requested :id
        if(users[itr].id == req.params.id){
            // append their user to the the empty_array
            empty_array.push(users[itr]);
        }
        // increment by 1 to continue cycling through
        itr++;
    }
    // cycle through all of the selected user's comments
    let it = 0;
    while(it < comments.length){
        // if the userId in the database matches up with the requested :id
        if(comments[it].userId == req.params.id){
            // include user's comments to the the empty_array
            empty_array.push(comments[it]);
        }
        // increment by 1 to continue cycling through
        it++;
    }
    // loop via all of the selected user's posts
    let i = 0;
    while(i < posts.length){
        // if the userId in the database matches up with the requested :id
        if(posts[i].userId == req.params.id){
            // add all of their posts to the the empty_array
            empty_array.push(posts[i]);
        }
        // increment by 1 to continue cycling through
        i++;
    }
    // if the array holds any elements ...
    if(empty_array.length != 0){
        // output JSON string to browser of the empty
        res.json(empty_array);
    }
    // if the array remained empty ...
    else{
        // res.send("No posts from this user");
        /* "Like a 'finally' ... it always run" (ref. Mykee) */
        // next(res.send("No users from this user"));
        next("No USER info (comments, posts, user) found")
    }
});



// export out the router into server.mjs for further use
export default router;