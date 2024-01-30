import database from "../utils/database";
export const getAllTodoSQL = async() => {
    const [products] = await database.execute("select * from todo");
    return products
};

export const addTodoSQL = async (name:string) => {
     try {
        const [result]= await database.execute("insert into todo (name) values (?)",[name])
        return result
    } catch (error) {
        console.log("error",error)
    }
}

export const updateTodoSQL = async (status:number,id:number) =>{
    try {
        const [result]= await database.execute("update todo set status = ? where id = ?", [status,id])
        return result
    } catch (error) {
        console.log("error",error)
    }
}

export const deleteTodoSQL = async  (id:number) => {
    try {
        const [result] = await database.execute("delete from todo  where id = ? ",[id])
        return result
    } catch (error) {
        console.log(error)
    }
}