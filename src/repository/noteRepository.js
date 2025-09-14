const Note  = require("../models/notes");
const Tenant = require("../models/tenant");

class NoteRepository {
  async createNote({ title, content, userId, tenantId }) {
    try {
      const tenant = await Tenant.findById(tenantId);
      if (!tenant) throw new Error("Tenant not found");

      if (tenant.plan === "free") {
        const count = await Note.countDocuments({ tenantId });
        if (count >= 3) throw new Error("Free plan limit reached. Upgrade to Pro.");
      }

      const note = new Note({ title, content, userId, tenantId });
      return await note.save();
    } catch (err) {
      throw new Error(`Failed to create note: ${err.message}`);
    }
  }

  async getNotes(tenantId) {
    try {
      return await Note.find({ tenantId });
    } catch (err) {
      throw new Error(`Failed to fetch notes: ${err.message}`);
    }
  }

  async getNoteById(id, tenantId) {
    try {
      const note = await Note.findOne({ _id: id, tenantId });
      if (!note) throw new Error("Note not found");
      return note;
    } catch (err) {
      throw new Error(`Failed to fetch note: ${err.message}`);
    }
  }

  async updateNote(id, tenantId, data) {
    try {
      const note = await Note.findOneAndUpdate({ _id: id, tenantId }, data, { new: true });
      if (!note) throw new Error("Note not found or not authorized");
      return note;
    } catch (err) {
      throw new Error(`Failed to update note: ${err.message}`);
    }
  }

  async deleteNote(id, tenantId) {
    try {
      const note = await Note.findOneAndDelete({ _id: id, tenantId });
      if (!note) throw new Error("Note not found or not authorized");
      return note;
    } catch (err) {
      throw new Error(`Failed to delete note: ${err.message}`);
    }
  }
};

module.exports = NoteRepository;