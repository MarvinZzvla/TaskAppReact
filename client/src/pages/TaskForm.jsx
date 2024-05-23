import { Form, Formik } from "formik";
import { useTask } from "../context/TaskContext.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTask, loadDataById, updateTaskByID } = useTask();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadDataForm = async () => {
      if (params.id) {
        const a = await loadDataById(params.id);
        setTask({
          title: a.title,
          description: a.description,
        });
      }
    };
    loadDataForm();
  }, []);

  return (
    <div>
      <h1 className="text-white font-bold text-center text-3xl m-5">
        {params.id ? "Edit Task" : "Create Task"}
      </h1>
      <Formik
        initialValues={task}
        enableReinitialize={true}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = "Campo requerido";
          }
          if (!values.description) {
            errors.description = "Campo requerido";
          }
          return errors;
        }}
        onSubmit={async (values, actions) => {
          if (params.id) {
            await updateTaskByID(values, params.id);
            navigate("/");
          } else {
            await createTask(values);
            navigate("/");
          }

          setTask({
            title: "",
            description: "",
          });
        }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form
            onSubmit={handleSubmit}
            className="bg-slate-300 max-w-sm rounded-md p-4 mx-auto"
          >
            <label>Title</label>
            <br />
            <input
              className="px-2 py-1 rounded-sm w-full"
              type="text"
              name="title"
              placeholder="Escribeme un titulo"
              onChange={handleChange}
              value={values.title}
            />

            <br />
            <label>Description</label>
            <br />
            <textarea
              className="px-2 py-1 rounded-sm w-full"
              rows="3"
              name="description"
              placeholder="Escribe una descripcion"
              onChange={handleChange}
              value={values.description}
            />

            <br />
            <button
              type="submit"
              disabled={isSubmitting}
              className="block mx-auto bg-indigo-500 p-2 text-white font-bold rounded-md"
            >
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
