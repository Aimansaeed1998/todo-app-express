module.exports = (sequelize,Sequelize) => {
    const Tasks = sequelize.define("tasks", {
        taskid : {
            type: Sequelize.INTEGER
        },
        name : { 
            type: Sequelize.STRING
        },
        status : { 
            type: Sequelize.STRING
        }
    }
    );
    return Tasks
}