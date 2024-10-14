// export custom error middleware function to server.mjs
/* Note: error handling middleware has 4 params that ALL needs to be filled (even when unused otw becomes normal custom middleware) */
export function custom_error(err, req, res, next){
    // console.log(err.stack);
    // console.error(err); // this will also print out error stack to terminal
    // here we create a customer error code 600 w/ message if it hits
    // res.status(600).send(`Something's amiss ... `);  // print out text to browser
    // console.log(req);
    // print out a JSON string to browser w/ return HTTP response status code "404" (Resource not found)
    res.status(404).json({status: '404',
                          error: "Data not found"});    

    
    /* change response's status to custom value 600 (not going through when res.json() is in commentRoutes.mjs ...) */
    // res.status(600);

    // if(req.path == '/api/comments/user/...'){ // neither spread operator (...) nor regex (*) seemed to work with req.path
    //     res.status(700).json({error: "Comments not founddd"}); 
    // }
    
    /* no need for next() as this one should be the very last middleware right next to app.listen()
    also any middleware that comes after this error-handling one won't run even with "next()" */
};