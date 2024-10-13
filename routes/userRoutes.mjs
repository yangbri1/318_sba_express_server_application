import express from 'express';
import { users } from '../data/users.mjs';
// import error from '../utilities/error.mjs';

let router = express.Router();

// @route:  GET api/users
// @desc:   Gets all users
// @access: Public
router.route('/').get((req, res) => {
  const links = [
    {
      href: 'users/:id',
      rel: ':id',
      type: 'GET',
    },
  ];

  res.json({ users, links });
});

// @route:  POST api/users
// @desc:   Add new user to DB
// @access: Public
router.post('/', (req, res, next) => {
  if (req.body.name && req.body.username && req.body.email) {
    //If body has, name, email, username cont...
    if (users.find((u) => u.username == req.body.username))
      next(error(409, 'Username Already Taken'));

    //Create anew user with data
    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(user); //Push new user to DB
    res.json(users[users.length - 1]); //respond with new user info
  } 
//   else next(error(400, 'Insufficient Data')); //use send error
});

// @route:  GET api/users/:id
// @desc:   Gets one user
// @access: Public
router.get('/:id', (req, res, next) => {
  const links = [
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'PATCH',
    },
    {
      href: `/${req.params.id}`,
      rel: '',
      type: 'DELETE',
    },
  ];

  const user = users.find((u) => u.id == req.params.id);

  if (user) res.json({ user, links });
  else next();
});

// @route:  PATCH api/users/:id
// @desc:   Update specific user
// @access: Public
router.patch('/:id', (req, res, next) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      for (const key in req.body) {
        users[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

// @route:  PATCH api/users/:id
// @desc:   Delete specific user
// @access: Public
router.delete('/:id', (req, res, next) => {
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      users.splice(i, 1);
      return true;
    }
  });

  if (user) res.json(user);
  else next();
});

export default router;
