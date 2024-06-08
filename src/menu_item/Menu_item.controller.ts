import { Context } from "hono";
import { menu_itemService, getmenu_itemService, updatemenu_itemService, createmenu_itemService, deletemenu_itemService } from "./menu_item.service";

export const listmenu_item = async (c: Context) => {
    const data = await menu_itemService();
    if (data == null || data.length == 0) {
        return c.text("hello Ian user not found", 404);
    }
    return c.json(data, 200);
}

// Getting menu_item
export const getmenu_item = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const menu_item = await getmenu_itemService(id);
    if (menu_item == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(menu_item, 200);
}

// Creating menu_item
export const createmenu_item = async (c: Context) => {
    try {
        const menu_item = await c.req.json();
        const createdMenuItem = await createmenu_itemService(menu_item);
        if (!createdMenuItem) return c.text("User not created", 404);
        return c.json(createdMenuItem, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Updating menu_item
export const updatemenu_item = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const menu_item = await c.req.json();
    // Search user
    const searchedMenuItem = await getmenu_itemService(id);
    if (searchedMenuItem == undefined) return c.text("User not found", 404);
    // Get data and update
    const res = await updatemenu_itemService(id, menu_item);
    // Return a success message
    if (!res) return c.text("User not updated", 404);
    return c.json({ msg: res }, 201);
}

// Deleting menu_item
export const deletemenu_item = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search user
        const menu_item = await getmenu_itemService(id);
        if (menu_item == undefined) return c.text("User not found", 404);
        // Delete user
        const res = await deletemenu_itemService(id);
        if (!res) return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
