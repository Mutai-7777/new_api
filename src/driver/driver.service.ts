import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIdriver, TSdriver } from '../drizzle/schema';
import { driverTable } from '../drizzle/schema';

export const driverService = async (): Promise<TSdriver[] | null> => {
    return await db.query.driverTable.findMany();
}

export const getdriverService = async (id: number): Promise<TIdriver | undefined> => {
    return await db.query.driverTable.findFirst({
        where: eq(driverTable.id, id)
    });
}

// Creating a new driver
export const createdriverService = async (driver: TIdriver) => {
    await db.insert(driverTable).values(driver);
    return { msg: "Driver created successfully" };
}

// Updating drivers
export const updatedriverService = async (id: number, driver: TIdriver) => {
    await db.update(driverTable).set(driver).where(eq(driverTable.id, id));
    return { msg: "Driver updated successfully" };
}

// Deleting drivers
export const deletedriverService = async (id: number) => {
    await db.delete(driverTable).where(eq(driverTable.id, id));
    return { msg: "Driver deleted successfully" };
}
