import { Context } from "hono";
import { stateService, getstateService, updatestateService, createstateService, deletestateService } from "./state.service";

export const liststate = async (c: Context) => {
    const data = await stateService();
    if (data == null || data.length == 0) {
        return c.text("hello Ian user not found", 404);
    }
    return c.json(data, 200);
}

// Getting state
export const getstate = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await getstateService(id);
    if (state == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(state, 200);
}

// Creating state
export const createstate = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await createstateService(state);
        if (!createdState) return c.text("User not created", 404);
        return c.json(createdState, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Updating state
export const updatestate = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const state = await c.req.json();
    // Search user
    const searchedState = await getstateService(id);
    if (searchedState == undefined) return c.text("User not found", 404);
    // Get data and update
    const res = await updatestateService(id, state);
    // Return a success message
    if (!res) return c.text("User not updated", 404);
    return c.json({ msg: res }, 201);
}

// Deleting state
export const deletestate = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search user
        const state = await getstateService(id);
        if (state == undefined) return c.text("User not found", 404);
        // Delete user
        const res = await deletestateService(id);
        if (!res) return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
