import db from '../drizzle/db';
import { eq } from "drizzle-orm";
import { TIcomment, TScomment } from '../drizzle/schema';
import { commentTable } from '../drizzle/schema';

export const commentService = async (): Promise<TScomment[] | null> => {
    return await db.query.commentTable.findMany();
}

export const getcommentService = async (id: number): Promise<TIcomment | undefined> => {
    return await db.query.commentTable.findFirst({
        where: eq(commentTable.id, id)
    });
}

// Creating a new comment
export const createcommentService = async (comment: TIcomment) => {
    await db.insert(commentTable).values(comment);
    return { msg: "Comment created successfully" };
}

// Updating comments
export const updatecommentService = async (id: number, comment: TIcomment) => {
    await db.update(commentTable).set(comment).where(eq(commentTable.id, id));
    return { msg: "Comment updated successfully" };
}

// Deleting comments
export const deletecommentService = async (id: number) => {
    await db.delete(commentTable).where(eq(commentTable.id, id));
    return { msg: "Comment deleted successfully" };
}
