import { Hono } from "hono";
import { Context } from "hono";
import { liststate, getstate, createstate, updatestate, deletestate } from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators.";

export const stateRouter = new Hono();

// Get all states
stateRouter.get("/state", liststate);

// Get a single state
stateRouter.get("/state/:id", getstate);

// Create a state
stateRouter.post("/state", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createstate);

// Update a state
stateRouter.put("/state/:id", updatestate); 

stateRouter.get("/state", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createstate);

// Delete a state
stateRouter.delete("/state/:id", deletestate);

stateRouter.get("/state", getstate);
