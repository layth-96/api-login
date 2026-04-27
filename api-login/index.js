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
// 🟣 OBTENER PRODUCTOS
app.get("/productos", (req, res) => {
  const sql = "SELECT * FROM productos";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error al obtener productos" });
    }
    return res.json(result);
  });
});


// 🟣 AGREGAR PRODUCTO
app.post("/productos", (req, res) => {
  const { nombre, precio } = req.body;

  const sql = "INSERT INTO productos (nombre, precio) VALUES (?, ?)";

  db.query(sql, [nombre, precio], (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error al agregar producto" });
    }
    return res.json({ mensaje: "Producto agregado correctamente" });
  });
});


// 🟣 AGREGAR AL CARRITO
app.post("/carrito", (req, res) => {
  const { producto_id, cantidad } = req.body;

  const sql = "INSERT INTO carrito (producto_id, cantidad) VALUES (?, ?)";

  db.query(sql, [producto_id, cantidad], (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error al agregar al carrito" });
    }
    return res.json({ mensaje: "Producto agregado al carrito" });
  });
});


// 🟣 VER CARRITO
app.get("/carrito", (req, res) => {
  const sql = "SELECT * FROM carrito";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error al obtener carrito" });
    }
    return res.json(result);
  });
});

// 🟣 CREAR PEDIDO
app.post("/pedido", (req, res) => {
  const { total } = req.body;

  const sql = "INSERT INTO pedidos (total) VALUES (?)";

  db.query(sql, [total], (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error al crear pedido" });
    }
    return res.json({ mensaje: "Pedido creado correctamente" });
  });
});


// 🟣 VER PEDIDOS
app.get("/pedido", (req, res) => {
  const sql = "SELECT * FROM pedidos";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ mensaje: "Error al obtener pedidos" });
    }
    return res.json(result);
  });
});