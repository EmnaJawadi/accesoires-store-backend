const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
    postCommande,
  getCommande,
  getCommandes,
  putCommande,
  deleteCommande,
} = require('../Controlles/Commande');

router.post("/",postCommande );
router.get("/",getCommande);
router.get("/",getCommandes);
router.delete("/:id", deleteCommande);
router.put("/:id",putCommande );

module.exports = router; 