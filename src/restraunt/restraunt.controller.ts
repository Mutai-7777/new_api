import { Context} from "hono"
import { restrauntService,getrestrauntService,updaterestrauntService,createrestrauntService,deleterestrauntService} from "./restraunt.service"


export const listrestraunt= async ( c: Context) => { ``
  const data = await restrauntService();
  if (data == null || data.length==0) {
    return c.text("hello Ian user not found",404)

  }

  return c.json(data,200);
}

//getting restraunt
export const getrestraunt = async ( c: Context) => {
  const id = parseInt(c.req.param("id"));
  if(isNaN(id)) return c.text("Invalid ID",400) 

  const restraunt = await getrestrauntService(id);
  if (restraunt == undefined) {
    return c.text("user noot found",404);
}
return c.json(restraunt,200);
}

//creating restraunt
export const createrestraunt = async ( c: Context) => {
  try {
    const restraunt = await c.req.json();
    const createdrestraunt = await createrestrauntService(restraunt);
    if (!createdrestraunt) return c.text("User not created",404);
    
    return c.json(createdrestraunt,201);
  }
  catch (error:any) {
    return c.json({error:error?.message},400)
  }
}

//updating restraunt
export const updaterestraunt = async(c:Context) => {
      const id = Number(c.req.param("id"));
      const restraunt = await c.req.json();
      //search user
      const searchedrestraunt = await getrestrauntService(id);
      if ( searchedrestraunt == undefined ) return c.text("User not found",404);

      //get data and update
      const res = await updaterestrauntService(id,restraunt);

      //return a success message
      if (!res) return c.text("User not updated",404);
      return c.json({msg:res},201);
}

//deleting user
export const deleterestraunt = async(c:Context) => {
      const id = Number(c.req.param("id"));
      if (isNaN(id)) return c.text("invalid Id",400);
      try{
      //search user
      const restraunt = await getrestrauntService(id);
      if ( restraunt == undefined ) return c.text("User not found",404);
      //delete user
      const res = await deleterestrauntService(id);
      if (!res) return c.text("User not deleted",404);
      return c.json({msg:res},201);
      }
      catch (error:any) {
        return c.json({error:error?.message},400)
      }
}
