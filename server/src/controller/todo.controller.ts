import express, { Request, Response } from "express";
import {
    getAllTodoSQL,
    addTodoSQL,
    deleteTodoSQL,
    updateTodoSQL,
} from "../service/todo.service";

export const getAllTodos = async (req: Request, res: Response) => {
    try {
        const result = await getAllTodoSQL();
        res.status(200).json(result);
    } catch (error) {
        console.log("error", error);
    }
};

export const addTodo = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const result = await addTodoSQL(name);
        const todo = await getAllTodoSQL();
        res.status(200).json(todo);
    } catch (error) {
        console.log(error);
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    // const newStatus = status == "true" ? 0 : 1;
    // console.log(status)
    // console.log(newStatus)
    const result = await updateTodoSQL(Number(status), Number(id));
    const todo = await getAllTodoSQL();
    res.status(200).json({
        todo,
        message: "sua thanh cong",
    });
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await deleteTodoSQL(Number(id));
    const todo = await getAllTodoSQL();
    res.status(200).json({
        todo,
        message: "xoa thanh cong",
    });
};
