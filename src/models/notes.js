import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true 
    },
  content: { 
    type: String 
    },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
  tenantId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tenant",
    required: true 
    }
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);
module.exports = Note;