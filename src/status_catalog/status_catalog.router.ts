import { Hono } from "hono";
import { Context } from "hono";
import { liststatusCatalog, getstatusCatalog, createstatusCatalog, updatestatusCatalog, deletestatusCatalog } from "./status_catalog.controller";
import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema } from "../validators.";

export const statusCatalogRouter = new Hono();

// Get all statusCatalogs
statusCatalogRouter.get("/statusCatalog", liststatusCatalog);

// Get a single statusCatalog
statusCatalogRouter.get("/statusCatalog/:id", getstatusCatalog);

// Create a statusCatalog
statusCatalogRouter.post("/statusCatalog", zValidator('json', statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createstatusCatalog);

// Update a statusCatalog
statusCatalogRouter.put("/statusCatalog/:id", updatestatusCatalog); 

statusCatalogRouter.get("/statusCatalog", zValidator('json', statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400);
    }
}), createstatusCatalog);

// Delete a statusCatalog
statusCatalogRouter.delete("/statusCatalog/:id", deletestatusCatalog);

statusCatalogRouter.get("/statusCatalog", getstatusCatalog);
