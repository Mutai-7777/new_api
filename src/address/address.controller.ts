import { Context} from "hono"
import { addressService,getaddressService,updateaddressService,createaddressService,deleteaddressService} from "./address.service"


export const listaddress= async ( c: Context) => { ``
  const data = await addressService();
  if (data == null || data.length==0) {
    return c.text("hello Ian user not found",404)

  }

  return c.json(data,200);
}

//getting restraunt
export const getaddress = async ( c: Context) => {
  const id = parseInt(c.req.param("id"));
  if(isNaN(id)) return c.text("Invalid ID",400) 

  const address = await getaddressService(id);
  if (address == undefined) {
    return c.text("user noot found",404);
}
return c.json(address,200);
}

//creating restraunt
export const createaddress = async ( c: Context) => {
  try {
    const address = await c.req.json();
    const createdaddress = await createaddressService(address);
    if (!createdaddress) return c.text("User not created",404);
    
    return c.json(createdaddress,201);
  }
  catch (error:any) {
    return c.json({error:error?.message},400)
  }
}

//updating restraunt
export const updateaddress = async(c:Context) => {
      const id = Number(c.req.param("id"));
      const address = await c.req.json();
      //search user
      const searchedrestraunt = await getaddressService(id);
      if ( searchedrestraunt == undefined ) return c.text("User not found",404);

      //get data and update
      const res = await updateaddressService(id,address);

      //return a success message
      if (!res) return c.text("User not updated",404);
      return c.json({msg:res},201);
}

//deleting user
export const deleteaddress = async(c:Context) => {
      const id = Number(c.req.param("id"));
      if (isNaN(id)) return c.text("invalid Id",400);
      try{
      //search user
      const address = await getaddressService(id);
      if ( address == undefined ) return c.text("User not found",404);
      //delete user
      const res = await deleteaddressService(id);
      if (!res) return c.text("User not deleted",404);
      return c.json({msg:res},201);
      }
      catch (error:any) {
        return c.json({error:error?.message},400)
      }
}
