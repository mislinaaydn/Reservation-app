const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");
const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    const room = await Room.create(req.body);
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: room_id } });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateRoom = async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } //işlem gerçekleştikten sonra verileri update eder.
    );
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    res.status(200).json({ message: "Room deleted" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getDetailRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
const getAllRoom = async (req, res, next) => {
  try {
    const room = await Room.find();
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getDetailRoom,
  getAllRoom,
};
