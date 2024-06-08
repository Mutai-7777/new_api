import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIOrders, TSOrders } from '../drizzle/schema';
import { OrdersTable } from '../drizzle/schema';

export const OrdersService = async (): Promise<TSOrders[] | null> => {
    return await db.query.OrdersTable.findMany();
}

export const getOrdersService = async (id: number): Promise<TIOrders | undefined> => {
    return await db.query.OrdersTable.findFirst({
        where: eq(OrdersTable.id, id)
    });
}

// Creating a new Orders
export const createOrdersService = async (Orders: TIOrders) => {
    await db.insert(OrdersTable).values(Orders);
    return { msg: "Orders created successfully" };
}

// Updating Orders
export const updateOrdersService = async (id: number, Orders: TIOrders) => {
    await db.update(OrdersTable).set(Orders).where(eq(OrdersTable.id, id));
    return { msg: "Orders updated successfully" };
}

// Deleting Orders
export const deleteOrdersService = async (id: number) => {
    await db.delete(OrdersTable).where(eq(OrdersTable.id, id));
    return { msg: "Orders deleted successfully" };
}
