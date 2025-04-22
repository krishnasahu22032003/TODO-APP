const express = require ('express')
const serveStatic = require("serve-static");
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(serveStatic("public"))
const todos=[]

// initial endpoint which shows all the todos in the todos array
app.get('/todos',function (req,res){
res.json(todos)
console.log(todos)
})
// this is the end point for posting or adding new todos
app.post('/todos',function (req,res){
const todo={
    id:todos.length + 1,
    description:req.body.description,
    completed:req.body.completed || false
}
todos.push(todo)
res.status(201).json(todo)
console.log(todos)
})
// this endpoint is for updating the todos
app.put('/todos/:id',function (req,res){
const id = parseInt(req.params.id)
const todo = todos.find((t) => t.id === id);
if (!todo){
 return   res.status(404).json({ error:"todo not found"})
}
todo.description=req.body.description||todo.description
todo.completed=req.body.completed||todo.completed
res.json (todo)
console.log(todos)
})
// this endpoint is for deleting the todos
app.delete('/todos/:id',function (req,res){
    const id = parseInt(req.params.id)
    const index = todos.findIndex((t) => t.id === id);
    if(index===-1){
return res.status(404).json({
    error:"todo not found"
})
}
    todos.splice(index, 1);
  res.status(204).send();
  console.log(todos)
})



app.listen(8000)