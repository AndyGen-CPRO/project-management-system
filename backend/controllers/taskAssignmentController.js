const TaskAssignment = require('../models/taskAssignmentModel');

const assignMember = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { userId } = req.body;

        const memberAssigned = await TaskAssignment.findOne({ taskId, userId });
        if (memberAssigned) {
            return res.status(400).json({ message: "Member is already assigned to this task."})
        }

        const newAssigned = new TaskAssignment({
            taskId,
            userId
        });

        await newAssigned.save();
        res.status(201).json(newAssigned)
    } catch(error) {
        res.status(400).json({ message: "Error adding member", error });
    }
};

const getAssignedMembers = async (req, res) => {
    try {
        const { taskId } = req.params;

        const members = await TaskAssignment.find({ taskId }).populate('userId', 'displayName email');
        res.status(200).json(members);
    } catch (error) {
        res.status(400).json({ message: "Error fetching task members", error });
    }
};

const removeTaskMember = async (req, res) => {
    try {
        const { taskId, userId } = req.params;

        await TaskAssignment.findOneAndDelete({ taskId, userId });
        res.status(200).json({ message: "Member removed from task successfully" });
    } catch (error) {
        res.status(400).json({ message: "Error removing member from task", error });
    }
};

module.exports = {
    assignMember,
    getAssignedMembers,
    removeTaskMember
}