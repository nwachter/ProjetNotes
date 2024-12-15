const { readData, writeData } = require('../utils/fileHandler');

//Get All Notes
const getAllNotes = (req, res) => {
    try {
        const data = readData("notes");
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch notes" });
    }
}

//Get Note by id
const getNoteById = (req, res) => {
    const data = readData("notes");
    const note = data.find((note) => note.id === parseInt(req.params.id));
    if (!note) {
        return res.status(404).json({ error: "Note not found" });
    }
    res.json(note);
}

//Create Note
const signupUser = (req, res) => {
    const data = readData("users");
    const newUser = {
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1, //Auto increment ID
        //Test si il y a des objets => incrémenter de 1 SINON ajouter id 1
        ...req.body

    };
    data.push(newUser);
    writeData(data, "users");
    res.status(201).json(newNote);
}

//Delete Note
const deleteNote = (req, res) => {
    const data = readData("notes");
    const updatedData = data.filter((Note) => Note.id !== parseInt(req.params.id));

    if (data.length === updatedData.length) {
        return res.status(404).json({ error: "Note not found" });
    }
    writeData(updatedData, "notes");

    console.log(`Note with ID ${req.params.id} deleted`);

    res.status(200).json({ message: `Note with ID ${req.params.id} deleted` });

}

const updateNote = (req, res) => {
    const data = readData();
    const noteIndex = data.findIndex((note) => note.id === parseInt(req.params.id));

    if (noteIndex === -1) {
        return res.status(404).json({ error: "Note not found" });
    }
    data[noteIndex] = {
        id: parseInt(req.params.id),
        ...req.body
    };
    writeData(data, "notes");
    res.json(data[noteIndex])
}


const getAllPostsController = async (req, res) => {
    try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");

        if (resp.status !== StatusCodes.OK) {
            return response(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                true,
                { data: null },
                resp.statusText
            );
        }

        const data = await resp.json();
        return res.status(404).json({ error: "Fake POSTS not found" });
    } catch (error) {
        console.log("error", error);

        response(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            true,
            { data: null },
            error.message
        );
    }
};

module.exports = { getAllNotes, getNoteById, createNote, deleteNote, updateNote, getAllPostsController };