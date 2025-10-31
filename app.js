const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // 10 seconds timeout
})
.then(() => console.log(" MongoDB Connected Successfully"))
.catch((err) => console.error(" MongoDB Connection Failed:", err.message));


// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  event: { type: String, required: true },
  ticketType: String,
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);


app.get("/api/bookings", async (req, res) => {
  const bookings = await Booking.find();
  res.status(200).json(bookings);
});


app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;

    if (!name || !email || !event) {
      return res.status(400).json({ message: "Name, email, and event are required!" });
    }

    const newBooking = new Booking({ name, email, event, ticketType });
    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully!", booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/api/bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking updated successfully!", booking: updatedBooking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.get("/api/bookings/search", async (req, res) => {
  const { email } = req.query;
  const results = await Booking.find({ email: email });
  res.status(200).json(results);
});


app.get("/api/bookings/filter", async (req, res) => {
  const { event } = req.query;
  const results = await Booking.find({ event: event });
  res.status(200).json(results);
});


app.listen(process.env.PORT, () => {
  console.log(` Synergia Booking API running on port ${process.env.PORT}`);
});
