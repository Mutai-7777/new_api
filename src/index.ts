import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import {logger} from 'hono/logger'
import {csrf} from 'hono/csrf'
import {trimTrailingSlash} from 'hono/trailing-slash'
import { timeout} from 'hono/timeout'
import { userRouter } from './users/user.router'
import { restrauntRouter } from './restraunt/restraunt.router'
import { addressRouter } from './address/address.router'
import {categoryRouter} from './category/category.router'
import { cityRouter } from './city/city.router'
import { commentRouter } from './comment/comment.router'
import { driverRouter } from './driver/driver.router'
import { menu_itemRouter } from './menu_item/menu_item.router'
import { orderMenuItemRouter } from './order_menu_item/order_menu_item.router'
import { OrderStatusRouter } from './order_status/order_status.router'
import { stateRouter } from './state/state.router'
import { statusCatalogRouter } from './status_catalog/status_catalog.router'
import { ordersRouter } from './orders/orders.router'
import { restrauntownerRouter } from './restraunt_owner/restraunt_owner.router'
import { orderMenuItemTable, stateTable } from './drizzle/schema'



const app = new Hono()

///  in built middleware     
app.use(logger())     //----time counter
app.use(csrf())      //----csrf protection
app.use(trimTrailingSlash())  //----remove trailing slash
app.use('/api/time',timeout(5000))


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/time', (c) => {
    setTimeout(()=> {
    console.log("data after 5 seconds")
  },5000 )
  return c.text("return data after 5 seconds")
})

app.get('/ok', (c) => {
  return c.text('Hello Hono Iam here and server is running')
})

//this is for custom route 
app.route('/',userRouter)  //user
app.route('/',restrauntRouter) // restraunt
 app.route('/',orderMenuItemRouter) // order_menu_itemRouter
 app.route('/',OrderStatusRouter) 
 app.route('/',ordersRouter) 
 app.route('/',restrauntownerRouter) 
 app.route('/',stateRouter) 
 app.route('/',statusCatalogRouter) 
 app.route('/',addressRouter) 
 app.route('/',categoryRouter) 
 app.route('/',cityRouter) 
 app.route('/',commentRouter) 
 app.route('/',driverRouter) 
 app.route('/',menu_itemRouter) 




console.log(`Server is running on port ${process.env.PORT}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)|| 3000
})



