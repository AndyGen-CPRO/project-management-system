const Inbox = require("../models/inboxModel");
const ProjectMember = require("../models/projectMemberModel");
const { v4: uuidv4 } = require('uuid');
const User = require("../models/userModel");

const sendInvitation = async (req,res) => {
    try{
        const { receiverEmail, title, body } = req.body

        const receiver = await User.findOne({ email: receiverEmail })

        if (!receiver) {
            return res.status(404).json({ message: "User with inserted email does not exist." })
        }

        const existingInvitation = await Inbox.findOne({ 
            receiverId: receiver._id,
            projectId: req.params.projectId
        });

        if (existingInvitation) {
            return res.status(400).json({ message: "User has already been invited to this project."})
        }
        const invitationToken = uuidv4();

        const newMessage = new Inbox({
            receiverId: receiver._id,
            senderId: req.user.id, //gets userId from the auth token
            projectId : req.params.projectId, //gets from param
            title,
            body,
            invitationToken
        });

        await newMessage.save();
        res.status(201).json(newMessage)
    }catch(error) {
        res.status(400).json({ message: "Error sending message ", error });
    }
}

const acceptInvite = async(req, res) => {
    const { token } = req.params;

    try {
        const invitation = await Inbox.findOne({ invitationToken: token });

        if(!invitation) {
            return res.status(404).json({ message: "Invitation token invalid." })
        }

        const newProjectMember = new ProjectMember({
            projectId: invitation.projectId,
            userId: req.user.id
        });

        await newProjectMember.save();

        invitation.status = "accepted";
        await invitation.save();

        res.status(201).json({ message: "Invitation accepted. User added to project."})
    } catch (error) {
        res.status(500).json({ message: "Error accepting invitation", error})
    }
};

const getInbox = async(req,res) => {
    try{
        const inbox = await Inbox.find({ receiverId: req.user.id })
        res.status(200).json(inbox)
    }catch(error)
    {
        res.status(500).json({message :'Error retriving Inbox',error})
    }
}
 

 module.exports = {
    sendInvitation,
    acceptInvite,
    getInbox
 }