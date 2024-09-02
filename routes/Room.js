const {
  createRoom,
  updateRoom,
  deleteRoom,
  getDetailRoom,
  getAllRoom,
} = require("../controllers/Room.js");
const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/verify.js");

router.post("/createRoom/:id/:hotelid", verifyAdmin, createRoom);
router.put("/updateRoom", verifyAdmin, updateRoom);
router.delete("/deleteRoom/:id/:hotelid", verifyAdmin, deleteRoom);
router.get("/getDetailRoom/:id", getDetailRoom);
router.get("/getAllRoom", getAllRoom);
module.exports = router;
