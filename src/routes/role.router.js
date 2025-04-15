import express from "express";
import { chatController } from "../controllers/chat.controller.js";

const chatRouter = express.Router();

// Tạo route CRUD
chatRouter.post("/", chatController.create);
chatRouter.get("/", chatController.findAll);
chatRouter.get("/:id", chatController.findOne);
chatRouter.patch("/:id", chatController.update);
chatRouter.delete("/:id", chatController.remove);
export default chatRouter;
