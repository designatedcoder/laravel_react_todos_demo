import { Head, useForm, usePage } from "@inertiajs/react";
import IncompleteTodos from './IncompleteTodos.tsx'
import CompleteTodos from './CompleteTodos.tsx'
import { Input } from "@/components/ui/input.js";

interface Todo {
    id: number,
    item: string,
    completed: boolean,
}

interface PageProps {
    completeTodos: Todo[],
    incompleteTodos: Todo[],
}

export default function Todos() {
    const { completeTodos, incompleteTodos } = usePage().props as PageProps;

    const { data, setData, post, errors, reset } = useForm({
        item: '',
    })

    const addTodo = ((e) => {
        e.preventDefault()
        post(route('todos.store'), {
            preserveScroll: true,
            onSuccess: () => reset()
        })
    })

    return (
        <>
            <Head title="Todos">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
                <div className="max-w-6xl w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="flex flex-col items-center mt-4">
                            <form onSubmit={addTodo}>
                                <Input
                                    type="text"
                                    value={data.item}
                                    onChange={e => setData('item', e.target.value)}
                                    placeholder="Do or do not..."
                                    className="text-center"
                                />
                                { errors.item && <div className="text-center text-red-500 mt-2">{errors.item}</div> }
                            </form>
                        </div>

                        <IncompleteTodos items={ incompleteTodos } />
                        <CompleteTodos items={ completeTodos } />
                    </div>
                </div>
            </div>
        </>
    )
}
