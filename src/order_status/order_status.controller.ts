import { Context } from "hono";
import {
  OrderStatusService,
  getOrderStatusService,
  updateOrderStatusService,
  createOrderStatusService,
  deleteOrderStatusService
} from "./order_status.service";

export const listOrderStatus = async (c: Context) => {
  const data = await OrderStatusService();
  if (data == null || data.length == 0) {
    return c.text("hello Ian user not found", 404);
  }

  return c.json(data, 200);
};

// Getting restaurant
export const getOrderStatus = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const orderStatus = await getOrderStatusService(id);
  if (orderStatus == undefined) {
    return c.text("user not found", 404);
  }
  return c.json(orderStatus, 200);
};

// Creating restaurant
export const createOrderStatus = async (c: Context) => {
  try {
    const orderStatus = await c.req.json();
    const createdOrderStatus = await createOrderStatusService(orderStatus);
    if (!createdOrderStatus) return c.text("User not created", 404);

    return c.json(createdOrderStatus, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

// Updating restaurant
export const updateOrderStatus = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const orderStatus = await c.req.json();
  // Search user
  const searchedOrderStatus = await getOrderStatusService(id);
  if (searchedOrderStatus == undefined) return c.text("User not found", 404);
  // Get data and update
  const res = await updateOrderStatusService(id, orderStatus);
  // Return a success message
  if (!res) return c.text("User not updated", 404);
  return c.json({ msg: res }, 201);
};

// Deleting user
export const deleteOrderStatus = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid Id", 400);
  try {
    // Search user
    const restaurant = await getOrderStatusService(id);
    if (restaurant == undefined) return c.text("User not found", 404);
    // Delete user
    const res = await deleteOrderStatusService(id);
    if (!res) return c.text("User not deleted", 404);
    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
