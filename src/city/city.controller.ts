import { Context } from "hono"
import { cityService, getcityService, updatecityService, createcityService, deletecityService } from "./city.service"

export const listcity= async ( c: Context) => { ``
  const data = await cityService();
  if (data == null || data.length==0) {
    return c.text("hello Ian user not found",404)

  }

  return c.json(data,200);
}

//getting city
export const getcity = async ( c: Context) => {
  const id = parseInt(c.req.param("id"));
  if(isNaN(id)) return c.text("Invalid ID",400) 

  const city = await getcityService(id);
  if (city == undefined) {
    return c.text("user noot found",404);
}
return c.json(city,200);
}

//creating city
export const createcity = async ( c: Context) => {
  try {
    const  city= await c.req.json();
    const createdcity = await createcityService(city);
    if (!createdcity) return c.text("User not created",404);
    
    return c.json(createdcity,201);
  }
  catch (error:any) {
    return c.json({error:error?.message},400)
  }
}

//updating city
export const updatecity = async(c:Context) => {
      const id = Number(c.req.param("id"));
      const city = await c.req.json();
      //search user
      const searchedcity = await getcityService(id);
      if ( searchedcity == undefined ) return c.text("User not found",404);

      //get data and update
      const res = await updatecityService(id,city);

      //return a success message
      if (!res) return c.text("User not updated",404);
      return c.json({msg:res},201);
}

//deleting user
export const deletecity = async(c:Context) => {
      const id = Number(c.req.param("id"));
      if (isNaN(id)) return c.text("invalid Id",400);
      try{
      //search user
      const restraunt = await getcityService(id);
      if ( restraunt == undefined ) return c.text("User not found",404);
      //delete user
      const res = await deletecityService(id);
      if (!res) return c.text("User not deleted",404);
      return c.json({msg:res},201);
      }
      catch (error:any) {
        return c.json({error:error?.message},400)
      }
}
