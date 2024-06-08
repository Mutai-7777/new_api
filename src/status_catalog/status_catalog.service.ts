import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIstatusCatalog, TSstatusCatalog } from '../drizzle/schema';
import { statusCatalogTable } from '../drizzle/schema';

export const statusCatalogService = async (): Promise<TSstatusCatalog[] | null> => {
    return await db.query.statusCatalogTable.findMany();
}

export const getStatusCatalogService = async (id: number): Promise<TIstatusCatalog | undefined> => {
    return await db.query.statusCatalogTable.findFirst({
        where: eq(statusCatalogTable.id, id)
    });
}

// Creating a new statusCatalog
export const createStatusCatalogService = async (statusCatalog: TIstatusCatalog) => {
    await db.insert(statusCatalogTable).values(statusCatalog);
    return { msg: "StatusCatalog created successfully" };
}

// Updating statusCatalogs
export const updateStatusCatalogService = async (id: number, statusCatalog: TIstatusCatalog) => {
    await db.update(statusCatalogTable).set(statusCatalog).where(eq(statusCatalogTable.id, id));
    return { msg: "StatusCatalog updated successfully" };
}

// Deleting statusCatalogs
export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(statusCatalogTable).where(eq(statusCatalogTable.id, id));
    return { msg: "StatusCatalog deleted successfully" };
}
