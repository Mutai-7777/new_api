import { Hono } from "hono";
import { Context } from "hono";
import { listdriver, getdriver, createdriver, updatedriver, deletedriver } from "./driver.controller";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators.";

export const driverRouter = new Hono();

// Get all drivers
driverRouter.get("/driver", listdriver);

// Get a single driver
driverRouter.get("/driver/:id", getdriver);

// Create a driver
driverRouter.post("/driver", zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createdriver);

// Update a driver
driverRouter.put("/driver/:id", updatedriver);

driverRouter.get("/driver", zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createdriver);

// Delete a driver
driverRouter.delete("/driver/:id", deletedriver);

driverRouter.get("/driver", getdriver);
