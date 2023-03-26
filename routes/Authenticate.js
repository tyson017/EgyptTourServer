import express from 'express';
import bcrypt from 'bcrypt';

import User from '../mongodb/models/user.js';
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid email or password');
    };
  
    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send(' Please Re-enter the password');
    };

});


export default router;