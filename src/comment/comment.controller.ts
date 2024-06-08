import { Context } from "hono";
import { commentService, getcommentService, updatecommentService, createcommentService, deletecommentService } from "./comment.service";

export const listcomment = async (c: Context) => {
    const data = await commentService();
    if (data == null || data.length == 0) {
        return c.text("hello Ian user not found", 404);
    }
    return c.json(data, 200);
}

// Getting comment
export const getcomment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const comment = await getcommentService(id);
    if (comment == undefined) {
        return c.text("user not found", 404);
    }
    return c.json(comment, 200);
}

// Creating comment
export const createcomment = async (c: Context) => {
    try {
        const comment = await c.req.json();
        const createdComment = await createcommentService(comment);
        if (!createdComment) return c.text("User not created", 404);
        return c.json(createdComment, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}

// Updating comment
export const updatecomment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    const comment = await c.req.json();
    // Search user
    const searchedComment = await getcommentService(id);
    if (searchedComment == undefined) return c.text("User not found", 404);
    // Get data and update
    const res = await updatecommentService(id, comment);
    // Return a success message
    if (!res) return c.text("User not updated", 404);
    return c.json({ msg: res }, 201);
}

// Deleting comment
export const deletecomment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    try {
        // Search user
        const comment = await getcommentService(id);
        if (comment == undefined) return c.text("User not found", 404);
        // Delete user
        const res = await deletecommentService(id);
        if (!res) return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
}
