import { Hono } from "hono";
import { Context } from "hono";
import { listrestrauntowner, getrestrauntowner, createrestrauntowner, updaterestrauntowner, deleterestrauntowner } from "./restraunt_owner.controller";
import { zValidator } from "@hono/zod-validator";
import { restrauntownerSchema } from "../validators.";

export const restrauntownerRouter = new Hono();

// Get all restraunt owners
restrauntownerRouter.get("/restrauntowner", listrestrauntowner);

// Get a single restraunt owner
restrauntownerRouter.get("/restrauntowner/:id", getrestrauntowner);

// Create a restraunt owner
restrauntownerRouter.post("/restrauntowner", zValidator('json', restrauntownerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createrestrauntowner);

// Update a restraunt owner
restrauntownerRouter.put("/restrauntowner/:id", updaterestrauntowner);

restrauntownerRouter.get("/restrauntowner", zValidator('json', restrauntownerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createrestrauntowner);

// Delete a restraunt owner
restrauntownerRouter.delete("/restrauntowner/:id", deleterestrauntowner);

restrauntownerRouter.get("/restrauntowner", getrestrauntowner);
