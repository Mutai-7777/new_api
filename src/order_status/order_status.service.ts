import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIOrderStatus, TSOrderStatus } from '../drizzle/schema';
import { OrderStatusTable } from '../drizzle/schema';

export const OrderStatusService = async (): Promise<TSOrderStatus[] | null> => {
  return await db.query.OrderStatusTable.findMany();
}

export const getOrderStatusService = async (id: number): Promise<TIOrderStatus | undefined> => {
  return await db.query.OrderStatusTable.findFirst({
    where: eq(OrderStatusTable.id, id)
  });
}

// Creating a new order status
export const createOrderStatusService = async (orderStatus: TIOrderStatus) => {
  await db.insert(OrderStatusTable).values(orderStatus);
  return { msg: "Order status created successfully" };
}

// Updating order statuses
export const updateOrderStatusService = async (id: number, orderStatus: TIOrderStatus) => {
  await db.update(OrderStatusTable).set(orderStatus).where(eq(OrderStatusTable.id, id));
  return { msg: "Order status updated successfully" };
}

// Deleting order statuses
export const deleteOrderStatusService = async (id: number) => {
  await db.delete(OrderStatusTable).where(eq(OrderStatusTable.id, id));
  return { msg: "Order status deleted successfully" };
}
