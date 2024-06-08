import db from '../drizzle/db';
import {eq} from "drizzle-orm";
import { TIcategory,TScategory } from '../drizzle/schema';
import { categoryTable } from '../drizzle/schema';


 export const categoryService =  async ():Promise<TScategory[] | null> => {
   return await db.query.categoryTable.findMany();

 }
 export const getcategoryService = async (id: number): Promise<TIcategory | undefined> => {
   return await db.query.categoryTable.findFirst({
      where : eq(categoryTable.id, id)
   })
 }

 //creating a new user
 export const createcategoryService = async (category: TIcategory)  => {
       await db.insert(categoryTable).values(category)
    return { msg:"User created successfully"}
 }


 //updating users
 export const updatecategoryService = async (id: number, category: TIcategory) => {
     await db.update(categoryTable).set(category).where(eq(categoryTable.id, id))
    return { msg:"User updated successfully"}
 }

 //deleting users
 export const deletecategoryService = async (id: number) => {
     await db.delete(categoryTable).where(eq(categoryTable.id, id))
    return { msg:"User deleted successfully"}
 }