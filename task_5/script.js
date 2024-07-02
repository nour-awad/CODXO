let totalAmount = document.getElementById("total-amount");
const checkAmount = document.getElementById("check-amount");
const totalAmountBtn = document.getElementById("totalBtn");
const productTitle = document.getElementById("ptitle");
const productPrice = document.getElementById("pPrice");
const errorMessage = document.getElementById("bError");
const productErrorMessage = document.getElementById("eError");
const amount = document.getElementById("amount");
const expenses = document.getElementById("expenses-val");
const balance = document.getElementById("balance");
const list = document.getElementById("list");
let tempAmount = 0;

totalAmountBtn.addEventListener("click", () => {
    tempAmount = parseFloat(totalAmount.value);
    if (isNaN(tempAmount) || tempAmount <= 0) {
        errorMessage.classList.remove("hide");
    } else {
        errorMessage.classList.add("hide");

        amount.innerText = tempAmount.toFixed(2);
        balance.innerText = (tempAmount - parseFloat(expenses.innerText)).toFixed(2);
        totalAmount.value = "";
    }
});

const disable = (bool) => {
    let editBtn = document.getElementsByClassName("edit");
    Array.from(editBtn).forEach(element => {
        element.disabled = bool;
    });
};

const modify = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let curBalance = parseFloat(balance.innerText);
    let curExpenses = parseFloat(expenses.innerText);
    let parentAmount = parseFloat(parentDiv.querySelector(".amount").innerText);

    if (edit) {
        let parentText = parentDiv.querySelector(".product").innerText;
        productTitle.value = parentText;
        productPrice.value = parentAmount;
        disable(true);
    }
    balance.innerText = (curBalance + parentAmount).toFixed(2);
    expenses.innerText = (curExpenses - parentAmount).toFixed(2);
    parentDiv.remove();
};

const listCreator = (expenseName, expenseCost) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseCost.toFixed(2)}</p>`;
    
    let editBtn = document.createElement("button");
    editBtn.classList.add("fa-regular", "fa-pen-to-square", "edit");
    editBtn.style.fontSize = "1.2em";
    editBtn.addEventListener("click", () => {
        modify(editBtn, true);
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("fa-regular", "fa-trash", "delete");
    deleteBtn.style.fontSize = "1.2em";
    deleteBtn.addEventListener("click", () => {
        modify(deleteBtn);
    });

    sublistContent.appendChild(editBtn);
    sublistContent.appendChild(deleteBtn);
    list.appendChild(sublistContent);
};

checkAmount.addEventListener("click", () => {
    let product = productTitle.value;
    let cost = parseFloat(productPrice.value);
    
    if (!product || isNaN(cost) || cost <= 0) {
        productErrorMessage.classList.remove("hide");
        return;
    }
    
    productErrorMessage.classList.add("hide");
    disable(false);
    
    let currentExpenses = parseFloat(expenses.innerText);
    let newExpenses = currentExpenses + cost;
    expenses.innerText = newExpenses.toFixed(2);
    
    let totalBalance = tempAmount - newExpenses;
    balance.innerText = totalBalance.toFixed(2);
    
    listCreator(product, cost);
    
    productTitle.value = "";
    productPrice.value = "";
});
