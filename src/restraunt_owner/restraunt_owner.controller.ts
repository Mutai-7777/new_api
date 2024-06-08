import { Context } from "hono";
import { restrauntOwnerService, getrestrauntOwnerService, updaterestrauntOwnerService, createrestrauntOwnerService, deleterestrauntOwnerService } from "./restraunt_owner.service";

export const listrestrauntowner = async (c: Context) => {
    const data = await restrauntOwnerService();
    if (data == null || data.length == 0) {
        return c.text("hello Ian user not found", 404);
    }
    return c.json(data, 200);
}

// Getting restraunt owner
export const getrestrauntowner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const restrauntOwner = await getrestrauntOwnerService(id);
    if (restrauntOwner == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(restrauntOwner, 200);
}

// Creating restraunt owner
export const createrestrauntowner = async (c: Context) => {
    try {
        const restrauntOwner = await c.req.json();
        const createdRestrauntOwner = await createrestrauntOwnerService(restrauntOwner);
        if (!createdRestrauntOwner) return c.text("User not created", 404);
        return c.json(createdRestrauntOwner, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Updating restraunt owner
export const updaterestrauntowner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const restrauntOwner = await c.req.json();
    // Search user
    const searchedRestrauntOwner = await getrestrauntOwnerService(id);
    if (searchedRestrauntOwner == undefined) return c.text("User not found", 404);
    // Get data and update
    const res = await updaterestrauntOwnerService(id, restrauntOwner);
    // Return a success message
    if (!res) return c.text("User not updated", 404);
    return c.json({ msg: res }, 201);
}

// Deleting restraunt owner
export const deleterestrauntowner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search user
        const restrauntOwner = await getrestrauntOwnerService(id);
        if (restrauntOwner == undefined) return c.text("User not found", 404);
        // Delete user
        const res = await deleterestrauntOwnerService(id);
        if (!res) return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
