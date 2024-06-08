import db from '../drizzle/db';
import {eq} from "drizzle-orm";
import { TIaddress,TSaddress } from '../drizzle/schema';
import { addressTable } from '../drizzle/schema';


 export const addressService =  async ():Promise<TSaddress[] | null> => {
   return await db.query.addressTable.findMany();

 }
 export const getaddressService = async (id: number): Promise<TIaddress | undefined> => {
   return await db.query.addressTable.findFirst({
      where : eq(addressTable.id, id)
   })
 }

 //creating a new user
 export const createaddressService = async (address: TIaddress)  => {
       await db.insert(addressTable).values(address)
    return { msg:"User created successfully"}
 }


 //updating users
 export const updateaddressService = async (id: number, address: TIaddress) => {
     await db.update(addressTable).set(address).where(eq(addressTable.id, id))
    return { msg:"User updated successfully"}
 }

 //deleting users
 export const deleteaddressService = async (id: number) => {
     await db.delete(addressTable).where(eq(addressTable.id, id))
    return { msg:"User deleted successfully"}
 }