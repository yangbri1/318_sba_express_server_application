// exporting custom logging middleware function to server.mjs
export function query_params(req, res, next){

    // declare a const variable to cache req.query GET HTTP request
    /* Note: req.query are automatically parsed by Node-Express from the GET HTTP request */
    const limit = req.query.limit;
    
    // if "limit" req.query is NOT detected in the HTTP GET request
    if(!limit){
        // console.log() out message to terminal
        console.log("No limit -- drop it all!");
    }
    // otherwise ...
    else{
         // console.log() out to number of comments to show
        console.log(`Asking for ${limit} comments`);
        res.send(`Asking for ${limit} comments ...`)
    }
   
    // calling next() function to pass control to next middleware or route handler if this proves to be successful
    next(); 

};