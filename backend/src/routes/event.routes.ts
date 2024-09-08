import express from "express";
import eventController from "../controllers/event.controller";
import { verifyJWT } from "../middleware/verifyJWT";
import { upload } from "../middleware/uploadImage";

const eventRouter = express.Router();

eventRouter.route("/create-event").post(verifyJWT, eventController.createEvent);
eventRouter
	.route("/create-image")
	.post(verifyJWT, upload.single("image"), eventController.createImage);
eventRouter.route("/edit-event/:id").put(verifyJWT, eventController.editEvent);
eventRouter
	.route("/delete-event/:id")
	.put(verifyJWT, eventController.deleteEvent);
eventRouter.route("/").get(eventController.getEvents);

export default eventRouter;
