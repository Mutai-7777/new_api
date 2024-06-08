
import {eq} from "drizzle-orm";
 import db from "../drizzle/db";
 import { TIUser,TSUser, UsersTable } from "../drizzle/schema";


 export const usersService =  async (): Promise<TIUser[] |null> => {
    return await db.query.UsersTable.findMany();

 }

 export const getuserService = async (id: number): Promise<TIUser | undefined> => {
   return await db.query.UsersTable.findFirst({
      where : eq(UsersTable.id, id)
   })
 }

 //creating a new user
 export const createUserService = async (user: TIUser)  => {
       await db.insert(UsersTable).values(user)
    return { msg:"User created successfully"}
 }


 //updating users
 export const updateUserService = async (id: number, user: TIUser) => {
     await db.update(UsersTable).set(user).where(eq(UsersTable.id, id))
    return { msg:"User updated successfully"}
 }

 //deleting users
 export const deleteUserService = async (id: number) => {
     await db.delete(UsersTable).where(eq(UsersTable.id, id))
    return { msg:"User deleted successfully"}
 }
 