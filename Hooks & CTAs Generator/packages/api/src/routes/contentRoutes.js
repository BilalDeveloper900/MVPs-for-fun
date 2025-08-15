"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var contentController_1 = require("../controllers/contentController");
var router = (0, express_1.Router)();
var contentController = new contentController_1.ContentController();
// POST /api/generateContent - Generate hooks and CTAs for a topic
router.post("/generateContent", function (req, res) {
    contentController.generateContent(req, res);
});
exports.default = router;
