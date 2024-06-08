import { Hono } from "hono";
import { Context } from "hono";
import { listcity, getcity, createcity, updatecity, deletecity } from "./city.controller";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators.";

export const cityRouter = new Hono();

// Get all cities
cityRouter.get("/city", listcity);
// Get a single city
cityRouter.get("/city/:id", getcity);
// Create a city
cityRouter.post("/city", zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createcity);
// Update a city
cityRouter.put("/city/:id", updatecity); 

cityRouter.get("/city", zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createcity);

// Delete a city
cityRouter.delete("/city/:id", deletecity);

cityRouter.get("/city", getcity);
