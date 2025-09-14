const NoteRepository = require("../repository/noteRepository");

const noteRepo = new NoteRepository();

const createNote = async (req, res) => {
  try {
    // console.log(req.user);
    const { title, content } = req.body;
    const { userId, tenantId } = req.user;
    const note = await noteRepo.createNote({ title, content, userId, tenantId });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const { tenantId } = req.user;
    const notes = await noteRepo.getNotes(tenantId);
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    const note = await noteRepo.getNoteById(id, tenantId);
    res.status(200).json(note);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    const note = await noteRepo.updateNote(id, tenantId, req.body);
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenantId } = req.user;
    const note = await noteRepo.deleteNote(id, tenantId);
    res.status(200).json({ message: "Note deleted", note });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = {
    createNote,
    getNotes,
    getNote,
    updateNote,
    deleteNote
}