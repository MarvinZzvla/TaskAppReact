import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext.jsx";
function TaskCard({ item }) {
  const { handleDelete, updateToggle } = useTask();
  const navigate = useNavigate();

  const handleDone = async (taskDone, id) => {
    try {
      if (taskDone === 0) {
        await updateToggle(id, 1);
      } else {
        await updateToggle(id, 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-700 text-white rounded-md p-4 my-1">
      <header className="flex justify-between">
        <h3 className="text-xl font-bold">{item.title}</h3>
        <span>{item.done == 0 ? "❌" : "✔"}</span>
      </header>
      <p>{item.description}</p>
      <div>
        <button
          className="bg-green-500 text-white font-bold rounded-md p-2 mx-1"
          onClick={() => navigate(`/edit/${item.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white font-bold rounded-md p-2 mx-1"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </button>
        <button
          className="bg-slate-500 text-white font-bold rounded-md p-2 mx-1"
          onClick={() => handleDone(item.done, item.id)}
        >
          Realizada?
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
