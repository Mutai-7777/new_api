
import "dotenv/config";
import{drizzle} from "drizzle-orm/node-postgres";
import{Client} from "pg";
import * as schema from "./schema";



export const client = new Client({
 connectionString: process.env.Database_URL as string,
})


const main = async () => {
 await client.connect();
 
}

main().catch((err)=> console.log(err));

const db = drizzle(client, { schema,logger:true});
export default db;