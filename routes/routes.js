module.exports = app => {
    const subscriptions = require('../controllers/magazine')
    var router = require('express').Router();

    //add new subscription
    router.post("/",subscriptions.create)

    //view all students
    router.get("/",subscriptions.findAll)

    //view a student
    router.get("/",subscriptions.fin)

    app.use('/api/tasks',router)
}