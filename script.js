const addExpenseBtn = document.getElementById("add-expense-btn");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const totalExpenseDisplay = document.getElementById("total-expenses");
const clearExpensesBtn = document.getElementById("clear-expenses-btn");

let totalExpenses = 0;

addExpenseBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();

  // Проверка, что сумма не меньше 0

  if (isNaN(amount) || amount <= 0) {
    alert("Введите корректную сумму.");

    return;
  }

  // Создаем новый элемент списка
  const expenseItem = document.createElement("li");
  expenseItem.textContent = `${category}: ${amount.toFixed(2)} ₽`;

  // Добавляем элемент в список

  expenseList.appendChild(expenseItem);

  // Обновляем сумму

  totalExpenses += amount;
  totalExpenseDisplay.textContent = totalExpenses.toFixed(2);

  // Очищаем поля ввода

  amountInput.value = "";
  categoryInput.value = "";

  saveExpenses();
});

clearExpensesBtn.addEventListener("click", () => {
  // Удаляем все элементы

  expenseList.innerHTML = "";

  // Сброс общей суммы

  totalExpenses = 0;

  totalExpenseDisplay.textContent = totalExpenses.toFixed(2);

  console.log("Очистка!");
});

function saveExpenses() {
  const expenses = {
    items: Array.from(expenseList.children).map((li) => li.textContent),
    total: totalExpenses,
  };

  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadExpenses() {
  const saveData = localStorage.getItem("expenses");

  if (saveData) {
    const expenses = JSON.parse(saveData);

    // Восстанавливаем элементы списка

    expenses.items.forEach((item) => {
      const expenseItem = document.createElement("li");
      expenseItem.textContent = item;
      expenseList.appendChild(expenseItem);
    });

    // Восстанавливаем общую сумму

    totalExpenses = expenses.total || 0;
    totalExpenseDisplay.textContent = totalExpenses.toFixed(2);
  }
}

// Загрузка

loadExpenses();
