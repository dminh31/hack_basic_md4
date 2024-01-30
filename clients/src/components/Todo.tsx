import React, { ChangeEvent, useEffect, useState } from 'react'
import publicAxios from '../config/publicAxios'

export default function Todo() {
    const [newTodo, setNewTodo] = useState({
        name: ""
    })
    const [data, setData] = useState([])
    const handleGetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value })
    }

    const handleAdd = async () => {

        const res = await publicAxios.post("/api/v1/todo", { ...newTodo })
        setData(res.data)
        setNewTodo({
            name: ""
        })
    }

    const handleGetTodo = async () => {
        try {
            const res = await publicAxios.get("/api/v1/todo");
            setData(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await publicAxios.delete(`/api/v1/todo/${id}`)
            setData(res.data.todo)
            alert(res.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeStatus = async (e: ChangeEvent<HTMLInputElement>, id: number) => {
        const status = e.target.checked
        console.log(status)
        const res = await publicAxios.put(`/api/v1/todo/${id}`, { status })
        setData(res.data.todo)
    }
console.log(data)
    useEffect(() => {
        handleGetTodo()
    }, [])
    return (
        <>
            <div className='flex justify-center items-center mt-[20px] '>
                <div className='border rounded-md shadow-xl py-5 px-20 min-w-[40%] bg-rose-500 '>
                    <h2 className='text-3xl font-semibold py-6 text-white'>Todo List</h2>
                    <p className='text-white '>Get thing done, one item at a time.</p>
                    <hr className='mt-2' />

                    <ul className='flex flex-col gap-3 mt-3 max-h-72 ml-3 '>
                        {data.map((item: any, index: number) => {
                            return <li key={index} className='flex justify-between items-center bg-neutral-500 h-[35px] rounded-md'>
                                <div>
                                    <span className='ml-2 text-white' style={{ textDecoration: item.status == 1 ? "line-through" : "" }}>{item.name}</span>
                                </div>

                                <div className='flex gap-4 mr-3'>
                                    <input
                                        type="checkbox"
                                        className='h-4 w-4 mt-[5px]'
                                        checked={item.status }
                                        onChange={(e) => handleChangeStatus(e, item.id)} />

                                    <button onClick={() => handleDelete(item.id)}>
                                        <i className="fa-solid fa-trash" style={{ color: "white" }}></i>
                                    </button>
                                </div>


                            </li>
                        })}
                    </ul>

                    <div className='flex gap-6 justify-center mt-3'>
                        <input
                            type="text"
                            className='border px-3 outline-none h-9 rounde shadow-md w-[95%] '
                            name='name'
                            onChange={handleGetValue}
                            value={newTodo.name}
                        />
                        <button
                            onClick={handleAdd}
                            className='rounded border w-[20%] bg-rose-500 text-white '>
                            ADD ITEM
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
