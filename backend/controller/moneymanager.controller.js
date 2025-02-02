import MoneyManager from '../models/moneymanager.model.js';
import mongoose from 'mongoose';


export const getAllExpense = async (req,res)=>{
    console.log("REQ",req.body)
    try{
      const expenses = await MoneyManager.find({ userId: req.body.userId });
      res.status(200).json({success:true,data:expenses});
    }catch(error){
        res.status(200).json({success:false,message:'Server Error'});

    }
}

export const createExpense = async (req, res) => {
    const expense = req.body;
    console.log("EXPESNSE",expense)
    if (!expense.title || !expense.price || !expense.catagory) {
        return res.status(400).json({ status: false, message: 'Please provide all fields' })
    }

    const newExpense = new MoneyManager(expense);

    try {
        await newExpense.save();

         res.status(201).json({ success: true, data: newExpense })
    } catch (error) {
        console.log('Error while adding Expense', error.message)
        res.status(500).json({ success: false, message: 'Server Error' })

    }
}

export const deleteExpense =async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:'Invalid Product ID'})
      }

    try{
        await MoneyManager.findByIdAndDelete(id);
         res.status(200).json({success:true,message:'Expense Deleted'})

    }catch(error){
         res.status(500).json({success:false,message:'Server Error'})

    }

}

export const updateExpense = async(req,res)=>{
    const {id} = req.params;
    const expense = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({success:false,message:'Invalid Product ID'})
    }

    try{
        const updatedExpense =  await MoneyManager.findByIdAndUpdate(id,expense,{new:true});
         res.status(200).json({success:true,data:updatedExpense})

    }catch(error){
         res.status(500).json({success:false,message:'Server Error'})

    }

}