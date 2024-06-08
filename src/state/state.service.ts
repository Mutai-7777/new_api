import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIstate, TSstate } from '../drizzle/schema';
import { stateTable } from '../drizzle/schema';

export const stateService = async (): Promise<TSstate[] | null> => {
    return await db.query.stateTable.findMany();
}

export const getstateService = async (id: number): Promise<TIstate | undefined> => {
    return await db.query.stateTable.findFirst({
        where: eq(stateTable.id, id)
    });
}

// Creating a new state
export const createstateService = async (state: TIstate) => {
    await db.insert(stateTable).values(state);
    return { msg: "State created successfully" };
}

// Updating states
export const updatestateService = async (id: number, state: TIstate) => {
    await db.update(stateTable).set(state).where(eq(stateTable.id, id));
    return { msg: "State updated successfully" };
}

// Deleting states
export const deletestateService = async (id: number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id));
    return { msg: "State deleted successfully" };
}
