const { getUsers, registerUser, loginUser } = require("../Controlles/Users");
const router = require("express").Router();

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router; 