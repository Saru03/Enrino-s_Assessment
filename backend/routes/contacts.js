const express = require('express')
const router = express.Router()
const Contacts = require('../models/contacts')

router.get('/', async (req, res) => {
    try {
        const contacts = await Contacts.find({});
        return res.json(contacts)
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

router.post('/', async (req, res) => {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ message: "Required" })
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid format" })
    }
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ message: "Invalid format" })
    }
    try {
        const existingContact = await Contacts.find({ $or:[{email},{phone}] })
        if (existingContact) {
            return res.status(404).json({ message: "Contact already exists" })
        }
        const newContact = new Contacts({ firstName, lastName, email, phone, company, jobTitle })
        await newContact.save();
        console.log("saved")
        return res.status(201).json({ message: "Contact Added successfully", contact: newContact })
    }
    catch (err) {
        return res.status(400).json({ message: "Failed to add contact", error: err.message })
    }
})



router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;
    console.log(req.body)
    if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ message: "Required" })
    }
    try {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,8}(\.[a-z]{2,8})?$/;
        const phoneRegex = /^[0-9]{10}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid format" })
        }
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid format" })
        }
        const updatedContact = await Contacts.findByIdAndUpdate(id, {firstName, lastName, email, phone, company, jobTitle},{new:true,runValidators:true});
        console.log(updatedContact)
        if (!updatedContact) {
            return res.status(404).json({ message: "Contact not found" })
        }
        return res.status(200).json("Contact update successfully")
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleteContact = await Contacts.findByIdAndDelete(id);
        console.log("deleted")
        if (!deleteContact) {
            return res.status(404).json({ message: "Contact not found" })
        }
        return res.status(200).json({ message:"Contact deleted succesfully"})
    }
    catch (err) {
        return res.status(500).json({ error: err.message })
    }

})
module.exports = router
