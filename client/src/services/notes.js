import axios from "axios";
import ObjectId from "bson-objectid";
const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

export const fetchAllNotes = async () => {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

export const fetchAllNotesFromLS = () =>
  JSON.parse(localStorage.getItem("notes")) ?? [];

export const getNotesByCreatorId = async (creator_id) => {
  try {
    const response = await api.get(`/notes/by-creator/${creator_id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch notes of creator #${creator_id}:`, error);
    throw error;
  }
};

export const getNotesByTag = async (tag) => {
  try {
    const response = await api.get(`/notes/by-tag/${tag}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes by tag:", error);
    throw error;
  }
};

export const getNotesByTagFromLS = async (tag) => {
  try {
    let notes = JSON.parse(localStorage.getItem("notes")) ?? [];
    notes = notes.filter((note) => {
      return note.tags === tag;
    });
    return notes;
  } catch (error) {
    console.error("Failed to fetch notes by tag:", error);
    throw error;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch note by id:", error);
    throw error;
  }
};

export const getNoteByIdFromLS = (id) => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  return notes.find((note) => note._id === id) ?? null;
};

// export const createNoteInLS = (note) => {
//   const notes = JSON.parse(localStorage.getItem("notes")) || [];
//   const noteId = new ObjectId().toString();
//   note._id = noteId;
//   notes.push({ _id: noteId, ...note });
//   localStorage.setItem("notes", JSON.stringify(notes));
//   return note;
// };


export const createNoteInLS = async (note) => {
  try {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const dbTags = await api.get('/tags');
    const processedTags = await Promise.all(note.tags.map(async (tagName) => {
      let existingTag = dbTags.find(t => t.name === tagName);

      if (existingTag) {
        return existingTag._id;
      } else {
        const newTag = {
          _id: new ObjectId().toHexString(),
          name: tagName
        };
        await api.post('/tags', newTag);
        return newTag._id;
      }
    }));

    const noteId = new ObjectId().toHexString();
    const newNote = {
      _id: noteId,
      ...note,
      tags: processedTags
    };

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));

    return newNote;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

export const createNote = async (data) => {
  try {
    const response = await api.post("/notes", data);
    return response.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export const updateNote = async (id, data) => {
  try {
    const response = await api.patch(`/notes/${id}`, data); //Attention, avant : put
    return response.data;
  } catch (error) {
    console.error("Failed to update note:", error);
    throw error;
  }
};

export const add_IdToLSNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => {
    const newId = new ObjectId().toString();
    note._id = newId;
    delete note.id;
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  return notes;
};

export const addTagsToLSNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => {
    if (!note.tags) {
      note.tags = ["foo", "bar"];
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  return notes;
};

export const updateNoteInLS = (id, data) => {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const index = notes.findIndex((note) => note._id === id);
  if (index === -1) {
    console.error(
      `Failed to update note #${id}: note not found in local storage`
    );
    return null;
  }
  const note = notes[index];
  if (!note) {
    console.error(`Failed to update note #${id}: note is null`);
    return null;
  }

  //Vérifier si les nouveaux tags existent en db, si oui mettre leurs ids dans la propriété tags de la note, sinon créer de nouveaux tags dans la db, et mettre leurs objectId dans la propriété tags de la note updatées



  notes[index] = { ...note, ...data };
  localStorage.setItem("notes", JSON.stringify(notes));
  return notes[index];
};

export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};

// export const deleteNoteInLS = (id) => {
//     const notes = JSON.parse(localStorage.getItem('notes')) || [];
//     const index = notes.findIndex(note => note.id === id);
//     if (index === -1) {
//         console.error(`Failed to delete note #${id}: note not found in local storage`);
//         return null;
//     }
//     const note = notes[index];
//     if (!note) {
//         console.error(`Failed to delete note #${id}: note is null`);
//         return null;
//     }
//     notes.splice(index, 1);
//     localStorage.setItem('notes', JSON.stringify(notes));
//     return note;
// }

export const deleteNoteInLS = (id) => {
  //Attention, nouvelle version simplifiée
  try {
    const notes = JSON.parse(localStorage.getItem("notes")) ?? [];
    const filteredNotes = notes.filter((note) => note._id !== id);
    localStorage.setItem("notes", JSON.stringify(filteredNotes));
  } catch (error) {
    console.error("Failed to delete note from LocalStorage:", error);
    throw error;
  }
};

export const migrateTagsInLocalStorage = async () => {
  try {
    // Get existing data from LocalStorage
    const notesJson = localStorage.getItem("notes");
    const notes = notesJson ? JSON.parse(notesJson) : [];

    // Get or initialize tags collection
    const tagsJson = localStorage.getItem("tags");
    let tags = tagsJson ? JSON.parse(tagsJson) : [];

    // Get db tags
    const dbTags = (await api.get("/tags")) ?? [];

    // Add any DB tags that aren't in LocalStorage
    if (dbTags && dbTags.length > 0) {
      dbTags.forEach((dbTag) => {
        if (!tags.find((t) => t._id === dbTag._id)) {
          tags.push({
            _id: dbTag._id,
            name: dbTag.name,
          });
        }
      });
    }

    // Create a map of tag names to their IDs
    const tagNameToId = new Map();

    // Collect all unique tag names from notes
    const uniqueTagNames = new Set();
    notes.forEach((note) => {
      note.tags.forEach((tagName) => uniqueTagNames.add(tagName));
    });

    // Create tag objects for new tags
    uniqueTagNames.forEach((tagName) => {
      // First check if tag exists in LocalStorage
      const existingTag = tags.find((t) => t.name === tagName);
      if (existingTag) {
        tagNameToId.set(tagName, existingTag._id);
        return;
      }

      // Then check if it exists in DB
      if (dbTags && dbTags.length > 0) {
        const existingTagInDb = dbTags.find((t) => t.name === tagName);
        if (existingTagInDb) {
          tagNameToId.set(tagName, existingTagInDb._id);
          // Add to LocalStorage tags if not already there
          if (!tags.find((t) => t._id === existingTagInDb._id)) {
            tags.push({
              _id: existingTagInDb._id,
              name: tagName,
            });
          }
          return;
        }
      }

      // If tag doesn't exist anywhere, create new one
      const newTagId = new ObjectId().toString();
      const newTag = {
        _id: newTagId,
        name: tagName,
      };
      tags.push(newTag);
      tagNameToId.set(tagName, newTagId);
    });

    // Update notes to use tag IDs instead of names
    const updatedNotes = notes.map((note) => ({
      ...note,
      tags: note.tags.map((tagName) => tagNameToId.get(tagName)),
    }));

    // Save updated data back to LocalStorage
    localStorage.setItem("tags", JSON.stringify(tags));
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    return {
      notes: updatedNotes,
      tags: tags,
    };
  } catch (error) {
    console.error("Error during tag migration:", error);
    throw error;
  }
};
