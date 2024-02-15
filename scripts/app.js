import { saveToLocalStorage, getlocalStorage, removeFromLocalStorage } from "./localstorage.js";
import {Reload, isFloat, round} from "./functions.js";

let updateBudgetBtn = document.getElementById('updateBudgetBtn');
let addExpenseBtn = document.getElementById('addExpenseBtn');

let budgetBack = document.getElementById('budgetBack');
let expenseBack = document.getElementById('expenseBack');


let expenseSummaryDiv = document.getElementById('expenseSummaryDiv');
let updateBudgetDiv = document.getElementById('updateBudgetDiv');
let newExpenseDiv = document.getElementById('newExpenseDiv');

let moneyTotal = document.getElementById('moneyTotal');
let updateInput = document.getElementById('updateInput');
let updateBtn = document.getElementById('updateBtn');

let newExpenseNotif = document.getElementById('newExpenseNotif');
let expenseNameInput = document.getElementById('expenseNameInput');
let expenseCostInput = document.getElementById('expenseCostInput');
let newExpenseBtn = document.getElementById('newExpenseBtn');

let totalElement = document.getElementById('totalElement');


//menuing
updateBudgetBtn.addEventListener('click', () => {
    expenseSummaryDiv.classList.add("hidden");
    updateBudgetDiv.classList.remove("hidden");
    newExpenseDiv.classList.add("hidden");

})
addExpenseBtn.addEventListener('click', () => {
    expenseSummaryDiv.classList.add("hidden");
    updateBudgetDiv.classList.add("hidden");
    newExpenseDiv.classList.remove("hidden");

})
budgetBack.addEventListener('click', () => {
    expenseSummaryDiv.classList.remove("hidden");
    updateBudgetDiv.classList.add("hidden");
    newExpenseDiv.classList.add("hidden");

    Reload();

})
expenseBack.addEventListener('click', () => {
    expenseSummaryDiv.classList.remove("hidden");
    updateBudgetDiv.classList.add("hidden");
    newExpenseDiv.classList.add("hidden");

    Reload()

})

//Btns with logic
updateBtn.addEventListener('click', () => {
    let num = (updateInput.value);
    let isNum = isFloat(num);

    console.log(isNum);

    if (isNum) {
        moneyTotal.textContent = `$${round(num)}`

        let saveArr = {};
        saveArr.name = "moneyTotalSuperSecertName";
        saveArr.amount = round(num);
        removeFromLocalStorage(saveArr.name);
        saveToLocalStorage(saveArr);
        Reload();
    }


})

newExpenseBtn.addEventListener('click', () => {
    let num = (expenseCostInput.value);
    let isNum = isFloat(num);
    let data = getlocalStorage();
    const inList = data.some(obj => obj.name === expenseNameInput.value);

    console.log(inList)

    if (isNum && expenseNameInput.value && !inList) {
        newExpenseNotif.textContent = `ADDED: ${expenseNameInput.value} - $${round(num)}`
        let saveArr = {};
        saveArr.name = expenseNameInput.value;
        saveArr.amount = round(num);
        saveToLocalStorage(saveArr);
        Reload();
    }
    else {
        newExpenseNotif.textContent = "Must input Name for new item and a correct number in the amount"
    }
})


//on load first load we need to run the Reload funciton
Reload()





