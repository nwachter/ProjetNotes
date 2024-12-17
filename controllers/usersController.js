const { MongoClient, ObjectId } = require('mongodb');


const getAllUsers = async (req, res) => {
    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        const client = new MongoClient(MONGODB_URI);
        // const data = readData("notes");
        const database = client.db('ProjetNotes');
        const usersCollection = database.collection('users');
        const options = { ordered: true };
        const data = await usersCollection.find({}, options)?.toArray();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
    finally {
        await client.close();
    }
}

const getUserById = async (req, res) => {
    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        const client = new MongoClient(MONGODB_URI);
        // const data = readData("notes");
        const database = client.db('ProjetNotes');
        const usersCollection = database.collection('users');
        const options = { ordered: true };
        const data = await usersCollection.findOne({ _id: MongoClient.ObjectId(req.params.id) });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user by id" });
    }
    finally {
        await client.close();
    }
}

const updateUser = async (req, res) => {
    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        const client = new MongoClient(MONGODB_URI);
        const database = client.db('ProjetNotes');
        const usersCollection = database.collection('users');
        const updatedUser = {
            $set: {
                ...req.body
            }
        }
        const query = { _id: MongoClient.ObjectId(req.params.id) };
        const result = await usersCollection.updateOne(query, updatedUser);

        if (result.matchedCount === 1) {
            res.json({ message: "User Updated" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to update user" });
    }
    finally {
        await client.close();
    }
}

const deleteUser = async (req, res) => {
    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        const client = new MongoClient(MONGODB_URI);
        const database = client.db('ProjetNotes');
        const usersCollection = database.collection('users');
        // const query = { _id: MongoClient.ObjectId(req.params.id) };
        const query = { _id: client.ObjectId(req.params.id) };


        const result = await usersCollection.deleteOne(query);

        if (result.deletedCount === 1) {
            res.json({ message: "User deleted" });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
    finally {
        await client.close();
    }
}

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };