import { useForm } from "@inertiajs/react"
import { useRef } from "react"

export default function TodoItem({ todo }){

    const itemInput = useRef(null)

    const { data, setData, patch, put, delete: destroy, errors } = useForm({
        id: todo.id,
        item: todo.item,
        completed: todo.completed,
    })

    const updateTodo = ((e) => {
        e.preventDefault()
        patch(route('todos.update', todo), {
            preserveScroll: true,
            onSuccess: () => {
                itemInput.current.blur()
            }
        })
    })

    const updateComp = (() => {
        put(route('todos.updateCompletion', todo), {
            preserveScroll: true,
        })
        console.log(todo);
    })

    const deleteTodo = () => {
        if (confirm('Are you sure?')) {
            destroy(route('todos.destroy', todo), {
                preserveScroll: true
            })
        }
    }

    return (
        <div className="flex justify-between space-x-6">
            <div className="w-3/4">
                <form onSubmit={updateTodo}>
                    <input
                        type="text"
                        ref={itemInput}
                        className="p-2 w-full"
                        value={data.item}
                        onChange={e => setData('item', e.target.value)}
                    />

                    { errors.item && <div className="text-center text-red-500 mt-2">{errors.item}</div> }
                </form>
            </div>

            <div className="flex space-x-2">
                <button
                    type="submit"
                    onClick={updateComp}
                    className="inline-flex cursor-pointer items-center justify-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-500 focus:outline-none focus:border-green-700 focus:ring focus:ring-green-200 active:bg-green-600 transition"
                >
                    { todo.completed === 1 ? 'Undo': 'Complete'}
                </button>

                <button
                    type="button"
                    onClick={deleteTodo}
                    className="inline-flex cursor-pointer items-center justify-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
