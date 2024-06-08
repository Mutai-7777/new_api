import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIrestrauntowner, TSrestrauntowner } from '../drizzle/schema';
import { restrauntownerTable } from '../drizzle/schema';

export const restrauntOwnerService = async (): Promise<TSrestrauntowner[] | null> => {
    return await db.query.restrauntownerTable.findMany();
}

export const getrestrauntOwnerService = async (id: number): Promise<TIrestrauntowner | undefined> => {
    return await db.query.restrauntownerTable.findFirst({
        where: eq(restrauntownerTable.id, id)
    });
}

// Creating a new restraunt owner
export const createrestrauntOwnerService = async (restrauntOwner: TIrestrauntowner) => {
    await db.insert(restrauntownerTable).values(restrauntOwner);
    return { msg: "Restraunt owner created successfully" };
}

// Updating restraunt owners
export const updaterestrauntOwnerService = async (id: number, restrauntOwner: TIrestrauntowner) => {
    await db.update(restrauntownerTable).set(restrauntOwner).where(eq(restrauntownerTable.id, id));
    return { msg: "Restraunt owner updated successfully" };
}

// Deleting restraunt owners
export const deleterestrauntOwnerService = async (id: number) => {
    await db.delete(restrauntownerTable).where(eq(restrauntownerTable.id, id));
    return { msg: "Restraunt owner deleted successfully" };
}
