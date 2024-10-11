import express from 'express';
import { comments } from '../data/comments.mjs';

// use express.Router() class to create modular & mountable route handlers
// Aside: replace "app" prefix to "router" 
let router = express.Router();

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
    /* res.json() converts given parameters into JSON string format (use in API creation)  & send to client */ 
    res.json({comments, links});

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




export default router;