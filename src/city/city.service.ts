import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIcity, TScity } from '../drizzle/schema';
import { cityTable } from '../drizzle/schema';

export const cityService = async (): Promise<TScity[] | null> => {
    return await db.query.cityTable.findMany();
}

export const getcityService = async (id: number): Promise<TIcity | undefined> => {
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id)
    });
}

// Creating a new city
export const createcityService = async (city: TIcity) => {
    await db.insert(cityTable).values(city);
    return { msg: "City created successfully" };
}

// Updating cities
export const updatecityService = async (id: number, city: TIcity) => {
    await db.update(cityTable).set(city).where(eq(cityTable.id, id));
    return { msg: "City updated successfully" };
}

// Deleting cities
export const deletecityService = async (id: number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id));
    return { msg: "City deleted successfully" };
}
