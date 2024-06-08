  
  import {Context} from 'hono'
  import { usersService,getuserService,createUserService,updateUserService,deleteUserService } from './users.service';



  export const listUsers = async ( c: Context) => { ``
    const data = await usersService();
    if (data == null || data.length==0) {
      return c.text("hello Ian user not found",404)

    }

    return c.json(data,200);
  }


  //getting restraunts
  export const getUser = async ( c: Context) => {
    const id = parseInt(c.req.param("id"));
    if(isNaN(id)) return c.text("Invalid ID",400) 

    const user = await getuserService(id);
    if (user == undefined) {
      return c.text("user not found",404);
  }
  return c.json(user,200);
}

  //creating user
  export const createUser = async ( c: Context) => {
    try {
      const user = await c.req.json();
      const createdUser = await createUserService(user);
      console.log(createdUser)
      if (!createdUser) return c.text("User not created",404);
      
      return c.json(createdUser,201);
    }
    catch (error:any) {
      return c.json({error:error?.message},400)
    }
  }

  //updating user
  export const updateUser = async(c:Context) => {
        const id = Number(c.req.param("id"));
        const user = await c.req.json();
        //search user
        const searchedUser = await getuserService(id);
        if ( searchedUser == undefined ) return c.text("User not found",404);

        //get data and update
        const res = await updateUserService(id,user);

        //return a success message
        if (!res) return c.text("User not updated",404);
        return c.json({msg:res},201);
  }

  //deleting user
  export const deleteUser = async(c:Context) => {
        const id = Number(c.req.param("id"));
        if (isNaN(id)) return c.text("invalid Id",400);
        try{
        //search user
        const user = await getuserService(id);
        if ( user == undefined ) return c.text("User not found",404);
        //delete user
        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted",404);
        return c.json({msg:res},201);
        }
        catch (error:any) {
          return c.json({error:error?.message},400)
        }
  }