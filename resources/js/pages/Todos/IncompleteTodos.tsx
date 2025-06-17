import TodoItem from "./TodoItem";

export default function IncompleteTodos({ items }) {
    return (
        <div>
            <h2 className="text-xl font-semibold mt-4 px-4">Todos To Do</h2>

            <div className="flex flex-col px-4 py-4 space-y-4">

                { items.map((incomplete) => (
                    <TodoItem todo={incomplete} key={incomplete.id} />
                ))}
            </div>
        </div>
    )
}
