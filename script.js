const addExpenseBtn = document.getElementById("add-expense-btn");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

addExpenseBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();

  console.log(`Сумма: ${amount}, Категория: ${category}`);
});
