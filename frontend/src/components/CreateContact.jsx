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

function CreateContact({ open, onClose, onCreateSuccess }) {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        jobTitle: ""
    })
    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setFormData((currData) => ({
            ...currData,
            [name]: value
        }))
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            await axios.post("http://localhost:3000/contacts", formData);
            alert("Contact created succefully")
        } catch (err) {
            setError("Error creating contact")
        }
    }
    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create Contact</DialogTitle>
                <form className="form" onSubmit={handleSubmit}>
                    <DialogContent>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                            <label htmlFor="firstName" class="label">firstName</label>
                            <TextField
                                placeholder='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                                name='firstName'
                                id="firstName"
                                variant="outlined"
                            />
                            <label htmlFor="lastName" class="label">lastName</label>
                            <TextField
                                placeholder='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                                name='lastName'
                                id="lastName"
                                variant="outlined"
                            />
                            <label htmlFor="email" class="label">Email</label>
                            <TextField type="email"
                                placeholder='Email'
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                id='email'
                            />
                            <label htmlFor="phone" class="label">phone</label>
                            <TextField type="phone"
                                placeholder='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                name="phone"
                                id="phone"
                            />
                            <label htmlFor="company" class="label">company</label>
                            <TextField type="company"
                                placeholder='company'
                                value={formData.company}
                                onChange={handleChange}
                                name="company"
                                id="company"
                            />
                            <label htmlFor="jobTitle" class="label">jobTitle</label>
                            <TextField type="jobTitle"
                                placeholder='jobTitle'
                                value={formData.jobTitle}
                                onChange={handleChange}
                                name="jobTitle"
                                id="jobTitle"
                            />
                            </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button variant="contained" id="button">Create contact</Button>

                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default CreateContact