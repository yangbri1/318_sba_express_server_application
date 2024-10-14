/* export custom middleware function to server.mjs showing HTTP request was received 
(tho if Morgan & custom_logger middleware are invoked -- implicitly HTTP request is already established) */
export function custom_req_logger(req, res, next){
    // indicate HTTP request successfully connected
    console.log(`HTTP ${req.method} request received.`);
    // points to next middleware handler function (or route if used there)
    next(); // IMPORTANT: include next function otherwise other middleware will not run
};