const addExpenseBtn = document.getElementById("add-expense-btn");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");

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

  // Очищаем поля ввода

  amountInput.value = "";
  categoryInput.value = "";
});
