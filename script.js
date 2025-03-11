document.addEventListener("DOMContentLoaded", function() {
    let expenses = [];
    let totalAmount = 0;

    const categorySelect = document.getElementById('category-select');
    const amountInput = document.getElementById('amount-input');
    const dateInput = document.getElementById('date-input');
    const addBtn = document.getElementById('add-btn');
    const expenseTableBody = document.getElementById('expense-table-body');
    const totalAmountCell = document.getElementById('total-amount');

    function updateTotalAmount() {
        totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalAmountCell.textContent = totalAmount;
    }

    addBtn.addEventListener('click', function() {
        const category = categorySelect.value;
        const amount = Number(amountInput.value);
        const date = dateInput.value;

        if (category === '' || isNaN(amount) || amount <= 0 || date === '') {
            alert("Please enter valid details");
            return;
        }

        const expense = { category, amount, date };
        expenses.push(expense);

        const newRow = expenseTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const editCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = category;
        amountCell.textContent = amount;
        dateCell.textContent = date;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', function() {
            const newCategory = prompt("Enter new category", categoryCell.textContent);
            const newAmount = Number(prompt("Enter new amount", amountCell.textContent));
            const newDate = prompt("Enter new date", dateCell.textContent);

            if (!newCategory || isNaN(newAmount) || newAmount <= 0 || !newDate) {
                alert("Invalid input");
                return;
            }
            
            totalAmount -= expense.amount;
            expense.category = newCategory;
            expense.amount = newAmount;
            expense.date = newDate;
            totalAmount += newAmount;

            categoryCell.textContent = newCategory;
            amountCell.textContent = newAmount;
            dateCell.textContent = newDate;
            updateTotalAmount();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', function() {
            expenses.splice(expenses.indexOf(expense), 1);
            newRow.remove();
            updateTotalAmount();
        });

        editCell.appendChild(editBtn);
        deleteCell.appendChild(deleteBtn);
        updateTotalAmount();
    });
});
