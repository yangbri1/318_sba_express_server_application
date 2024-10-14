// export custom error middleware function to server.mjs
/* Note: error handling middleware has 4 params that ALL needs to be filled w/ something */
export function custom_error(err, req, res, next){
    // console.log(err.stack);
    console.error(err); // this will also print out error stack to terminal
    // here we create a customer error code 600 w/ message if it hits
    res.status(600).send(`Something's amiss ... `);
};