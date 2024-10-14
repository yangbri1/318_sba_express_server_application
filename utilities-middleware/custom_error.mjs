// export custom error middleware function to server.mjs
/* Note: error handling middleware has 4 params that ALL needs to be filled w/ something */
export function custom_error(err, req, res, next){
    // console.log(err.stack);
    console.error(err); // this will also print out error stack to terminal
    // here we create a customer error code 600 w/ message if it hits
    // res.status(600).send(`Something's amiss ... `);  // print out text to browser
    console.log(req.params);
    res.status(600).json({error: "Data not found"});    // print out a JSON string to browser
    
    // if(req.path == '/user/ ...'){
    //     res.status(600).json({error: "User not found"}); 
    // }
    
    /* no need for next() as this one should be the very last middleware right next to app.listen()
    also any middleware that comes after this error-handling one won't run even with "next()" */
};