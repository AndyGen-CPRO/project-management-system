const Inbox = require("../models/inboxModel");
const ProjectMembers = require("../models/projectMemberModel");
const { v4: uuidv4 } = require('uuid');

//adds messages 
const sendInvitation = async (req,res) => {
    try{
        const { receiverId, title, body } = req.body

        const invitationToken = uuidv4();

        const newMessage = new Inbox({
            receiverId,
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
        const invitation = Inbox.findOne({ invitationToken: token });

        if(!invitation) return res.status(404).json({ message: "Invitation token invalid." })
        
        const newProjectMember = new ProjectMember({
            projectId: invitation.projectId,
            userId: req.user.id
        });

        await newProjectMember.save();

        res.status(201).json({ message: "Invitation accepted. User added to project."})
    } catch (error) {
        res.status(500).json({ message: "Error accepting invitation", error})
    }
};

const getInbox = async(req,res) => {
    try{
        
        const inbox = await Inbox.find({userId: req.user.userId})
        
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