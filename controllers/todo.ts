import Todo from "../interfaces/Todo.ts";

import todos from "../stubs/todos.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts"
export default{
    getAllTodos: ({response}:{response:any}) => {
        response.status = 200;
        response.body = {
        success:true,
        data: todos,
        };
    },
    createTodo: async ({ request, response }: { request: any; response: any },
    ) => {
        const body = await request.body();
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provider",
            };
            return;
        }
        let newTodo: Todo = {
            id: v4.generate(),
            todo: body.value.todo,
            isCompleted: false,
        };
        let data = [...todos, newTodo];
        response.body = {
            success: true,
            data,
        };
    },
    getTodoById: ({ params, response }: { params: { id: string }; response: any },
        ) => {
            const todo: Todo | undefined = todos.find((t) => {
                return t.id === params.id;
              });
              if (!todo) {
                response.status = 404;
                response.body = {
                  success: false,
                  message: "No todo found",
                };
                return;
              }
              response.status = 200;
              response.body = {
              success: true,
              data: todo,
            };
           },
    updateTodoById: async ({ params, request, response }: {
        params: { id: string },
        request: any,
        response: any,
      },) => {
        const todo: Todo | undefined = todos.find((t) => t.id === params.id);
        if (!todo) {
          response.status = 404;
          response.body = {
            success: false,
            message: "No todo found",
          };
          return;
        }
    
        // if todo found then update todo
        const body = await request.body();
        const updatedData: { todo?: string; isCompleted?: boolean } = body.value;
        let newTodos = todos.map((t) => {
          return t.id === params.id ? { ...t, ...updatedData } : t;
        });
        response.status = 200;
        response.body = {
          success: true,
          data: newTodos,
        };
      },
    deleteTodoById: ({ params, response }: { params: { id: string }; response: any },
        ) => {
            const allTodos = todos.filter((t) => t.id !== params.id);
        
            // remove the todo w.r.t id and return
            // remaining todos
            response.status = 200;
            response.body = {
              success: true,
              data: allTodos,
            };
          },
        };
    