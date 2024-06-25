import { getTodos } from "./Todos2SecLoad";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default async function Todos1SecLoad() {
  const todos: Todo[] = await getTodos(1000);

  return (
    <div>
      <h2>Todos</h2>
      <ul>
        {todos.slice(0, 10).map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
