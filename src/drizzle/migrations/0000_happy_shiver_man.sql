CREATE TABLE IF NOT EXISTS "Order" (
	"id" serial PRIMARY KEY NOT NULL,
	"delivey_estimated" text NOT NULL,
	"actual_delivery_time" text NOT NULL,
	"delivery_address_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"driver_id" integer NOT NULL,
	"price" integer NOT NULL,
	"discount" integer NOT NULL,
	"final_price" integer NOT NULL,
	"comment" text NOT NULL,
	"resrtraunt_Id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restraunt" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"street_address" varchar(100) NOT NULL,
	"zip_code" varchar(300) NOT NULL,
	"city_id" integer NOT NULL,
	"menu_item" text NOT NULL,
	"orders" text NOT NULL,
	"city" text NOT NULL,
	"restraunt_owner" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"password" text NOT NULL,
	"contact_phone" text NOT NULL,
	"phone_number" boolean NOT NULL,
	"confirmation_code" text,
	"restraunt_owner" text NOT NULL,
	"address" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_adddress_1" text NOT NULL,
	"street_adddress_2" text,
	"zip_code" text NOT NULL,
	"delivery_instructions" text,
	"city_id" integer NOT NULL,
	"user" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"menu_item" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "citytable" (
	"id" integer NOT NULL,
	"name" text NOT NULL,
	"state" text NOT NULL,
	"address" text NOT NULL,
	"restraunt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "driver" (
	"id" serial PRIMARY KEY NOT NULL,
	"make" text NOT NULL,
	"model" text NOT NULL,
	"year" integer NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"restraunt_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	"description" text NOT NULL,
	"ingredients" text NOT NULL,
	"price" integer NOT NULL,
	"active" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"menu_item_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"status_catalog_id" integer NOT NULL,
	"created_at" integer NOT NULL,
	"order" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restrauntowner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restrauntowner_id" integer NOT NULL,
	"owner_id" integer NOT NULL,
	"users" text NOT NULL,
	"restraunt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "state" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"city" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status_catalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_delivery_address_id_address_id_fk" FOREIGN KEY ("delivery_address_id") REFERENCES "public"."address"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_driver_id_driver_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."driver"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Order" ADD CONSTRAINT "Order_resrtraunt_Id_restraunt_id_fk" FOREIGN KEY ("resrtraunt_Id") REFERENCES "public"."restraunt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restraunt" ADD CONSTRAINT "restraunt_city_id_citytable_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."citytable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_city_id_citytable_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."citytable"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "citytable" ADD CONSTRAINT "citytable_state_state_id_fk" FOREIGN KEY ("state") REFERENCES "public"."state"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_order_id_Order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "driver" ADD CONSTRAINT "driver_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Menu_item" ADD CONSTRAINT "Menu_item_restraunt_id_restraunt_id_fk" FOREIGN KEY ("restraunt_id") REFERENCES "public"."restraunt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Menu_item" ADD CONSTRAINT "Menu_item_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_order_id_Order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_menu_item_id_Menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."Menu_item"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_order_id_Order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."Order"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_status_catalog_id_status_catalog_id_fk" FOREIGN KEY ("status_catalog_id") REFERENCES "public"."status_catalog"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restrauntowner" ADD CONSTRAINT "restrauntowner_restrauntowner_id_restraunt_id_fk" FOREIGN KEY ("restrauntowner_id") REFERENCES "public"."restraunt"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restrauntowner" ADD CONSTRAINT "restrauntowner_owner_id_Users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
