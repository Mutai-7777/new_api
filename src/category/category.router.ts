import { Hono } from "hono";
import { Context } from "hono";
import { listcategory,getcategory,createcategory, updatecategory, deletecategory} from "./category.controller";
import {zValidator} from "@hono/zod-validator";
import { categorySchema } from "../validators.";

export const categoryRouter = new Hono();


//get all restraunts
categoryRouter.get("/category",listcategory);
//get a single restraunt
categoryRouter.get("/category/:id", getcategory);
//create a user
categoryRouter.post("/category",zValidator('json',categorySchema, (result,c)=>{
    if (!result.success) {
        return c.json(result.error,400)
    }
  }),createcategory);
  
  //update a user
  categoryRouter.put("/category/:id", updatecategory); 


  categoryRouter.get("/category", zValidator('json',categorySchema,(result,c)=>{
  if (!result.success){
    return c.json(result.error,400)
  }
}),createcategory);

//delete user
categoryRouter.delete("/category/:id", deletecategory)

categoryRouter.get("/category", getcategory);

