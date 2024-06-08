import { Hono } from "hono";
import { Context } from "hono";
import { listmenu_item, getmenu_item, createmenu_item, updatemenu_item, deletemenu_item } from "./Menu_item.controller";
import { zValidator } from "@hono/zod-validator";
import { menu_itemSchema } from "../validators.";

export const menu_itemRouter = new Hono();

// Get all menu_items
menu_itemRouter.get("/menu_item", listmenu_item);

// Get a single menu_item
menu_itemRouter.get("/menu_item/:id", getmenu_item);

// Create a menu_item
menu_itemRouter.post("/menu_item", zValidator('json', menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createmenu_item);

// Update a menu_item
menu_itemRouter.put("/menu_item/:id", updatemenu_item);

// Validate menu_item and create
menu_itemRouter.get("/menu_item", zValidator('json', menu_itemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createmenu_item);

// Delete a menu_item
menu_itemRouter.delete("/menu_item/:id", deletemenu_item);

// Get menu_item
menu_itemRouter.get("/menu_item", getmenu_item);
