import React from 'react'
import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Alert,
} from '@mui/material'
import axios from 'axios';

function EditContact({open, onClose, onEditSuccess, contactData}) {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: ""
    })
    useEffect(()=>{
        if(contactData){
            setFormData({
                firstName: contactData.firstName || "",
                lastName: contactData.lastName || "",
                email: contactData.email || "",
                phone: contactData.phone || "",
                company: contactData.company || "",
                jobTitle: contactData.jobTitle || ""
            })
        }
    },[contactData])
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((currData) => ({
            ...currData,
            [name]: value
        }))
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        setError(""); 
        try {
            const response = await axios.put(
                `http://localhost:3000/contacts/${contactData._id}`,
                formData
            );
            
            if (response.data) {
                onEditSuccess(); // Call success callback only if request succeeds
                onClose(); // Close dialog only after successful update
            }
        } catch (err) {
            console.error('Edit error:', err);
            setError(err.response?.data?.message || "Error editing contact");
            // Don't close the dialog on error
        }
    }
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Contact</DialogTitle>
                <form className="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                            <label htmlFor="firstName" class="label">firstName</label>
                            <TextField
                                value={formData.firstName}
                                onChange={handleChange}
                                name='firstName'
                                id="firstName"
                                variant="outlined"
                            />
                            <label htmlFor="lastName" class="label">lastName</label>
                            <TextField
                               
                                value={formData.lastName}
                                onChange={handleChange}
                                name='lastName'
                                id="lastName"
                                variant="outlined"
                            />
                            <label htmlFor="email" class="label">Email</label>
                            <TextField type="email"
                                
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                id='email'
                            />
                            <label htmlFor="phone" class="label">phone</label>
                            <TextField type="phone"
                                
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                                id="phone"
                            />
                            <label htmlFor="company" class="label">company</label>
                            <TextField type="company"
                                
                                value={formData.company}
                                onChange={handleChange}
                                name="company"
                                id="company"
                            />
                            <label htmlFor="jobTitle" class="label">jobTitle</label>
                            <TextField type="jobTitle"
                                
                                value={formData.jobTitle}
                                onChange={handleChange}
                                name="jobTitle"
                                id="jobTitle"
                            />
                            </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button variant="contained" id="button" type="submit" >Save Changes</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default EditContact