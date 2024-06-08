import { Context } from "hono";
import { OrdersService, getOrdersService, updateOrdersService, createOrdersService, deleteOrdersService } from "./orders.service";

export const listOrders = async (c: Context) => {
    const data = await OrdersService();
    if (data == null || data.length == 0) {
        return c.text("hello Ian user not found", 404);
    }
    return c.json(data, 200);
}

// Getting Orders
export const getOrders = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const orders = await getOrdersService(id);
    if (orders == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(orders, 200);
}

// Creating Orders
export const createOrders = async (c: Context) => {
    try {
        const orders = await c.req.json();
        const createdOrders = await createOrdersService(orders);
        if (!createdOrders) return c.text("User not created", 404);
        return c.json(createdOrders, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Updating Orders
export const updateOrders = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const orders = await c.req.json();
    // Search user
    const searchedOrders = await getOrdersService(id);
    if (searchedOrders == undefined) return c.text("User not found", 404);
    // Get data and update
    const res = await updateOrdersService(id, orders);
    // Return a success message
    if (!res) return c.text("User not updated", 404);
    return c.json({ msg: res }, 201);
}

// Deleting Orders
export const deleteOrders = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search user
        const orders = await getOrdersService(id);
        if (orders == undefined) return c.text("User not found", 404);
        // Delete user
        const res = await deleteOrdersService(id);
        if (!res) return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
