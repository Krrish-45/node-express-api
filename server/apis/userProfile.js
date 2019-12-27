const express = require("express");
const userRESTRouter = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
// const testModel = require('../database/mongodb').models.test;
const log = require("../logger");
const _TAG = "API: /user-profile";
const UserProfile = require("../logics/userProfile");

userRESTRouter.get("/get-one-user", async (req, res) => {
  try {
    const staffDetails = await UserProfile.getOneUserProfile(
      {
        isDeleted: false,
        company: req.companyId
      },
      req.query
    );
    res.status(200).send(staffDetails);
  } catch (err) {
    log.info("err", _TAG + req.url, "Error Message", err);
    const error = {
      result: null,
      exception: err.message,
      pagination: null,
      stringResult: null
    };
    res.status(err.statusCode || 500).send(error);
  }
});

userRESTRouter.post("/create", upload.single("file"), async (req, res) => {
  try {
    log.info("POST", _TAG + req.url);
    const resultData = await UserProfile.createUserProfile(req);
    const result = {
      result: resultData,
      exception: null,
      pagination: null,
      stringResult: null
    };
    res.status(200).send(result);
  } catch (err) {
    log.info("err", _TAG + req.url, "Error Message", err);
    const error = {
      result: null,
      exception: err.message,
      pagination: null,
      stringResult: err.stringResult
    };
    res.status(err.statusCode || 500).send(error);
  }
});

module.exports = userRESTRouter;
