import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIorder_menu_item, TSorder_menu_item } from '../drizzle/schema';
import { orderMenuItemTable } from '../drizzle/schema';

export const orderMenuItemService = async (): Promise<TSorder_menu_item[] | null> => {
  return await db.query.orderMenuItemTable.findMany();
};

export const getOrderMenuItemService = async (id: number): Promise<TIorder_menu_item | undefined> => {
  return await db.query.orderMenuItemTable.findFirst({
    where: eq(orderMenuItemTable.id, id)
  });
};

// Creating a new order menu item
export const createOrderMenuItemService = async (orderMenuItem: TIorder_menu_item) => {
  await db.insert(orderMenuItemTable).values(orderMenuItem);
  return { msg: "Order menu item created successfully" };
};

// Updating order menu items
export const updateOrderMenuItemService = async (id: number, orderMenuItem: TIorder_menu_item) => {
  await db.update(orderMenuItemTable).set(orderMenuItem).where(eq(orderMenuItemTable.id, id));
  return { msg: "Order menu item updated successfully" };
};

// Deleting order menu items
export const deleteOrderMenuItemService = async (id: number) => {
  await db.delete(orderMenuItemTable).where(eq(orderMenuItemTable.id, id));
  return { msg: "Order menu item deleted successfully" };
};
