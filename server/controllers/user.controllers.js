import { db } from '../config/db.js';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';


const collection = db.collection('users');


export const getUsers = async (req, res) => {
    try {
        const users = await collection.find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
};


export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.id;


        if (!ObjectId.isValid(userId)) {
            return next({ status: 400, message: 'ID tidak valid.' });
        }

        const user = await collection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return next({ status: 404, message: 'User not found!' });
        }

        res.status(200).json(user);
    } catch (error) {
        next({ status: 500, message: 'Terjadi kesalahan pada server.', error });
    }
};


export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

    
        if (!ObjectId.isValid(userId)) {
            return next({ status: 400, message: 'ID tidak valid.' });
        }

    
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }


        const query = { _id: new ObjectId(userId) };

    
        const updateData = {
            $set: {
                ...req.body, 
                updatedAt: new Date(), 
            },
        };


        const options = { returnDocument: 'after', upsert: false };
        const updatedUser = await collection.findOneAndUpdate(query, updateData, options);


        if (!updatedUser.value) {
            return next({ status: 404, message: 'User not found!' });
        }


        const { password, ...rest } = updatedUser.value;

        res.status(200).json(rest);
    } catch (error) {
        next({ status: 500, message: 'Terjadi kesalahan pada server.', error });
    }
};

export const deleteUser = async (req, res, next) => {
    try {

        const query = { _id: new ObjectId(req.params.id) };


        const result = await collection.deleteOne(query);


        if (result.deletedCount === 0) {
            return next({ status: 404, message: 'User not found!' });
        }


        res.status(200).json({ message: 'User has been deleted!' });
    } catch (error) {
    
        next({ status: 500, error });
    }
};