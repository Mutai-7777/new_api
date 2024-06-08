import { Hono } from "hono";
import { Context } from "hono";
import { listOrderStatus, getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus } from "./order_status.controller";
import { zValidator } from "@hono/zod-validator";
import { OrderStatusSchema } from "../validators.";

export const OrderStatusRouter = new Hono();

// Get all order statuses
OrderStatusRouter.get("/OrderStatus", listOrderStatus);

// Get a single order status
OrderStatusRouter.get("/OrderStatus/:id", getOrderStatus);

//create a user
OrderStatusRouter.post("/OrderStatus",zValidator('json',OrderStatusSchema, (result,c)=>{
    if (!result.success) {
        return c.json(result.error,400)
    }
  }),createOrderStatus);
  
  //update a user
  OrderStatusRouter.put("/OrderStatus/:id", updateOrderStatus); 


  OrderStatusRouter.get("/OrderStatus", zValidator('json',OrderStatusSchema,(result,c)=>{
  if (!result.success){
    return c.json(result.error,400)
  }
}),createOrderStatus);



// Delete an order status
OrderStatusRouter.delete("/OrderStatus/:id", deleteOrderStatus);
