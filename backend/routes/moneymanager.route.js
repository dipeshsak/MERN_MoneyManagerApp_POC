import express from 'express';

import {getAllExpense,createExpense,deleteExpense,updateExpense} from '../controller/moneymanager.controller.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

// GET ALL EXPENSES
router.post("/all",authenticateToken, getAllExpense)

// CREATE EXPENSE
router.post("/",authenticateToken,createExpense )

// DELETE EXPENSE
router.delete("/:id",authenticateToken,deleteExpense)

// UPDATE EXPENSE
router.put("/:id",authenticateToken,updateExpense)

export default router;