# Project Name
### Skill Based Assessment #6 --- <em> Express Server Application </em>

- - - -

## Project Description
### Create a web application using the fundamentals of Node.js and Express.js. Creative freedom is a go, topic is totally up for grasp. Main objectives includes ...

#### 1. Creating a server application with Node.js and Express.js.
#### 2. Create a RESTful API using Express.js.
#### 3. Create some Express middleware functions.
#### 4. Use the Express middleware functions (whether in callback functions for path routes or independently).
#### 5. Use a template engine (create or use a 3rd party) to render views with Express.
#### 6. Interact with a self-made API through HTML forms. *

- - - -

## Technologies used
### JavaScript runtime environments:
#### (1) Browser (Chrome, Edge, etc.)
#### (2) Node.js (built-in JavaScript):
##### HTTP request methods (POST, GET, PUT, PATCH, DELETE), HTTP responses, app.listen()  and other methods

### Express() route path handlers: 
#### structure: app.method(path URL, *callback* handler function *middleware* )
#### methods: POST (app.post), GET (app.get), PATCH (app.patch), DELETE (app.delete) routes
#### properties: app.use() -- to load router, 

### Express Router():
#### structure: router.method(path URL, *callback* handler function)
#### methods: POST (router.post), GET (router.get), PATCH (router.patch), DELETE (router.delete), express.router()

## Form validation for URL pathname
### Regular functions (Regex): () *capture*, ? *optional*, * *catch all* 

### Express route parameters:
#### req.params { userId:"1", id: "1" }

### Express middlewares (order matters)
#### logging, error-handling (4 params req.), 3rd party (Morgan, etc.), express.static(), app.use() & next() -- handle middleware

### Body-Parser
#### import JavaScript middleware to parse out data
#### bodyParser.urlenencoded(), bodyParser.json()

### Additional Express methods
#### .json(), .Router(), .static(), .urlencoded()

### HTTP request / response object properties
#### req.params, res.send(), req.path, res.status(), res.json()

### File System (fs.readFile)
#### import built-in node file system to allow handling of template engine

### Template engine
#### app.use()      -- to load it onto server.mjs 
#### app.set()      -- specifies file & registers view engine
#### express.static -- to load stylesheets to template engine
#### res.render()   -- render view to be sent back to client

### JavaScript built-in objects, methods
#### .toString(), .replace(), .replaceAll(), .push(), .find()

### JS containers, conditionals, loops
#### arrays [], objects {}, if-else, while()

### CSS external styling
### import / export modular JS files
### npm, nodemon, install express packages, node_modules + .gitignore,

* Others: Github add, commits; JS package, VSCode IDE, Thunder-Client extension

- - - -

## How to get started
### Functionality over form
### Hit the minimum requirements (Create a Minimum Viable Product) first. Looked over the lecture slides and read through the notes to refresh some of the concepts. Start commiting early and frequently save. 
### Once again --- functionality first & creativity later.

- - - -

## Acknowledgements
### All used source materials are stored in the "reference folder of this repo.

### One Piece Wiki
#### https://onepiece.fandom.com/wiki/One_Piece_Wiki

### One Piece image links
#### https://www.deviantart.com/bodskih/art/Sanji-Vinsmoke-685896296
#### https://www.deviantart.com/inkartluis/art/TONY-TONY-CHOPPER-from-One-Piece-812369010
#### https://onepiece.fandom.com/wiki/Usopp

### Popular color schemes
#### https://coolors.co/palettes/popular

### Emojis
#### https://emojipedia.org/waving-hand

### Express middlewares resources
#### https://expressjs.com/en/resources/middleware.html
#### https://retrodevs.medium.com/express-js-logger-middleware-a-quick-and-easy-guide-6b79a14ea164

### Express 3rd party middleware: Morgan
#### https://stackoverflow.com/questions/25468786/what-does-morgan-module-have-to-do-with-express-apps#:~:text=For%20example%3A%20var%20express%20%3D%20require%28%27express%27%29%20var%20morgan,in%20the%20%22combined%22%20pre-defined%20format%20app.use%28morgan%28%27combined%27%29%29%20%2F%2FThat%27s%20it.

### Express error-handling examples
#### https://expressjs.com/en/guide/error-handling.html

### Express .json() response method usage (JSON string to browser)
#### https://www.geeksforgeeks.org/express-js-res-json-function/

### JavaScript Object prototype (ways to check if obj is empty)
#### https://www.freecodecamp.org/news/check-if-an-object-is-empty-in-javascript/

### Regex syntaxes
#### https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet

### CSS animations
#### https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations/Using_CSS_animations

### Lecture Notes
#### https://www.canva.com/design/DAFris1zDAc/view
#### https://www.canva.com/design/DAFripTTxwU/view
#### https://www.canva.com/design/DAFrihOC93k/EfbRohZDCpdHqOr5rKNxOg/edit


- - - -

### Setup
> First create the "server.mjs" file using git bash, then pass the npm command: <strong> "npm init -y" </strong> into the command line to create "package.json" file. Install nodemon globally on local machine if tool is missing via <strong> "npm i --save-dev nodemon" </strong>. Next, correct the package.json --- check the value of the "main" key is "server.mjs" (same name as the modular JS file we'll be working in) & add "start": "nodemon server.mjs" under scripts. Now, we create an ".gitignore" file ("node_modules/" line inside) so during git commits and ultimately git push, our node_module (could be big) would NOT be pushed to Github. Soonafter, download Express using <strong> "npm i express" </strong> command. Import Express into server.mjs at top of the page (import express from 'express'), create an instance of Express, and declare a PORT for the server to be listening to (default: 3000, 5500, etc.). Establish an app.listen() function at the very bottom of server.mjs and an app.get() function above typically taking in path URL of root and an arrow function of arguments (pair of request & response) with res.send() method. To see if the text is successfully broadcasted, run <strong> "npm start" </strong> in the command line and navigate to URL "http://localhost:3000/ on a browser or send an HTTP GET request to above URL on VS Code's Thunder-Client extension to just check it on the back-end.

### Enclosed Files
> <em> server.mjs </em>
>> Holds the brains of the server, showcase outline of necessary imports, port to listen, template engine, middleware functions, routes, error-handling middleware, app.listen() function.
<li> </li>

> <em> package.json </em>
>
> <em> package-lock.json </em>
<li> Created via <strong> npm init -y </strong> and its purpose is to manage required dependencies, scripts, and other information for this project to be operational. </li>

> *.gitignore*
<li> Contains the single line <strong> node_modules/ </strong> (case-senstive) to withhold the node_modules file during git push to Github. </li>

> *node_modules*
<li> Why exclude this file? It may be big & it holds extraneous data that others may not want to see. </li>

> *styles* 
>> *styles.css*
<li> CSS provides styling to the endpoints.html and later crucial in serving static files in an Express application for the template.who template engine </li>


### Directions
> With the assumption that "npm start" is already active, navigating to http://localhost:3000/ w
