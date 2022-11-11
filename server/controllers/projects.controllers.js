import { pool } from "../db.js";

export const getProject = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM projects WHERE id = ?", [
      req.params.id,
    ]);

    result.length === 0
      ? res.status(404).json({ message: "Projecto no encontrado" })
      : res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener un solo projecto mediante el Id del mismo.
export const getProjects = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM projects ORDER BY id ASC");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Obtener todos los projectos existentes en la bd.
export const createProject = async (req, res) => {
  try {
    const { title, description, liveDemoUrl, imageUrl } = req.body;

    const [result] = await pool.query(
      "INSERT INTO projects(title, description, liveDemoUrl, imageUrl) VALUES (?, ?, ?, ?)",
      [title, description, liveDemoUrl, imageUrl]
    );

    res.json({
      id: result.insertId,
      title,
      description,
      liveDemoUrl,
      imageUrl,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Actualizar un projecto existente mediante el id.
export const updateProject = async (req, res) => {
  try {
    const result = await pool.query("UPDATE projects SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Eliminar un projecto mediante su id.
export const deleteProject = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM projects WHERE id = ?", [
      req.params.id,
    ]);

    result.affectedRows === 0
      ? res.status(404).json({ message: "Projecto no encontrado" })
      : res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
