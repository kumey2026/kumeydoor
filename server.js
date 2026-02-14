const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

let estadoPuerta = "esperando";

// Servir carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Endpoint abrir
app.get("/abrir", (req, res) => {

    if (req.query.token !== "123ABC") {
        return res.status(401).send("No autorizado");
    }

    estadoPuerta = "abrir";
    console.log("Orden de apertura recibida");
    res.send("Orden enviada");
});

// Endpoint estado (ESP32 consulta)
app.get("/estado", (req, res) => {

    if (estadoPuerta === "abrir") {
        estadoPuerta = "esperando";
        console.log("ESP32 recibió orden de abrir");
        return res.send("abrir");
    }

    res.send("esperando");
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto " + PORT);
});
