const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/addressController");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getAll);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;