const functions = require("firebase-functions");
const express = require("express");

const app = express();

// Endpoint para /salas
app.get("/salas", (req, res) => {
    const salas = [
        { "nombre": "Sala 5 Bloque B Piso 3°", "computadorasDisponibles": 55 },
        { "nombre": "Salas 2-3 Bloque B Piso 2°", "computadorasDisponibles": 74 },
        { "nombre": "Sala 1 Bloque C Piso 1°", "computadorasDisponibles": 30 },
        { "nombre": "Sala 4 Bloque D Piso 3°", "computadorasDisponibles": 60 },
        { "nombre": "Sala 7 Bloque G Piso 5°", "computadorasDisponibles": 113 },
        { "nombre": "Sala 11, Bloque J, Piso 5°", "computadorasDisponibles": 30 },
        { "nombre": "Sala 10 Bloque K Piso 5°", "computadorasDisponibles": 143 }
    ];
    res.json(salas);
});

// Exporta tu aplicación Express como una función de Cloud Function
exports.api = functions.https.onRequest(app);
