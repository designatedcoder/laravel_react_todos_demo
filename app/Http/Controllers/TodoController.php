<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Todos/Index', [
            'completeTodos' => Todo::where('completed', 1)->latest()->get(),
            'incompleteTodos' => Todo::where('completed', 0)->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        $request->validate([
            'item' => 'required'
        ], [
                'item.required' => 'A todo is required!'
        ]);

        Todo::create([
            'item' => $request->item,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo) {
        $request->validate([
            'item' => 'required'
        ], [
                'item.required' => 'A todo is required!'
        ]);

        $todo->update([
            'item' => $request->item,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateCompletion(Request $request, Todo $todo) {
        // 0 = false
        // 1 = true
        //
        if ($request->completed != 0) {
            $todo->update([
                'completed' => 0,
            ]);
        } else {
            $todo->update([
                'completed' => 1,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
    }
}
