import { pool } from "../db.js";

export const getTasks = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM task");
    res.json(result);
    console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTask = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT * FROM task WHERE ID= ${req.params.id}`
    );
    //console.log(result);
    result.length > 0
      ? res.status(200).json(result[0])
      : res.status(404).send("No existe");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    await pool.query(`CREATE TABLE IF NOT EXISTS task(id INT AUTO_INCREMENT,title VARCHAR(255),description TEXT,done BOOLEAN NOT NULL DEFAULT 0,createAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(id))
  `);
    console.log("La tabla fue creada exitosamente.");
    await pool.query(
      `INSERT INTO task (title, description) VALUES ('${title}', '${description}');`
    );
    console.log("Se insertó un nuevo registro.");
    res.send("Creando tarea");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateTask = async (req, res) => {
  try {
    const body = req.body;
    const idParam = req.params.id;
    const result = await pool.query(`UPDATE task SET ? WHERE ID = ?;`, [
      body,
      idParam,
    ]);
    if (result[0].affectedRows > 0) {
      res.status(200).json({ response: "Actualizando tarea" });
    } else {
      res.status(404).json({ response: "not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const idParam = req.params.id;
    const result = await pool.query(`DELETE FROM task WHERE id = ${idParam};`);
    res.send("Borrando tarea");
    //console.log(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
