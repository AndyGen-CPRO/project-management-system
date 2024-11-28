const Task = require('../models/taskModel')

const createTask = async (req,res) => {
    try{
        const { partId, name, description, dueDate, priority, assignedMembers } = req.body;

        const newTask = new Task({
            partId,
            name,
            description,
            dueDate,
            priority,
            projectId: req.params.projectId,
            assignedMembers
        });

        await newTask.save();
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message : 'Error creating task',error })
    }
}

const getTaskById = async (req,res) => {
    try{
        const task = await Task.findOne({ 
            _id: req.params.taskId, partId: req.params.partId 
        });
        if (!task)  return res.status(404).json({message : 'Error finding task'})
        
        res.status(200).json(task);
    } catch(error){
        res.status(500).json({message : 'Error retriving task',error})
    }
}

const getAllTasksByProject = async(req,res) => {
    try{
        const tasks = await Task.find({ projectId: req.params.projectId })
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({message :' Error retriving task',error})
    }
}

const getAllTasksByPart = async(req,res) => {
    try{
        const tasks = await Task.find({ partId: req.params.partId })
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({message :' Error retriving task',error})
    }
}

const updateTask = async(req,res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {new:true});
        if (!task) return res.status(404).json({ message : ('Task not found')});
        res.status(200).json({messages : ' Task updated '})
    } catch(error){
        res.status(400).json({message : 'Error updating task',error})
    }
}

const deleteTask = async(req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.partId)
        if (!task) return res.status(404).json({ message : ('Task not found')});
        res.status(200).json({message : 'Task Deleted successfully'})
    }catch(error) {
        res.status(500).json({message : 'Error deleting task',error})
    }
} 

module.exports = { 
    createTask,
    getAllTasksByProject,
    getAllTasksByPart,
    updateTask,
    deleteTask,
    getTaskById
}