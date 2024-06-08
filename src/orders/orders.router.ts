import { Hono } from "hono";
import { Context } from "hono";
import { listOrders, getOrders, createOrders, updateOrders, deleteOrders } from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { OrdersSchema } from "../validators.";

export const ordersRouter = new Hono();

// Get all Orders
ordersRouter.get("/Orders", listOrders);

// Get a single Orders
ordersRouter.get("/Orders/:id", getOrders);

// Create a Orders
ordersRouter.post("/Orders", zValidator('json', OrdersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createOrders);

// Update a Orders
ordersRouter.put("/Orders/:id", updateOrders); 

ordersRouter.get("/Orders", zValidator('json', OrdersSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createOrders);

// Delete a Orders
ordersRouter.delete("/Orders/:id", deleteOrders);

ordersRouter.get("/Orders", getOrders);
