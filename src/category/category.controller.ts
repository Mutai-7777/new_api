import { Context} from "hono"
import { categoryService,getcategoryService,updatecategoryService,createcategoryService,deletecategoryService} from "./category.service"


export const listcategory= async ( c: Context) => { ``
  const data = await categoryService();
  if (data == null || data.length==0) {
    return c.text("hello Ian user not found",404)

  }

  return c.json(data,200);
}

//getting restraunt
export const getcategory = async ( c: Context) => {
  const id = parseInt(c.req.param("id"));
  if(isNaN(id)) return c.text("Invalid ID",400) 

  const category = await getcategoryService(id);
  if (category == undefined) {
    return c.text("user noot found",404);
}
return c.json(category,200);
}

//creating restraunt
export const createcategory = async ( c: Context) => {
  try {
    const  category= await c.req.json();
    const createdcategory = await createcategoryService(category);
    if (!createdcategory) return c.text("User not created",404);
    
    return c.json(createdcategory,201);
  }
  catch (error:any) {
    return c.json({error:error?.message},400)
  }
}

//updating restraunt
export const updatecategory = async(c:Context) => {
      const id = Number(c.req.param("id"));
      const category = await c.req.json();
      //search user
      const searchedcategory = await getcategoryService(id);
      if ( searchedcategory == undefined ) return c.text("User not found",404);

      //get data and update
      const res = await updatecategoryService(id,category);

      //return a success message
      if (!res) return c.text("User not updated",404);
      return c.json({msg:res},201);
}

//deleting user
export const deletecategory = async(c:Context) => {
      const id = Number(c.req.param("id"));
      if (isNaN(id)) return c.text("invalid Id",400);
      try{
      //search user
      const restraunt = await getcategoryService(id);
      if ( restraunt == undefined ) return c.text("User not found",404);
      //delete user
      const res = await deletecategoryService(id);
      if (!res) return c.text("User not deleted",404);
      return c.json({msg:res},201);
      }
      catch (error:any) {
        return c.json({error:error?.message},400)
      }
}
