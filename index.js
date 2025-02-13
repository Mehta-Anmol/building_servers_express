import express from "express";

const app = express();

const port = 3000;

app.use(express.json());

let teaData = [];
let nextId = 1;

//add new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;

  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});
//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("404 not found");
  }
  res.status(200).send(tea);
});

//update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("404 error tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

//delete tea

app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(400).send("404 error tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("delete");
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

/* app.get("/", (req, res) => {
  res.send("Hello from Burn!");
});
app.get("/burn", (req, res) => {
  res.send("Hello from Burn!,for the second time");
});
app.get("/twitter", (req, res) => {
  res.send("Hello from Burn!, twitter");
}); */

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});
