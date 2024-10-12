import express from 'express';
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

    const links = [
        {
            // cache dynamic "id" request by user
            href: 'comments/:id',
            rel: ':id',
            type: 'GET',
        },
    ];
    // besides res.send() which sends a String text 
    /* res.json() converts given parameters into JSON string format & send to client */ 
    /* Aside: .json() normally used when dealing w/ data in API creation  (ref. lecture) */
    res.json({comments, links});
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
        let comment = {
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
        next(error(400, "Need your userId, rating, and opinion"));
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