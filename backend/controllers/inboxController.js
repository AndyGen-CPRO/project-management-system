const Inbox = require("../models/inboxModel")


//adds messages 
const addMessage = async (req,res) => {
    try{
        const {title,body,userId} = req.body

        const newMessage = new Inbox({
            title,
            body,
            projectId : req.params.projectId, //gets from param
            userId: req.user.id, //gets userId from the auth token
        });

        await newMessage.save();
        res.status(201).json(newMessage)
    }catch(error) {
        res.status(400).json({ message: "Error sending message ", error });
    }
}

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
    addMessage,
    getInbox
 }