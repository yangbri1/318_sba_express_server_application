// exporting custom logging middleware function to server.mjs
export function custom_logger(req, res, next){
    // create a new obj/property of req.time such that it contains the current time when logged to string
    req.time = new Date(Date.now()).toString();
    // console log out to terminal
    console.log(req.method, req.hostname, req.path, req.time);
    next(); // necessary to invoke next() to move onwards to next handler function, otw it ends here
};