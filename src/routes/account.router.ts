import express from 'express';
import accountController from '../controllers/account.controller';


const accountRouter = express.Router();

accountRouter.get('/', accountController.listAccounts);
accountRouter.post('/', express.json(), accountController.createAccount);
accountRouter.get('/:id', accountController.getAccount);
accountRouter.put('/:id', express.json(), accountController.updateAccount);
accountRouter.delete('/:id', accountController.deleteAccount);

export { accountRouter };
