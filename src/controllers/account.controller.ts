import { Request, Response } from "express";
import Account, { IAccount } from "../models/account.model";
import { Types } from 'mongoose';

interface ICreateAccountInput {
    email: IAccount["email"];
    username: IAccount["username"];
    fullName: IAccount["fullName"];
    password: IAccount["password"];
}

const createAccount = async (req: Request, res: Response) => {
    try {
        const { email, username, password, fullName }: ICreateAccountInput = req.body;
        let user = await Account.create({
            email,
            username,
            password,
            fullName,
        });

        res.json({ user: user.toJSON() });
    }
    catch (err) {
        res.status(500).send(String(err));
    }
};

const getAccount = async (req: Request, res: Response) => {
    try {
        const { id: paramId } = req.params;
        var id = new Types.ObjectId(paramId);
    }
    catch (err) {
        return res.status(400).send('Missing required query param "id"');
    }

    let account = await Account.findOne({ _id: new Types.ObjectId(id) });

    if (!account)
        return res.status(404).send("Account not found");

    res.json({
        account: account.toJSON()
    });
};

const listAccounts = async (req: Request, res: Response) => {
    const { pageSize = 10, page = 1 } = req.query;

    const limit = Number(pageSize);
    const skip = (Number(page) - 1) * limit;

    const count = await Account.countDocuments();
    const totalPages = Math.ceil(count / limit);

    const accounts = await Account.find({})
        .limit(limit)
        .skip(skip)
        .exec();

    res.json({
        accounts,
        count,
        totalPages,
        pageSize: Number(pageSize),
        currentPage: Number(page),
    });
};

const updateAccount = async (req: Request, res: Response) => {
    try {
        const { id: paramId } = req.params;
        var id = new Types.ObjectId(paramId);
    }
    catch (err) {
        return res.status(400).send('Wrong query param "id". Must be a valid "ObjectId"');
    }

    try {
        const account = await Account.findOneAndUpdate({ _id: id }, req.body, { new: true });

        if (!account)
            return res.status(404).json({ error: 'Account not found' });

        return res.json(account.toJSON());
    }
    catch (err) {
        res.status(500).send(String(err));
    }
};

const deleteAccount = async (req: Request, res: Response) => {
    try {
        const { id: paramId } = req.params;
        var id = new Types.ObjectId(paramId);
    }
    catch (err) {
        return res.status(400).send('Missing required query param "id"');
    }

    let account = await Account.findOneAndDelete({ _id: new Types.ObjectId(id) });

    if (!account)
        return res.status(404).send("Account not found");

    res.json({
        account: account.toJSON()
    });
};

export default {
    createAccount,
    getAccount,
    listAccounts,
    deleteAccount,
    updateAccount,
};
