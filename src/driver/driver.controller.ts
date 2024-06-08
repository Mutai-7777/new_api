import { Context } from "hono";
import { driverService, getdriverService, updatedriverService, createdriverService, deletedriverService } from "./driver.service";

export const listdriver = async (c: Context) => {
    const data = await driverService();
    if (data == null || data.length == 0) {
        return c.text("hello Ian user not found", 404);
    }
    return c.json(data, 200);
}

// Getting driver
export const getdriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const driver = await getdriverService(id);
    if (driver == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(driver, 200);
}

// Creating driver
export const createdriver = async (c: Context) => {
    try {
        const driver = await c.req.json();
        const createdDriver = await createdriverService(driver);
        if (!createdDriver) return c.text("User not created", 404);
        return c.json(createdDriver, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Updating driver
export const updatedriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const driver = await c.req.json();
    // Search user
    const searchedDriver = await getdriverService(id);
    if (searchedDriver == undefined) return c.text("User not found", 404);
    // Get data and update
    const res = await updatedriverService(id, driver);
    // Return a success message
    if (!res) return c.text("User not updated", 404);
    return c.json({ msg: res }, 201);
}

// Deleting driver
export const deletedriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search user
        const driver = await getdriverService(id);
        if (driver == undefined) return c.text("User not found", 404);
        // Delete user
        const res = await deletedriverService(id);
        if (!res) return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
