const Project = require('../models/projectCreationModel')

//create project
const createProject = async (req,res) => {
    try{
        const newProject = new Project(req.body);

        await newProject.save();
        res.status(201).json(newProject)
    }

    catch (error) {
        res.status(400).json({ message : 'Error creating project',error})
    }
    
    
}

//get's project by id 
const getProjectById = async (req,res) => {
    try{
        const project = await Project.findById(req.params.id);
        if (!project)  return res.status(404).json({message : 'Error finding project'})
        
        
        res.status(200).json(project);}
    catch(error){
        res.status(500).json({message : 'Error retriving project',error})
    }
}

// gets all projects 
const getAllProjects = async(req,res) => {
    try{
        const projects = await Project.find()
        res.status(200).json(projects);

    } catch (error)
    {
        res.status(500).json({message :' Error retriving projects',error})

    }

}

//updates project based on the id that was passed 
const updateProject = async(req,res) => {
    try{
        const project = await Project.findByIdAndUpdate(req.params.id,req.body, {new:true});
        if (!project) return res.status(404).json({ message : ('Project not found')});
        res.status(200).json({messages : ' Project updated '})
    } catch(error){
        res.status(400).json({message : 'Error updating project',error})
    }
}

//deleteds project based on the Id provided 
const deleteProject = async(req,res) => {
    try{
        const project = await Project.findByIdAndDelete(req.params.id)
        if (!project) return res.status(404).json({ message : ('project not found')});
        res.status(200).json({message : 'Project Deleted successfully'})
    }catch(error) {
        res.status(500).json({message : 'Error deleting student',error})
    }
} 



module.exports = { 
    createProject,
    getAllProjects,
    updateProject,
    deleteProject,
    getProjectById
}