import express from 'express';

import {getAllExpense,createExpense,deleteExpense,updateExpense} from '../controller/moneymanager.controller.js';
const router = express.Router();

// GET ALL EXPENSES
router.get("/", getAllExpense)

// CREATE EXPENSE
router.post("/",createExpense )

// DELETE EXPENSE
router.delete("/:id",deleteExpense)

// UPDATE EXPENSE
router.put("/:id",updateExpense)

export default router;