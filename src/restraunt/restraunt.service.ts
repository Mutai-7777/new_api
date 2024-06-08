import db from '../drizzle/db';
import {eq} from "drizzle-orm";
import { TIRestraunt,TSRestraunt } from '../drizzle/schema';
import { RestrauntTable } from '../drizzle/schema';


 export const restrauntService =  async ():Promise<TSRestraunt[] | null> => {
   return await db.query.RestrauntTable.findMany();

 }
 export const getrestrauntService = async (id: number): Promise<TIRestraunt | undefined> => {
   return await db.query.RestrauntTable.findFirst({
      where : eq(RestrauntTable.id, id)
   })
 }

 //creating a new user
 export const createrestrauntService = async (restraunt: TIRestraunt)  => {
       await db.insert(RestrauntTable).values(restraunt)
    return { msg:"User created successfully"}
 }


 //updating users
 export const updaterestrauntService = async (id: number, restraunt: TIRestraunt) => {
     await db.update(RestrauntTable).set(restraunt).where(eq(RestrauntTable.id, id))
    return { msg:"User updated successfully"}
 }

 //deleting users
 export const deleterestrauntService = async (id: number) => {
     await db.delete(RestrauntTable).where(eq(RestrauntTable.id, id))
    return { msg:"User deleted successfully"}
 }