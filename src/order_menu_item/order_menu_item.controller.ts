import { Context } from "hono";
import { orderMenuItemService, getOrderMenuItemService, updateOrderMenuItemService, createOrderMenuItemService, deleteOrderMenuItemService } from "./order_menu_item.service";

export const listOrderMenuItem = async (c: Context) => {
  const data = await orderMenuItemService();
  if (data == null || data.length == 0) {
    return c.text("hello Ian user not found", 404);
  }
  return c.json(data, 200);
};

export const getOrderMenuItem = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const orderMenuItem = await getOrderMenuItemService(id);
  if (orderMenuItem == undefined) {
    return c.text("user noot found", 404);
  }
  return c.json(orderMenuItem, 200);
};

export const createOrderMenuItem = async (c: Context) => {
  try {
    const orderMenuItem = await c.req.json();
    const createdOrderMenuItem = await createOrderMenuItemService(orderMenuItem);
    if (!createdOrderMenuItem) return c.text("User not created", 404);
    return c.json(createdOrderMenuItem, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateOrderMenuItem = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const orderMenuItem = await c.req.json();
  const searchedOrderMenuItem = await getOrderMenuItemService(id);
  if (searchedOrderMenuItem == undefined) return c.text("User not found", 404);
  const res = await updateOrderMenuItemService(id, orderMenuItem);
  if (!res) return c.text("User not updated", 404);
  return c.json({ msg: res }, 201);
};

export const deleteOrderMenuItem = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("invalid Id", 400);
  try {
    const orderMenuItem = await getOrderMenuItemService(id);
    if (orderMenuItem == undefined) return c.text("User not found", 404);
    const res = await deleteOrderMenuItemService(id);
    if (!res) return c.text("User not deleted", 404);
    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
