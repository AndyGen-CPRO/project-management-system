const Part = require('../models/partModel')

const createPart = async (req,res) => {
    try{
        const { name, description } = req.body;

        const newPart = new Part({
            name,
            description,
            //percentage,
            projectId: req.params.projectId,
        });

        await newPart.save();
        res.status(201).json(newPart)
    }

    catch (error) {
        res.status(400).json({ message : 'Error creating part',error})
    }
}

const getPartById = async (req,res) => {
    try{
        const part = await Part.findOne({ 
            _id: req.params.partId, projectId: req.params.projectId 
        });
        if (!part)  return res.status(404).json({message : 'Error finding part'})
        
        res.status(200).json(part);}
    catch(error){
        res.status(500).json({message : 'Error retriving part',error})
    }
}

const getAllParts = async(req,res) => {
    try{
        const part = await Part.find({ projectId: req.params.projectId })
        res.status(200).json(part);

    } catch (error)
    {
        res.status(500).json({message :' Error retriving part',error})
    }
}

const updatePart = async(req,res) => {
    try{
        const part = await Part.findByIdAndUpdate(req.params.partId, req.body, {new:true});
        if (!part) return res.status(404).json({ message : ('Part not found')});
        res.status(200).json({messages : ' Part updated '})
    } catch(error){
        res.status(400).json({message : 'Error updating part',error})
    }
}

const deletePart = async(req,res) => {
    try{
        const part = await Part.findByIdAndDelete(req.params.partId)
        if (!part) return res.status(404).json({ message : ('Part not found')});
        res.status(200).json({message : 'Part Deleted successfully'})
    }catch(error) {
        res.status(500).json({message : 'Error deleting part',error})
    }
} 

module.exports = { 
    createPart,
    getAllParts,
    updatePart,
    deletePart,
    getPartById
}