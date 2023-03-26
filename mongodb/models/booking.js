import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    partySize: { type: Number, required: true },
  });
  
  const Booking = mongoose.model('Booking', bookingSchema);
  
  export default Booking;