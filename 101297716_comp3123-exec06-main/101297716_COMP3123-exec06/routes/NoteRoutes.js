const express = require('express');
const router = express.Router(); 
const noteModel = require('../models/NotesModel'); 


//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
router.post('/notes', (req, res) => {
    
    // if the body is empty, throw error
    if (!req.body.content) {
        return res.status(400).send({message: "Note content can not be empty"});
    }

    // Create a new note instance
    const newNote = new noteModel({
        content: req.body.content
    });

    // Save the note to the database
    newNote.save()
        .then(note => {
            res.send(note);
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred while creating the note.', error: error.message });
        });
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
router.get('/notes', (req, res) => {
    noteModel.find()
        .then(notes => {
            res.send(notes);
        })
        .catch(error => {
            res.status(500).json({ message: 'An error occurred while getting the notes.', error: error.message });
        });
});


//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
router.get('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    // if the body is empty, throw error
    if (!req.body.content) {
        return res.status(400).send({message: "Note content can not be empty"});
    }

    noteModel.findById(noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({message: "Note not found with id " + noteId});
            }
            res.send(note);
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + noteId});
            }
            return res.status(500).send({message: "Error retrieving note with id " + noteId});
        });
});


//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
router.put('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    // if the body is empty, throw error
    if (!req.body.content) {
        return res.status(400).send({message: "Note content can not be empty"});
    }

    // Update the note in the database
    noteModel.findByIdAndUpdate(noteId, {
        content: req.body.content
    }, { new: true })
        .then(note => {
            if (!note) {
                return res.status(404).send({ message: "Note not found with id " + noteId});
            }
            res.send(note);
        })
        .catch(error => {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({message: "Note not found with id " + noteId});
            }
            return res.status(500).send({message: "Error updating note with id " + noteId});
        });
});


//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
router.delete('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;

    // if the body is empty, throw error
    if (!req.body.content) {
        return res.status(400).send({message: "Note content can not be empty"});
    }

    // Delete the note from the database
    noteModel.findByIdAndRemove(noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({message: "Note not found with id " + noteId});
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                return res.status(404).send({message: "Note not found with id " + noteId});
            }
            return res.status(500).send({message: "Could not delete note with id " + noteId});
        });
});

module.exports = router;
