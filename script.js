// Получаем ссылки на необходимые элементы
const quantityInput = document.getElementById('quantity');
const serviceTypeInputs = document.querySelectorAll('input[name="serviceType"]');
const optionsSelect = document.getElementById('options');
const propertyCheckbox = document.getElementById('property');
const totalPriceSpan = document.getElementById('totalPrice');

// Определение стоимостей услуги
const prices = {
  type1: 200,
  type2: 100,
  type3: 150
};

// Обработчик изменения количества, типа услуги, опций и свойства
function calculateTotalPrice() {
  const quantity = parseInt(quantityInput.value);
  const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
  const selectedOption = optionsSelect.value;
  const hasProperty = propertyCheckbox.checked;

  let totalPrice = prices[selectedServiceType] * quantity;

  // Добавляем стоимость выбранной опции
  if (selectedOption) {
    totalPrice += parseInt(selectedOption);
  }

  // Добавляем стоимость свойства
  if (hasProperty) {
    totalPrice += 100; // Пример стоимости свойства
  }

  // Обновляем отображение итоговой цены
  totalPriceSpan.textContent = totalPrice;
}

// Обработчик изменения типа услуги
function handleServiceTypeChange() {
  const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;

  // Очищаем список опций и скрываем контейнер свойства
  optionsSelect.innerHTML = '';
  propertyContainer.style.display = 'none';

  // В зависимости от выбранного типа услуги, добавляем опции или отображаем контейнер свойства
  if (selectedServiceType === 'type2') {
    optionsSelect.innerHTML = `
      <option value="50">Доставка (+100 руб.)</option>
      <option value="100">Самовывоз (+0 руб.)</option>
    `;
  } else if (selectedServiceType === 'type3') {
    propertyContainer.style.display = 'block';
  }

  calculateTotalPrice();
}

// Добавляем обработчики событий
quantityInput.addEventListener('input', calculateTotalPrice);
serviceTypeInputs.forEach(input => {
  input.addEventListener('change', handleServiceTypeChange);
});
optionsSelect.addEventListener('change', calculateTotalPrice);
propertyCheckbox.addEventListener('change', calculateTotalPrice);

// Вызываем функцию расчета итоговой цены при загрузке страницы
calculateTotalPrice();