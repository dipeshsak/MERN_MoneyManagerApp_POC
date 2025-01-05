// import {create} from 'zustand';

// export const useExpenseStore = create((set)=>({
// expenses:[],
// setExpenses:(expenses)=>set({expenses}),
// createExpense:async (newExpense)=>{

//     const res = await fetch("/api/expense",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(newExpense)
//     })
//     const data = await res.json();
//     set((state)=>({
//         expenses:[...state.expenses,data.data]
//     }))
//     return {success:true,message:'Expense Created Success'}
// }
// }))