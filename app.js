document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const amountInput = document.getElementById('amount');
  const fromCurrency = document.getElementById('from-currency');
  const toCurrency = document.getElementById('to-currency');
  const convertBtn = document.getElementById('convert-btn');
  const swapBtn = document.getElementById('swap-btn');
  const resultDiv = document.getElementById('result');

  // Event Listeners
  convertBtn.addEventListener('click', convertCurrency);
  swapBtn.addEventListener('click', swapCurrencies);

  // Functions
  async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      showError('Please enter a valid amount');
      return;
    }

    try {
      const result = await fetchExchangeRate(from, to, amount);
      resultDiv.innerHTML = `
        <h3>${amount} ${from} =</h3>
        <h2>${result.toFixed(8)} ${to}</h2>
        <p>Rate: 1 ${from} = ${(result/amount).toFixed(8)} ${to}</p>
      `;
      
      // Save to transaction history
      saveTransaction(amount, from, to, result);
    } catch (error) {
      showError('Failed to convert. Please try again later.');
      console.error(error);
    }
  }

  function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
  }

  function showError(message) {
    resultDiv.innerHTML = `<p class="error">${message}</p>`;
  }
});