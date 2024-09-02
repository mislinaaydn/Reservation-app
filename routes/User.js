const {
  updateUser,
  deleteUser,
  detailUser,
  allUser,
} = require("../controllers/User.js");
const express = require("express");
const router = express.Router();
const { verifyUser, verifyAdmin } = require("../middleware/verify.js");

router.put("/updateUser/:id", verifyUser, updateUser);
router.delete("/deleteUser/:id", verifyUser, deleteUser);
router.get("/detailUser/:id", verifyUser, detailUser);
router.get("/allUser/:id", verifyAdmin, allUser);

module.exports = router;
