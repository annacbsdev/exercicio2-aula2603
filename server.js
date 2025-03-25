const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

let consultas = [];
let contador = 1;

app.get("/consultas", (req, res) => {
    res.json(consultas);
});

app.post("/agendar", (req, res) => {
    const { paciente, data, hora } = req.body;
    let novaConsulta = { id: contador++, paciente, data, hora };
    consultas.push(novaConsulta);
    res.status(201).json(novaConsulta);
});

app.delete("/cancelar/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = consultas.findIndex(c => c.id == id);
    if (index == -1)
        return res.status(404).json({erro: "Erro ao identificar consulta."});
    consultas.splice(index, 1);
    res.json({mensagem: "Consulta cancelada com sucesso."})
});

app.listen(port, () => {
    console.log("Rodando...")
})