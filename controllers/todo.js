const db = require('../models')
const Tasks = db.tasks
const Op = db.Sequelize.Op


//insert new task
exports.create = (req,res) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Content cannot be empty"
        })
        return
    }

    //create a task
    const task = {
        taskid : req.body.id,
        name: req.body.name,
        status: req.body.status,
    }

    //save a subscription in the database
    Tasks.create(task)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 
                err.message || 'Error occured while creating Task'
            })
        })
}

//Retrieve all Subscriptions
exports.findAll = (req,res) => {
    const id = req.query.id
    var condition = id ? {id: {[Op.like]: `%${id}$%`}} : null
  
    Tasks.findAll({
      where : condition
    }).then(data => {
      res.send(data)
    }).catch(err => {
      res.status(500).send({
        message : err.message || "Some error occured while retrieving tasks"
      })
    })
  
  }

//Search a single task detail by the id in the request
exports.findOne = (req,res) => {
    const id = req.params.id

    Tasks.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message : `Cannot find Task with id=${id}`
                })
            }
        })
        .catch(err=> {
            res.status(500).send({
                message :  `Error retrieving task with id=${id}`
            })
        })
}