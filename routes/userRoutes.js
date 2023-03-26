import express from 'express';
import bcrypt from 'bcrypt';

import User from '../mongodb/models/user.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const { firstname , lastname, email, password } = req.body;
  
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }
  
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Create user
    const user = new User({ firstname,lastname, email, password: hashedPassword });
    await user.save();
    
    user.collection('details').insertOne(data,function(err, collection){
      if (err) throw err;
      console.log("Record inserted Successfully");
            
  });
    res.redirect('/login');
  });

  // Middleware for authentication
const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    // User is authenticated
    next();
  } else {
    // User is not authenticated
    res.redirect('/login');
  }
};

// Protected route
router.get('/profile', requireAuth, (req, res) => {
  res.send(`Welcome ${req.session.username}!`);
});

  export default router;