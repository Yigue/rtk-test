import React from "react";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "../api/apiSlicer";
export function TaskList() {
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const { data: tasks, isError, isLoading, error } = useGetTasksQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error:{error}</div>;
  } else {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>delete</button>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => {
                updateTask({
                  ...task,
                  completed: e.target.checked,
                });
              }}
              name="completed"
            ></input>
          </li>
        ))}
      </ul>
    );
  }
}
