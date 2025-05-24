import { api } from "../config/config"

// import ObjectId from "bson-objectid";

export const fetchAllNotes = async () => {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    throw error;
  }
};

// export const fetchAllNotesFromLS = () =>
//   JSON.parse(localStorage.getItem("notes")) ?? [];

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

// export const getNoteByIdFromLS = (id) => {
//   const notes = JSON.parse(localStorage.getItem("notes")) || [];
//   return notes.find((note) => note._id === id) ?? null;
// };

// export const createNoteInLS = (note) => {
//   const notes = JSON.parse(localStorage.getItem("notes")) || [];
//   const noteId = new ObjectId().toString();
//   note._id = noteId;
//   notes.push({ _id: noteId, ...note });
//   localStorage.setItem("notes", JSON.stringify(notes));
//   return note;
// };


// export const createNoteInLS = async (note) => {
//   try {
//     const notes = JSON.parse(localStorage.getItem("notes")) || [];
//     const dbTags = await api.get('/tags');
//     const processedTags = await Promise.all(note.tags.map(async (tagName) => {
//       let existingTag = dbTags.find(t => t.name === tagName);

//       if (existingTag) {
//         console.log('Tag already exists:', existingTag);

//         return existingTag._id;
//       } else {
//         console.log('Tag does not exist, creating it:', tagName);
//         const newTag = {
//           _id: new ObjectId().toHexString(),
//           name: tagName
//         };
//         const createdTag = await api.post('/tags', newTag);
//          console.log('Tag created:', createdTag);
//         return newTag._id;
//       }
//     }));

//     const noteId = new ObjectId().toHexString();
//     console.log('Note ID:', noteId);
//     const newNote = {
//       _id: noteId,
//       ...note,
//       tags: processedTags
//     };

//     notes.push(newNote);
//     localStorage.setItem("notes", JSON.stringify(notes));
//     console.log('Note created:', newNote);

//     return newNote;
//   } catch (error) {
//     console.error('Error creating note:', error);
//     throw error;
//   }
// };

// export const createNote = async (data) => {
//   try {
//     const response = await api.post("/notes", data);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to create note:", error);
//     throw error;
//   }
// };

/**
 * Creates a note with automatic tag creation if needed
 * @param {Object} data - Note data including title, content, tags (array of tag names), and image
 * @returns {Promise<Object>} Created note with ObjectId references for tags
 */
export const createNote = async (data) => {
  try {
    // Get existing tags from db to check which ones need to be created
    const existingTagsResponse = await api.get("/tags");
    const existingTags = existingTagsResponse.data;

    // Create a map of existing tag names to their ObjectIds
    const existingTagMap = new Map(
      existingTags.map(tag => [tag.name, tag._id])
    );

    // Find which tags need to be created
    const tagsToCreate = data.tags.filter(tagName => !existingTagMap.has(tagName));

    // Create new tags if needed
    const newTagIds = await Promise.all(
      tagsToCreate.map(async (tagName) => {
        const newTag = {
          name: tagName
        };
        const response = await api.post("/tags", newTag);
        return response.data._id;
      })
    );

    // Map all tag names to their ObjectIds (both existing and new)
    const allTagIds = data.tags.map(tagName => {
      return existingTagMap.get(tagName) ||
        newTagIds[tagsToCreate.indexOf(tagName)];
    });

    // Create the note with ObjectId references
    const noteData = {
      ...data,
      tags: allTagIds,
      favorite: data.favorite || false,
    };

    const response = await api.post("/notes", noteData);
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

// export const add_IdToLSNotes = () => {
//   const notes = JSON.parse(localStorage.getItem("notes")) || [];
//   notes.forEach((note) => {
//     const newId = new ObjectId().toString();
//     note._id = newId;
//     delete note.id;
//   });
//   localStorage.setItem("notes", JSON.stringify(notes));
//   return notes;
// };

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



// export const updateNoteInLS = async (id, data) => {
//   const notes = JSON.parse(localStorage.getItem("notes")) || [];

//   try {
//     const index = notes.findIndex((note) => note._id === id);
//     if (index === -1) {
//       console.error(`Failed to update note #${id}: note not found in local storage`);
//       return null;
//     }

//     const note = notes[index];

//     let dbTags = [];
//     try {
//       dbTags = (await api.get("/tags")) || [];
//     } catch (error) {
//       console.error("Failed to fetch tags from API:", error);
//       dbTags = [];
//     }

//     const processedTagsIds = await Promise.all(data.tags.map(async (tagName) => {
//       let existingTag = dbTags.find(t => t.name === tagName);

//       if (existingTag) {
//         return existingTag._id;
//       } else {
//         const newTag = {
//           _id: new ObjectId().toHexString(),
//           name: tagName
//         };
//         await api.post('/tags', newTag);
//         return newTag._id;
//       }
//     }));


//     notes[index] = { ...note, ...data, tags: processedTagsIds };

//     localStorage.setItem("notes", JSON.stringify(notes));

//     return notes[index];
//   } catch (error) {
//     console.error("Failed to update note:", error);
//     throw error;
//   }
// };


export const deleteNote = async (id) => {
  try {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete note:", error);
    throw error;
  }
};

/**
 * LocalStorage Notes CRUD Operations
 * Note structure: { _id: string, title: string, content: string, tags: string[], image: string }
 */

/**
 * Get all notes from localStorage
 * @returns {Array} Array of notes
 */
export const fetchAllNotesFromLS = () => {
  try {
    return JSON.parse(localStorage.getItem('notes') || '[]');
  } catch (error) {
    console.error('Error getting notes:', error);
    return [];
  }
}

/**
 * Get a single note by ID
 * @param {string} id - Note ID
 * @returns {Object|null} Note object or null if not found
 */
export const getNoteByIdFromLS = (id) => {
  try {
    const notes = fetchAllNotesFromLS();
    return notes.find(note => note._id === id) || null;
  } catch (error) {
    console.error('Error getting note:', error);
    return null;
  }
}

/**
 * Create a new note
 * @param {Object} noteData - Note data without ID
 * @param {string} noteData.title - Note title
 * @param {string} noteData.content - Note content
 * @param {string[]} noteData.tags - Array of tag names
 * @param {string} noteData.image - Image data URL or path
 * @returns {Object} Created note with generated ID
 */
// export const createNoteInLS = ({ title, content, tags = [], image = '' }) => {
//   try {
//     const notes = fetchAllNotesFromLS();
//     const newNote = {
//       _id: new ObjectId().toHexString(),
//       title,
//       content,
//       tags,
//       image,
//       createdAt: new Date().toISOString()
//     };

//     notes.push(newNote);
//     localStorage.setItem('notes', JSON.stringify(notes));
//     return newNote;
//   } catch (error) {
//     console.error('Error creating note:', error);
//     throw error;
//   }
// }

/**
 * Update an existing note
 * @param {string} id - Note ID
 * @param {Object} updates - Fields to update
 * @returns {Object|null} Updated note or null if not found
 */
export const updateNoteInLS = (id, updates) => {
  try {
    const notes = fetchAllNotesFromLS();
    const noteIndex = notes.findIndex(note => note._id === id);

    if (noteIndex === -1) {
      return null;
    }

    // Prevent updating _id and createdAt
    const { _id, createdAt, ...rest } = updates;

    notes[noteIndex] = {
      ...notes[noteIndex],
      ...rest,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('notes', JSON.stringify(notes));
    return notes[noteIndex];
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
}

/**
 * Delete a note by ID
 * @param {string} id - Note ID
 * @returns {boolean} True if deleted, false if not found
 */
export const deleteNoteInLS = (id) => {
  try {
    const notes = fetchAllNotesFromLS();
    const initialLength = notes.length;
    const filteredNotes = notes.filter(note => note._id !== id);

    if (filteredNotes.length === initialLength) {
      return false;
    }

    localStorage.setItem('notes', JSON.stringify(filteredNotes));
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
}

/**
 * Search notes by title, content, or tags
 * @param {string} query - Search query
 * @returns {Array} Array of matching notes
 */
export const searchNotesInLS = (query) => {
  try {
    const notes = fetchAllNotesFromLS();
    const lowerQuery = query.toLowerCase();

    return notes.filter(note =>
      note.title.toLowerCase().includes(lowerQuery) ||
      note.content.toLowerCase().includes(lowerQuery) ||
      note.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error('Error searching notes:', error);
    return [];
  }
}



/**
 * Clear all notes from localStorage
 */
export const clearAllNotesFromLS = () => {
  try {
    localStorage.removeItem('notes');
  } catch (error) {
    console.error('Error clearing notes:', error);
    throw error;
  }
}


// export const deleteNoteInLS = (id) => {
//   //Attention, nouvelle version simplifiée
//   try {
//     const notes = JSON.parse(localStorage.getItem("notes")) ?? [];
//     const filteredNotes = notes.filter((note) => note._id !== id);
//     localStorage.setItem("notes", JSON.stringify(filteredNotes));
//   } catch (error) {
//     console.error("Failed to delete note from LocalStorage:", error);
//     throw error;
//   }
// };

// export const migrateTagsInLocalStorage = async () => {
//   try {
//     // Get existing data from LocalStorage
//     const notesJson = localStorage.getItem("notes");
//     const notes = notesJson ? JSON.parse(notesJson) : [];

//     // Get or initialize tags collection
//     const tagsJson = localStorage.getItem("tags");
//     let tags = tagsJson ? JSON.parse(tagsJson) : [];

//     // Get db tags
//     const dbTags = (await api.get("/tags")) ?? [];

//     // Add any DB tags that aren't in LocalStorage
//     if (dbTags && dbTags.length > 0) {
//       dbTags.forEach((dbTag) => {
//         if (!tags.find((t) => t._id === dbTag._id)) {
//           tags.push({
//             _id: dbTag._id,
//             name: dbTag.name,
//           });
//         }
//       });
//     }

//     // Create a map of tag names to their IDs
//     const tagNameToId = new Map();

//     // Collect all unique tag names from notes
//     const uniqueTagNames = new Set();
//     notes.forEach((note) => {
//       note.tags.forEach((tagName) => uniqueTagNames.add(tagName));
//     });

//     // Create tag objects for new tags
//     uniqueTagNames.forEach((tagName) => {
//       // First check if tag exists in LocalStorage
//       const existingTag = tags.find((t) => t.name === tagName);
//       if (existingTag) {
//         tagNameToId.set(tagName, existingTag._id);
//         return;
//       }

//       // Then check if it exists in DB
//       if (dbTags && dbTags.length > 0) {
//         const existingTagInDb = dbTags.find((t) => t.name === tagName);
//         if (existingTagInDb) {
//           tagNameToId.set(tagName, existingTagInDb._id);
//           // Add to LocalStorage tags if not already there
//           if (!tags.find((t) => t._id === existingTagInDb._id)) {
//             tags.push({
//               _id: existingTagInDb._id,
//               name: tagName,
//             });
//           }
//           return;
//         }
//       }

//       // If tag doesn't exist anywhere, create new one
//       const newTagId = new ObjectId().toString();
//       const newTag = {
//         _id: newTagId,
//         name: tagName,
//       };
//       tags.push(newTag);
//       tagNameToId.set(tagName, newTagId);
//     });

//     // Update notes to use tag IDs instead of names
//     const updatedNotes = notes.map((note) => ({
//       ...note,
//       tags: note.tags.map((tagName) => tagNameToId.get(tagName)),
//     }));

//     // Save updated data back to LocalStorage
//     localStorage.setItem("tags", JSON.stringify(tags));
//     localStorage.setItem("notes", JSON.stringify(updatedNotes));

//     return {
//       notes: updatedNotes,
//       tags: tags,
//     };
//   } catch (error) {
//     console.error("Error during tag migration:", error);
//     throw error;
//   }
// };


// export const migrateLocalStorageNotes = async () => {
//   try {
//     // Get notes from localStorage
//     const localNotes = JSON.parse(localStorage.getItem('notes') || '[]');

//     if (localNotes.length === 0) {
//       return { success: true, message: 'No notes to migrate' };
//     }

//     // Get all existing tags from database
//     const existingTagsResponse = await api.get('/tags');
//     const existingDbTags = existingTagsResponse.data;

//     // Create a map of tag names to their ObjectIds
//     const tagNameToId = new Map(
//       existingDbTags.map(tag => [tag.name, tag._id])
//     );

//     // Collect all unique tag names from local notes
//     const uniqueLocalTagNames = new Set(
//       localNotes.flatMap(note => note.tags)
//     );

//     // Create new tags that don't exist in the database
//     const newTagPromises = Array.from(uniqueLocalTagNames)
//       .filter(tagName => !tagNameToId.has(tagName))
//       .map(async tagName => {
//         const newTag = { _id: new ObjectId().toHexString(), name: tagName };
//         const response = await api.post('/tags', newTag);
//         tagNameToId.set(tagName, response.data._id);
//         return response.data;
//       });

//     await Promise.all(newTagPromises);

//     // Transform local notes to match database schema
//     const transformedNotes = localNotes.map(note => ({
//       _id: new ObjectId().toHexString(),
//       title: note.title,
//       content: note.content,
//       image: note.image,
//       tags: note.tags.map(tagName => tagNameToId.get(tagName))
//     }));

//     // Post all notes to database
//     const notePromises = await Promise.all(transformedNotes.map(note =>
//       api.post('/notes', note)
//     ));

//     // await Promise.all(notePromises);

//     // Clear localStorage only after successful migration
//     localStorage.removeItem('notes');

//     return notePromises;

//   } catch (error) {
//     console.error('Migration failed:', error);
//     throw error;
//   }
// }