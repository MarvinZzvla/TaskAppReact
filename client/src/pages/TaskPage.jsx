import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import { useTask } from "../context/TaskContext.jsx";
function TaskPage() {
  const { result, loadData } = useTask();
  useEffect(() => {
    loadData();
  }, []);

  const renderMain = () => {
    if (result.length > 0) {
      return (
        result &&
        result.map((item, index) => <TaskCard item={item} key={item.id} />)
      );
    } else {
      return <h2>No task</h2>;
    }
  };

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center">Task App</h1>
      <div className="grid grid-cols-3 gap-2">{renderMain()}</div>;
    </div>
  );
}

export default TaskPage;
