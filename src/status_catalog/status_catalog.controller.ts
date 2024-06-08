import { Context } from "hono";
import { statusCatalogService, getStatusCatalogService, updateStatusCatalogService, createStatusCatalogService, deleteStatusCatalogService } from "./status_catalog.service";

export const liststatusCatalog = async (c: Context) => {
    const data = await statusCatalogService();
    if (data == null || data.length == 0) {
        return c.text("hello Ian user not found", 404);
    }
    return c.json(data, 200);
}

// Getting status_catalog
export const getstatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const statusCatalog = await getStatusCatalogService(id);
    if (statusCatalog == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(statusCatalog, 200);
}

// Creating status_catalog
export const createstatusCatalog = async (c: Context) => {
    try {
        const statusCatalog = await c.req.json();
        const createdStatusCatalog = await createStatusCatalogService(statusCatalog);
        if (!createdStatusCatalog) return c.text("User not created", 404);
        return c.json(createdStatusCatalog, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Updating status_catalog
export const updatestatusCatalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const statusCatalog = await c.req.json();
    // Search user
    const searchedStatusCatalog = await getStatusCatalogService(id);
    if (searchedStatusCatalog == undefined) return c.text("User not found", 404);
    // Get data and update
    const res = await updateStatusCatalogService(id, statusCatalog);
    // Return a success message
    if (!res) return c.text("User not updated", 404);
    return c.json({ msg: res }, 201);
}

// Deleting status_catalog
export const deletestatusCatalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search user
        const statusCatalog = await getStatusCatalogService(id);
        if (statusCatalog == undefined) return c.text("User not found", 404);
        // Delete user
        const res = await deleteStatusCatalogService(id);
        if (!res) return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
