const ProjectMember = require("../models/projectMemberModel");

const addProjectMember = async (req, res) => {
    try {
        const newMember = new ProjectMember({
            projectId: req.params.projectId,
            userId: req.body
        });

        await newMember.save();
        res.status(201).json(newMember)
    } catch(error) {
        res.status(400).json({ message: "Error adding member", error });
    }
};

const getProjectMembers = async (req, res) => {
    try {
        const { projectId } = req.params;

        const members = await ProjectMember.find({ projectId }).populate('userId', 'displayName email');
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ message: "Error fetching project members", error });
    }
};

const updateMemberRole = async (req, res) => {
    try {
        const { projectId, userId } = req.params;
        const { role } = req.body;

        const updatedMember = await ProjectMember.findOneAndUpdate(
            { projectId, userId },
            { role },
            { new: true }
        );

        res.status(200).json({ message: "Member role updated successfully", updatedMember });
    } catch (error) {
        res.status(400).json({ message: "Error updating member role", error });
    }
};

const removeProjectMember = async (req, res) => {
    try {
        const { projectId, userId } = req.params;

        await ProjectMember.findOneAndDelete({ projectId, userId });
        res.status(200).json({ message: "Member removed successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error removing member", error });
    }
};

module.exports = {
    addProjectMember,
    getProjectMembers,
    updateMemberRole,
    removeProjectMember
}