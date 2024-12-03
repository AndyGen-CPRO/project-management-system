const Project = require('../models/projectModel');
const ProjectMember = require('../models/projectMemberModel');

//create project
const createProject = async (req,res) => {
    try{
        const { name, description, startDate, endDate } = req.body;

        const newProject = new Project({
            name,
            startDate,
            endDate,
            description,
            userId: req.user.id,
        });

        await newProject.save();

        const newProjectMember = new ProjectMember({
            projectId: newProject._id,
            userId: req.user.id,
            role: "Owner"
        });

        await newProjectMember.save();

        res.status(201).json({project: newProject, owner: newProjectMember})
    }

    catch (error) {
        res.status(400).json({ message : 'Error creating project.',error})
    }
}

//get's project by id 
const getProjectById = async (req,res) => {
    try{
        const project = await Project.findOne({ 
            _id: req.params.projectId
        });
        if (!project)  return res.status(404).json({message : 'Project not found.'})
        
        res.status(200).json(project);}
    catch(error){
        res.status(500).json({message : 'Error retriving project.',error})
    }
}

// gets all projects 
const getAllProjects = async(req,res) => {
    try{
        const projects = await Project.find({ userId: req.user.id })
        res.status(200).json(projects);

    } catch (error)
    {
        res.status(500).json({message :'Error retrieving projects.',error})
    }
}

const getAllJoinedProjects = async(req, res) => {
    try{
        const joinedProjects = await ProjectMember.find({ userId: req.user.id, role: "Member" })

        const projectIds = joinedProjects.map((joinedProjects) => joinedProjects.projectId);

        const projects = await Project.find({ _id: projectIds })

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving joined projects."})
    }
}

//updates project based on the id that was passed 
const updateProject = async(req,res) => {
    try{
        const project = await Project.findByIdAndUpdate(
            req.params.projectId ,req.body, {new:true}
        );
        if (!project) return res.status(404).json({ message : ('Project not found.')});
        res.status(200).json({messages : 'Project updated.'})
    } catch(error){
        res.status(400).json({message : 'Error updating project.',error})
    }
}

//deleteds project based on the Id provided 
const deleteProject = async(req,res) => {
    try{
        const project = await Project.findByIdAndDelete(req.params.projectId)
        if (!project) return res.status(404).json({ message : ('Project not found.')});
        res.status(200).json({message : 'Project deleted successfully.'})
    }catch(error) {
        res.status(500).json({message : 'Error deleting project.',error})
    }
} 

module.exports = { 
    createProject,
    getAllProjects,
    getAllJoinedProjects,
    updateProject,
    deleteProject,
    getProjectById
}