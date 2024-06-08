import { Hono } from "hono";
import { Context } from "hono";
import { listrestraunt,getrestraunt,createrestraunt, updaterestraunt, deleterestraunt} from "./restraunt.controller";
import {zValidator} from "@hono/zod-validator";
import { restrauntSchema } from "../validators.";

export const restrauntRouter = new Hono();


//get all restraunts
restrauntRouter.get("/restraunts",listrestraunt);
//get a single restraunt
restrauntRouter.get("/restraunts/:id", getrestraunt);
//create a user
restrauntRouter.post("/restraunts",zValidator('json',restrauntSchema, (result,c)=>{
    if (!result.success) {
        return c.json(result.error,400)
    }
  }),createrestraunt);
  
  //update a user
  restrauntRouter.put("/restraunts/:id", updaterestraunt); 


restrauntRouter.get("/restraunts", zValidator('json',restrauntSchema,(result,c)=>{
  if (!result.success){
    return c.json(result.error,400)
  }
}),createrestraunt);

//delete user
restrauntRouter.delete("/restraunts/:id", deleterestraunt)

restrauntRouter.get("/restraunts", getrestraunt);
