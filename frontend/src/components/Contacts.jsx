import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateContact from './CreateContact';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EditContact from './EditContact'
import { IconButton } from '@mui/material';

function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/contacts');
            setContacts(response.data);
            setLoading(false);
            setError(""); 
        }
        catch (err) {
            setError("Failed to fetch contacts");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleCreateSuccess = () => {
        fetchContacts(); 
        setIsCreateDialogOpen(false);
    };

    const handleEditClick = (contact) => {
        setSelectedContact(contact);
        setIsEditDialogOpen(true);
    };

    const handleEditSuccess = () => {
        fetchContacts();
        setIsEditDialogOpen(false);
        setSelectedContact(null);
    };

    const handleDeleteClick = (contact) => {
        setContactToDelete(contact);
        setDeleteDialogOpen(true); 
    };

    const handleDelete = async () => {
        if (!contactToDelete) return;
        
        try {
            await axios.delete(`http://localhost:3000/contacts/${contactToDelete._id}`);
            await fetchContacts();
            setError("");
            setDeleteDialogOpen(false);
        } catch (err) {
            console.error('Delete error:', err);
            setError("Failed to delete contact");
        } finally {
            setContactToDelete(null);
        }
    };

    if (loading) return <p>Loading contacts...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <div className="mb-4">
                <Button
                    variant="outlined"
                    onClick={() => setIsCreateDialogOpen(true)}
                >
                    New Contact
                </Button>
            </div>

            <CreateContact
                open={isCreateDialogOpen}
                onClose={() => setIsCreateDialogOpen(false)}
                onCreateSuccess={handleCreateSuccess}
            />

            <EditContact
                open={isEditDialogOpen}
                onClose={() => {
                    setIsEditDialogOpen(false);
                    setSelectedContact(null);
                }}
                onEditSuccess={handleEditSuccess}
                contactData={selectedContact}
            />

            
            {deleteDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this contact?</p>
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setDeleteDialogOpen(false);
                                    setContactToDelete(null);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Phone</TableCell>
                            <TableCell align="left">Company</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow
                                key={contact._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="contact">
                                    {contact.firstName}
                                </TableCell>
                                <TableCell align="left">{contact.lastName}</TableCell>
                                <TableCell align="left">{contact.email}</TableCell>
                                <TableCell align="left">{contact.phone}</TableCell>
                                <TableCell align="left">{contact.company}</TableCell>
                                <TableCell align="left">{contact.jobTitle}</TableCell>
                                <TableCell align="left">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleEditClick(contact)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => handleDeleteClick(contact)} 
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Contacts;