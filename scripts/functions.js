import { getlocalStorage, removeFromLocalStorage } from "./localstorage.js";

//createList
function createItem(name, amount) {
    // Create the parent div
    var parentDiv = document.createElement('div');
    parentDiv.id = name;
    parentDiv.classList.add('grid', 'grid-cols-4', 'my-2');

    // Create the first child div
    var firstChildDiv = document.createElement('div');
    firstChildDiv.classList.add('items-center', 'flex', 'justify-center');

    // Create the first paragraph element
    var firstParagraph = document.createElement('p');
    firstParagraph.classList.add('px-3');
    firstParagraph.textContent = name;

    // Append the first paragraph to the first child div
    firstChildDiv.appendChild(firstParagraph);

    // Create the second child div for the dot
    var dotDiv = document.createElement('div');
    dotDiv.classList.add('dot');

    // Create the third child div
    var thirdChildDiv = document.createElement('div');
    thirdChildDiv.classList.add('items-center', 'flex', 'justify-center');

    // Create the second paragraph element
    var secondParagraph = document.createElement('p');
    secondParagraph.classList.add('px-3', 'break-words', 'w-[90%]');
    secondParagraph.textContent = `$-${amount}`;

    // Append the second paragraph to the third child div
    thirdChildDiv.appendChild(secondParagraph);

    // Create the fourth child div
    var fourthChildDiv = document.createElement('div');
    fourthChildDiv.classList.add('items-center', 'flex', 'justify-center');

    // Create the button element
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('focus:outline-none', 'text-white', 'bg-red-700', 'hover:bg-red-800', 'focus:ring-4', 'focus:ring-red-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-4', 'py-1.5', 'dark:bg-red-600', 'dark:hover:bg-red-700', 'dark:focus:ring-red-900');
    button.textContent = 'REMOVE';
    button.addEventListener('click', ()=>{
        removeFromLocalStorage(name);
        parentDiv.classList.add("hidden")
        Reload();

    })

    // Append the button to the fourth child div
    fourthChildDiv.appendChild(button);

    // Append all child elements to the parent div
    parentDiv.appendChild(firstChildDiv);
    parentDiv.appendChild(dotDiv);
    parentDiv.appendChild(thirdChildDiv);
    parentDiv.appendChild(fourthChildDiv);

    // Append the parent div to the document body or any desired element
    expenseSummaryDiv.appendChild(parentDiv);
}

function Reload() {
    let data = getlocalStorage();
    let findTotal = data.find(obj => obj.name === "moneyTotalSuperSecertName");
    let findExpense = data.filter(obj => obj.name !== "moneyTotalSuperSecertName");
    console.log(findExpense)

    if(findTotal){
       moneyTotal.textContent = `$${round(findTotal.amount)}` 
    }
    else{
        moneyTotal.textContent = "$0"
    }
    expenseSummaryDiv.textContent= "";

    let expenseTotal = 0;
    findExpense.map(item =>{
        createItem(item.name, item.amount)
       expenseTotal  += item.amount;
    })

    totalElement.textContent = "$" +(findTotal.amount -expenseTotal )
    
}

//export to functions later
function isFloat(input) {
    return parseFloat(input.match(/^-?\d*(\.\d+)?$/)) !== null;

}
function round(number) {
    return Math.round(number * 100) / 100;
}

export {createItem, Reload, isFloat, round}