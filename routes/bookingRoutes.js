import  express  from "express";
import * as  dotenv from 'dotenv';



import bookingSchema from '../mongodb/models/booking.js';

dotenv.config();

const router = express.Router();



/**
 * creating new booking
 */
router.post('/', async (req, res) => {
    const newBooking = new bookingSchema (req.body);
    newBooking.save((err, booking)=> {
      if (err) return console.error(err);
      res.json(booking);
    });
  });
  
  /**
   * view all booking
   */
  
  router.get('/', async (req, res) => {
    bookingSchema .find((err, bookings) => {
      if (err) return console.error(err);
      res.json(bookings);
    });
  });








export default router;