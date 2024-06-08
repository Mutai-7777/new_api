import {pgTable,serial,text,PgDate,varchar,boolean,integer,primaryKey} from "drizzle-orm/pg-core";
import{relations} from "drizzle-orm";
import { decimal } from "drizzle-orm/mysql-core";

  export const RestrauntTable = pgTable("restraunt",{

    id:serial("id").primaryKey(),
    name:text("name").notNull(),
    street_address:varchar("street_address", {length:100}).notNull(),
    zip_code: varchar("zip_code", {length:300}).notNull(),
    city_id: integer("city_id").notNull().references(()=> cityTable.id,{onDelete:"cascade"}),
    menu_item:text("menu_item").notNull(),
    orders: text("orders").notNull(),
    city: text("city").notNull(),
    restraunt_owner: text("restraunt_owner").notNull(),
    
  });
                 //1-many restraunt to restraunt owner
                 export const restrauntRelations = relations(RestrauntTable,({one,many}) => ({
                    address : one(restrauntownerTable,{
                        fields: [RestrauntTable.id],
                        references: [restrauntownerTable.id]
                    })
                }))

    



  //menu table

    export const menu_itemTable = pgTable("Menu_item",{
        id:serial("id").primaryKey(),
        name: varchar("name", {length:256}).notNull(),
        restraunt_id:integer("restraunt_id").notNull().references(()=> RestrauntTable.id,{ onDelete:"cascade"}),
        category_id:integer("category_id").notNull().references(()=> categoryTable.id,{ onDelete:"cascade"}),
        description: text("description").notNull(),
        ingredients: text("ingredients").notNull(),
        price: integer("price").notNull(),
        active: boolean("active").notNull(),

    });

    //relationship between restraunt table and menu table

    export const UsersRelations = relations(RestrauntTable,({one})=>({
        menu_item:one(menu_itemTable,{
            fields: [RestrauntTable.id],
            references: [menu_itemTable.restraunt_id]

        })
    }))

    

//Order table
 export const  OrdersTable = pgTable("Order",{
    id :serial("id").primaryKey(),
    estimated_delivery_time: text("delivey_estimated").notNull(),
    actual_delivery_time: text("actual_delivery_time").notNull(),
    delivery_address_id: integer("delivery_address_id").notNull().references(()=> addressTable.id,{ onDelete:"cascade"}),
    user_id: integer("user_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),
    driver_id: integer("driver_id").notNull().references(()=> driverTable.id,{ onDelete:"cascade"}),
    price: integer("price").notNull(),
    discount: integer("discount").notNull(),
    final_price: integer("final_price").notNull(),
    comment: text("comment").notNull(),
    restraunt_id: integer("resrtraunt_Id").notNull().references(() => RestrauntTable.id,{onDelete:"cascade"})   
 })

 //city table

 export const cityTable = pgTable("citytable",{
    id :serial("id").primaryKey(),
    city_id : integer("id").notNull(),
    name : text("name").notNull(),
    state_id : integer("state").notNull().references(()=> stateTable.id,{ onDelete:"cascade"}),
    address: text("address").notNull(),
    state: text("state").notNull(),
    restraunt: text("restraunt").notNull()

 })
                                      //1-many city to address
                                      export const cityRelations = relations(cityTable,({one,many}) => ({
                                          address : one(stateTable,{
                                              fields: [cityTable.id],
                                              references: [stateTable.id]
                                          })
                                      }))


 //state table
 export const stateTable= pgTable("state",{
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    code: text("code").notNull(),
    city: text("city").notNull()

 })
                                    //1-many/////////////////
                                        export const stateRelations = relations(stateTable,({one,many}) => ({
                                        city : one(cityTable,{
                                       fields: [stateTable.id],
                                       references: [cityTable.state_id]
                                         })
                                       }))

  //address table
 export const addressTable= pgTable("address",{
    id : serial("id").primaryKey(),
    street_adddress_1: text("street_adddress_1").notNull(),
    street_adddress_2: text("street_adddress_2"),
    zip_code: text("zip_code").notNull(),
    delivery_instructions: text("delivery_instructions"),
    city_id: integer("city_id").notNull().references(()=> cityTable.id,{ onDelete:"cascade"}),
    user_id: text("user")
 })
                                     //1-many address to orderstable
                                     export const addressRelations = relations(addressTable,({one,many}) => ({
                                     orders : one(OrdersTable,{
                                     fields: [addressTable.id],
                                     references: [OrdersTable.id]
                                     })
                                     }))
                                      //1-many address to 
                                      export const addressRelationss = relations(addressTable,({one,many}) => ({
                                        orders : one(cityTable,{
                                        fields: [addressTable.id],
                                        references: [cityTable.id]
                                        })
                                        }))


 //restraunt owner table
 export const restrauntownerTable = pgTable("restrauntowner",{
    id : serial("id").primaryKey(),
    restraunt_id : integer("restrauntowner_id").notNull().references(() => RestrauntTable.id,{onDelete:"cascade"}),
    owner_id: integer("owner_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),
    users: text("users").notNull(),
    restraunt: text("restraunt").notNull()

 })

 //users table

 export const UsersTable = pgTable("Users",{
    id : serial("id").primaryKey(),
    name : text("name").notNull(),
    email: text("email").notNull(),
    email_verified : boolean("email_verified").notNull(),
    password: text("password").notNull(),
    contact_phone: text("contact_phone").notNull(),
    phone_verified: boolean("phone_number").notNull(),
    confirmation_code: text("confirmation_code"),
    restraunt_owner: text("restraunt_owner").notNull(),
    address: text("address").notNull(),
    
 })
                                         // 1-many relationship from users to comments
                                         export const usersRelations = relations(UsersTable,({one,many}) => ({
                                            orders : one(commentTable,{
                                            fields: [UsersTable.id],
                                            references: [commentTable.id]
                                            })
                                            }))
                                         

 // driver table
 export const driverTable = pgTable("driver",{
    id : serial("id").primaryKey(),
    car_make: text("make").notNull(),
    car_model: text("model").notNull(),
    car_year: integer("year").notNull(),
    user_id: integer("user_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),

    
 })
    //comments table
    export const commentTable = pgTable("comments",{
        id : serial("id").primaryKey(),
        order_id : integer("order_id").notNull().references(()=> OrdersTable.id,{ onDelete:"cascade"}),
        user_id : integer("user_id").notNull().references(()=> UsersTable.id,{ onDelete:"cascade"}),
        comment_text : text("text").notNull()
        
    })

    //category table
    
    export const categoryTable = pgTable("category",{
        id : serial("id").primaryKey(),
        name : text("name").notNull(),
        menu_item: text("menu_item").notNull()
    
    })

    // order menu item table
    export const orderMenuItemTable = pgTable("order_menu_item",{
        id : serial("id").primaryKey(),
        order_id : integer("order_id").notNull().references(()=> OrdersTable.id,{ onDelete:"cascade"}),
        menu_item_id : integer("menu_item_id").notNull().references(()=> menu_itemTable.id,{ onDelete:"cascade"}),
        quantity: integer("quantity").notNull(),
        item_price: integer("price").notNull()
        

    })

    //order status table
    export const OrderStatusTable = pgTable("order_status",{
        id : serial("id").primaryKey(),
        order_id : integer("order_id").notNull().references(()=> OrdersTable.id,{ onDelete:"cascade"}),
        status_catalog_id : integer("status_catalog_id").notNull().references(()=> statusCatalogTable.id,{ onDelete:"cascade"}),
        created_at : integer("created_at").notNull(),
        order: text("order").notNull()
    })


    //status catalog table
    export const statusCatalogTable = pgTable("status_catalog",{
        id : serial("id").primaryKey(),
        name : text("name").notNull(),
        order_status : text("description").notNull()
    })
        





     export type TIRestraunt = typeof RestrauntTable.$inferInsert;
     export type TSRestraunt = typeof RestrauntTable.$inferSelect;
    export type TIProfile = typeof menu_itemTable.$inferInsert;
    export type TSProfile = typeof menu_itemTable.$inferSelect;
    export type TIUser = typeof UsersTable.$inferInsert;
    export type TSUser = typeof UsersTable.$inferSelect;
    export type TIaddress = typeof addressTable.$inferInsert;
    export type TSaddress = typeof addressTable.$inferSelect;
    export type TIcategory = typeof categoryTable.$inferInsert;
    export type TScategory = typeof categoryTable.$inferSelect;
    export type TIcity = typeof cityTable.$inferInsert;
    export type TScity = typeof cityTable.$inferSelect;
    export type TIcomment = typeof commentTable.$inferInsert;
    export type TScomment = typeof commentTable.$inferSelect;
    export type TIdriver = typeof driverTable.$inferInsert;
    export type TSdriver = typeof driverTable.$inferSelect;
    export type TImenu_item = typeof menu_itemTable.$inferInsert;
    export type TSmenu_item = typeof menu_itemTable.$inferSelect;
    export type TIorderMenuItem = typeof orderMenuItemTable.$inferInsert;
    export type TSorderMenuItem = typeof orderMenuItemTable.$inferSelect;
    export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
    export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;
    export type TIOrders = typeof OrdersTable.$inferInsert;
    export type TSOrders = typeof OrdersTable.$inferSelect;
    export type TIrestrauntowner = typeof restrauntownerTable.$inferInsert;
    export type TSrestrauntowner = typeof restrauntownerTable.$inferSelect;
    export type TIstate = typeof stateTable.$inferInsert;
    export type TSstate = typeof stateTable.$inferSelect;
    export type TIstatusCatalog = typeof statusCatalogTable.$inferInsert;
    export type TSstatusCatalog = typeof statusCatalogTable.$inferSelect;

   

    
