const express = require('express')
const router = express.Router()
const {readFileSync, writeFileSync} = require('fs')
const tasks  = JSON.parse(readFileSync('data.json'))

const idTrue = function(num) {
    if (num) {
        return true
    }else {
        return false
    }
}

router.get('/',(req,res) => {
    res.send(tasks)
})
router.get('/:id',(req,res) => {
    const id = Number(req.params.id)
    singleTask = tasks.filter(t => t && t.id == id)
    if (singleTask.length === 0){
        console.log(singleTask)
        return res.status(404).json({response: `Task with Id: ${id} does not exist`}) 
    }else {
    res.status(200).json({success: true, data: singleTask})}
})
router.post('/', (req,res)=> {
    data = req.body
    if (!data.title || data.title.length < 3) {
        res.status(400).send('task title is required and should be minimum 3 characters')
        return
    }
    statusText = (!data.status)? '': data.status
    newTask = {
        id: tasks.length + 1,
        title: data.title,
        status: statusText
    }
    tasks.push(newTask)
    newTaskData = JSON.stringify(tasks)
    writeFileSync('data.json',newTaskData,(err)=> {
        if(err) throw err;
        console.log('New data added')
    })
   
    res.status(201).json({success: true, data: tasks[tasks.length-1]})
})

router.put('/',(req,res)=> {
    checkid = idTrue(req.params.id)
    if (checkid == false) {
        res.status(404).json({response: 'please provide an id'})
    }
})

router.put('/:id', (req,res) => {
     const id = Number(req.params.id)
     if (req.params.id === null || id < 0) {
        res.status(404).json('put request needs an id')
     }
     const todo = tasks.find(t=> t.id === id)
     if (!todo) {
        return res.status(404).json({error: 'task with the given id not found'})
     }
    todo.title = req.body.title
    todo.status = req.body.status
    newTaskData = JSON.stringify(tasks)
    writeFileSync('data.json',newTaskData,(err)=> {
    if(err) throw err;
    console.log('Data updated')
    })
     res.status(201).json(todo)
     
})

router.delete('/', (req,res) => {
    checkid = idTrue(req.params.id)
    if (checkid == false) {
        res.status(404).json({response: 'please provide an id'})
    }
})

router.delete('/:id', (req,res) => {
    
    const id = Number(req.params.id)
    const index = tasks.findIndex(t => t.id === id)
    if (Number(index) < 0 || !id) {
        return res.status(404).json({response: 'Task with this id does not exist'})
    }
    delete tasks[index]
    newTaskData = JSON.stringify(tasks.filter(t => t))
    writeFileSync('data.json',newTaskData,(err)=> {
    if(err) throw err;
    console.log('Data updated')
    })
    res.status(200).json({response: 'Task successfully removed', data: tasks})
})

module.exports = router