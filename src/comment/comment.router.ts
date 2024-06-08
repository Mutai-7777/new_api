import { Hono } from "hono";
import { Context } from "hono";
import { listcomment, getcomment, createcomment, updatecomment, deletecomment } from "./comment.controller";
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators.";

export const commentRouter = new Hono();

// Get all comments
commentRouter.get("/comment", listcomment);

// Get a single comment
commentRouter.get("/comment/:id", getcomment);

// Create a comment
commentRouter.post("/comment", zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createcomment);

// Update a comment
commentRouter.put("/comment/:id", updatecomment); 

commentRouter.get("/comment", zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createcomment);

// Delete a comment
commentRouter.delete("/comment/:id", deletecomment);

commentRouter.get("/comment", getcomment);
