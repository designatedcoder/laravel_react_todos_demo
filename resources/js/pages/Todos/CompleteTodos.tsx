import TodoItem from "./TodoItem";

export default function CompleteTodos({ items }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mt-4 px-4">Todos Done</h2>

            <div className="flex flex-col px-4 py-4 space-y-4">

                { items.map((complete) => (
                    <TodoItem todo={complete} key={complete.id} />
                ))}
            </div>
        </div>
    )
}
