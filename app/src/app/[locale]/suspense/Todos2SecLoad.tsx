interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getTodos(delay: number) {
  await new Promise((resolve) => setTimeout(resolve, delay));
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = (await response.json()) as Todo[];
  return data;
}
export default async function Todos2SecLoad() {
  const todos: Todo[] = await getTodos(2000);

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
