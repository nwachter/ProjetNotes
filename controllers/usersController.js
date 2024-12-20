// const { MongoClient, ObjectId } = require('mongodb');


// const getAllUsers = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;

//     try {
//         const client = new MongoClient(MONGODB_URI);
//         // const data = readData("notes");
//         const database = client.db('ProjetNotes');
//         const usersCollection = database.collection('users');
//         const options = { ordered: true };
//         const data = await usersCollection.find({}, options)?.toArray();

//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch users" });
//     }
//     finally {
//         await client.close();
//     }
// }

// const getUserById = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;

//     try {
//         const client = new MongoClient(MONGODB_URI);
//         // const data = readData("notes");
//         const database = client.db('ProjetNotes');
//         const usersCollection = database.collection('users');
//         const options = { ordered: true };
//         const objectId = new ObjectId(req.params.id);

//         const data = await usersCollection.findOne({ _id: objectId }, options);

//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: "Failed to fetch user by id" });
//     }
//     finally {
//         await client.close();
//     }
// }

// const updateUser = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;

//     try {
//         const client = new MongoClient(MONGODB_URI);
//         const database = client.db('ProjetNotes');
//         const usersCollection = database.collection('users');
//         const updatedUser = {
//             $set: {
//                 ...req.body
//             }
//         }
//         const objectId = new ObjectId(req.params.id);
//         const query = { _id: objectId };
//         const result = await usersCollection.updateOne(query, updatedUser);

//         if (result.matchedCount === 1) {
//             res.json({ message: "User Updated" });
//         } else {
//             res.status(404).json({ error: "User not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Failed to update user" });
//     }
//     finally {
//         await client.close();
//     }
// }

// const deleteUser = async (req, res) => {
//     const MONGODB_URI = process.env.MONGODB_URI;

//     try {
//         const client = new MongoClient(MONGODB_URI);
//         const database = client.db('ProjetNotes');
//         const usersCollection = database.collection('users');
//         const objectId = new ObjectId(req.params.id);
//         const query = { _id: objectId };


//         const result = await usersCollection.deleteOne(query);

//         if (result.deletedCount === 1) {
//             res.json({ message: "User deleted" });
//         } else {
//             res.status(404).json({ error: "User not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Failed to delete user" });
//     }
//     finally {
//         await client.close();
//     }
// }

// module.exports = { getAllUsers, getUserById, updateUser, deleteUser };


const UserModel = require('../models/User');
const { ObjectId } = require('mongoose').Types;

const getAllUsers = async (req, res) => {
    try {
        const data = await UserModel.find({});
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

const getUserById = async (req, res) => {
    try {
        const data = await UserModel.findById(req.params.id);

        if (!data) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user by id" });
    }
}


const updateUser = async (req, res) => {

    if (req.body.userId !== req.params.id) {
        //on compare l'id envoye dans les params avec l'id dans le body     //Quand on login, l'id est tjrs présent dans le body
        return res.status(500).json({
            error: "You can only update your own profile"
        })
    }

    // console.log("Body userId : ", req.body.userId);

    try {
        let updatedData = { ...req.body };
        //CHECK PASSWORD IF PROVIDED
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.password = await bcrypt.hash(req.body.password, salt);
        }

        //UPDATE USER DATA
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.body.id,
            { $set: updatedData }, // UPDATE FIELDS PROVIDED IN THE REQUEST BODY, FIELDS NOT INCLUDED IN req.body WILL NOT BE UPDATED
            { new: true } //ENSURES THAT THE METHOD RETURNS THE NEW UPDATED DATA, NOT THE OLD ONE
        );
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error('Updating error', error);
        res.status(500).json({ error: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        //Validate id
        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        console.log("id to delete : ", id);
        console.log("req.user : ", req.user);

        //CHECK IF USER TRYING TO DELETE THEIR OWN USER OR IS NOT ADMIN
        if (req.user.id === id && req.user.isAdmin) { //if user tries to delets his own account and user is admin, he can't delete
            return res.status(403).json({ error: "You are not authorized to delete this user" });
        }

        //Check if user exists in the database
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // DELETE USER FROM DB
        await UserModel.findByIdAndDelete(id);

        //CHECK IF USER THAT I WANT TO DELETE EXISTS
        res.status(200).json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.error('Deleting user error', error);
        res.status(500).json({ error: "Error during user deletion :" + error.message });
    }
}


module.exports = { getAllUsers, getUserById, updateUser, deleteUser };