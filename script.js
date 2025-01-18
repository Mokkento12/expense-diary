// Получаем все необходимые элементы
const addExpenseBtn = document.getElementById("add-expense-btn");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expense-list");
const totalExpenseDisplay = document.getElementById("total-expenses");
const clearExpensesBtn = document.getElementById("clear-expenses-btn");
const filterCategorySelect = document.getElementById("filter-category");

// Переменная для хранения общей суммы расходов
let totalExpenses = 0;

// Обработчик для добавления нового расхода
addExpenseBtn.addEventListener("click", () => {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value.trim();

  // Проверяем корректность ввода
  if (isNaN(amount) || amount <= 0) {
    alert("Введите корректную сумму.");
    return;
  }
  if (!category) {
    alert("Введите категорию.");
    return;
  }

  // Создаем новый элемент списка
  const expenseItem = document.createElement("li");
  expenseItem.textContent = `${category}: ${amount.toFixed(2)} ₽`;
  expenseItem.dataset.category = category;

  // Добавляем элемент в список
  expenseList.appendChild(expenseItem);

  // Обновляем сумму
  totalExpenses += amount;
  totalExpenseDisplay.textContent = totalExpenses.toFixed(2);

  // Добавляем новую категорию в фильтр, если её нет
  if (
    ![...filterCategorySelect.options].some(
      (option) => option.value === category
    )
  ) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    filterCategorySelect.appendChild(option);
  }

  // Очищаем поля ввода
  amountInput.value = "";
  categoryInput.value = "";

  // Сохраняем данные
  saveExpenses();
});

// Обработчик для очистки всех расходов
clearExpensesBtn.addEventListener("click", () => {
  expenseList.innerHTML = "";
  totalExpenses = 0;
  totalExpenseDisplay.textContent = totalExpenses.toFixed(2);
  saveExpenses();
});

// Обработчик для фильтрации по категориям
filterCategorySelect.addEventListener("change", () => {
  const selectedCategory = filterCategorySelect.value;
  Array.from(expenseList.children).forEach((item) => {
    item.style.display =
      selectedCategory === "all" || item.dataset.category === selectedCategory
        ? ""
        : "none";
  });
});

// Функция для сохранения расходов в localStorage
function saveExpenses() {
  const expenses = {
    items: Array.from(expenseList.children).map((li) => ({
      text: li.textContent,
      category: li.dataset.category,
    })),
    total: totalExpenses,
  };
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Функция для загрузки расходов из localStorage
function loadExpenses() {
  const saveData = localStorage.getItem("expenses");

  if (saveData) {
    const expenses = JSON.parse(saveData);

    // Восстанавливаем элементы списка
    expenses.items.forEach((expense) => {
      const expenseItem = document.createElement("li");
      expenseItem.textContent = expense.text;
      expenseItem.dataset.category = expense.category;
      expenseList.appendChild(expenseItem);

      // Добавляем новую категорию в фильтр, если её нет
      if (
        ![...filterCategorySelect.options].some(
          (option) => option.value === expense.category
        )
      ) {
        const option = document.createElement("option");
        option.value = expense.category;
        option.textContent = expense.category;
        filterCategorySelect.appendChild(option);
      }
    });

    // Восстанавливаем общую сумму
    totalExpenses = expenses.total || 0;
    totalExpenseDisplay.textContent = totalExpenses.toFixed(2);
  }
}

// Загрузка данных при старте
loadExpenses();
