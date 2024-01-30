import express from "express"
import { addTodo, deleteTodo, getAllTodos, updateTodo } from "../controller/todo.controller"
const todoRoutes = express.Router()
todoRoutes.get("/",getAllTodos )
todoRoutes.post("/",addTodo)
todoRoutes.put("/:id",updateTodo)
todoRoutes.delete("/:id",deleteTodo)

export default todoRoutes