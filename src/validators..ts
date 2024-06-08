   import {z} from 'zod'
   

    export const userSchema = z.object({
        //id:z.number(),
        name:z.string(),
        email:z.string(),
        email_verified:z.boolean(),
        password:z.string(),
        contact_phone:z.string(),
        phone_verified:z.boolean(),
        confirmation_code:z.string(),
        restraunt_owner:z.string(),
        address:z.string()
         
    })

    export const restrauntSchema = z.object({
        name:z.string(),
        street_address:z.string(),
        zip_code:z.number(),
        city_id:z.number(),
        menu_item:z.string(),
        orders:z.number(),
        city:z.string(),
        restraunt_owner:z.string()

    })
    export const addressSchema = z.object({
        street_adddress_1:z.string(),
        street_adddress_2:z.string(),
        zip_code:z.string(),
        delivery_instructions:z.string(),
        city_id:z.number(),
        user_id:z.number()
    })
    export const categorySchema = z.object({
        name:z.string(),
        menu_item:z.string()

    })
    export const citySchema = z.object({
        city_id:z.number(),
        name:z.string(),
        state_id:z.number(),
        address:z.string(),
        state:z.string(),
        restraunt:z.string()
    })
    export const commentSchema = z.object({
        order_id:z.number(),
        user_id:z.number(),
        comment_text:z.string()

    })
    export const driverSchema = z.object({
        car_make:z.string(),
        car_model:z.string(),
        car_year:z.number(),
        user_id:z.number()
        
    })

    //menu_item
    export const menu_itemSchema = z.object({
        name:z.string(),
        restraunt_id:z.number(),
        category_id:z.number(),
        description:z.string(),
        ingredients:z.string(),
        price:z.number(),
        active:z.boolean()
        })
    //order_menu_item
    export const orderMenuItemSchema = z.object ({
        order_id:z.number(),
        menu_item_id:z.number(),
        quantity:z.number(),
        item_price:z.number()
 })

  // order_status
  export const OrderStatusSchema = z.object({
    order_id:z.number(),
    status_catalog_id:z.string(),
    created_at:z.number(),
    order:z.string()

  })

  //orders
  export const OrdersSchema = z.object({
    estimated_delivery_time:z.number(),
    actual_delivery_time:z.number(),
    delivery_address_id:z.number(),
    user_id:z.number(),
    driver_id:z.number(),
    price:z.number(),
    discount:z.number(),
    final_price:z.number(),
    comment:z.string(),
    restraunt_id:z.number()
})

 //restraunt_owner
 export const restrauntownerSchema = z.object ({
    restraunt_id:z.number(),
    owner_id:z.number(),
    users:z.string(),
    restraunt:z.string()
   
 })

 //state
 export const stateSchema = z.object ({
    name:z.string(),
    code:z.number(),
    city:z.string()
 })

 //status_catalog
 export const statusCatalogSchema = z.object ({
    name:z.string(),
    order_status:z.string()
 })



 