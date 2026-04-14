// Importamos librerías necesarias
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

// Creamos la aplicación
const app = express();

// Middleware para recibir datos en JSON
app.use(express.json());
app.use(cors());


// 🟣 CONEXIÓN A BASE DE DATOS
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // coloca tu contraseña si tienes
  database: "tienda"
});

// Verificamos la conexión
db.connect(err => {
  if (err) {
    console.log("Error de conexión a MySQL");
  } else {
    console.log("Conectado a MySQL");
  }
});


// 🟣 RUTA DE PRUEBA
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});


// 🟣 REGISTRO DE USUARIO
app.post("/registro", (req, res) => {

  // Recibimos datos del usuario
  const { email, password } = req.body;

  // Consulta SQL para insertar
  const sql = "INSERT INTO usuario (email, password) VALUES (?, ?)";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error en el registro" });
    }
    return res.json({ mensaje: "Usuario registrado correctamente" });
  });
});


// 🟣 LOGIN (AUTENTICACIÓN)
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM usuario WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error en el servidor" });
    }

    if (result.length > 0) {
      return res.json({ mensaje: "Autenticación satisfactoria" });
    } else {
      return res.json({ mensaje: "Error en la autenticación" });
    }
  });
});


// 🟣 INICIAR SERVIDOR
app.listen(3001, () => {
  console.log("Servidor corriendo en http://localhost:3001");
});