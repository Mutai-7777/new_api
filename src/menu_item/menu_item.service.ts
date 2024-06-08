import db from '../drizzle/db';
import {eq} from "drizzle-orm";
import { TImenu_item, TSmenu_item } from '../drizzle/schema';
import { menu_itemTable } from '../drizzle/schema';

export const menu_itemService = async (): Promise<TSmenu_item[] | null> => {
    return await db.query.menu_itemTable.findMany();
}

export const getmenu_itemService = async (id: number): Promise<TImenu_item | undefined> => {
    return await db.query.menu_itemTable.findFirst({
        where: eq(menu_itemTable.id, id)
    });
}

// Creating a new user
export const createmenu_itemService = async (menu_item: TImenu_item) => {
    await db.insert(menu_itemTable).values(menu_item);
    return { msg: "User created successfully" };
}

// Updating users
export const updatemenu_itemService = async (id: number, menu_item: TImenu_item) => {
    await db.update(menu_itemTable).set(menu_item).where(eq(menu_itemTable.id, id));
    return { msg: "User updated successfully" };
}

// Deleting users
export const deletemenu_itemService = async (id: number) => {
    await db.delete(menu_itemTable).where(eq(menu_itemTable.id, id));
    return { msg: "User deleted successfully" };
}
