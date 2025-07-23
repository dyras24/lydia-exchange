const API_BASE_URL = 'https://api.coingecko.com/api/v3';

async function fetchExchangeRate(from, to, amount) {
  // For crypto to fiat
  if (from !== 'USD' && from !== 'EUR' && from !== 'IDR') {
    const response = await fetch(`${API_BASE_URL}/simple/price?ids=${from.toLowerCase()}&vs_currencies=${to.toLowerCase()}`);
    const data = await response.json();
    return amount * data[from.toLowerCase()][to.toLowerCase()];
  }
  // For fiat to crypto (reverse)
  else {
    const response = await fetch(`${API_BASE_URL}/simple/price?ids=${to.toLowerCase()}&vs_currencies=${from.toLowerCase()}`);
    const data = await response.json();
    return amount / data[to.toLowerCase()][from.toLowerCase()];
  }
}

async function saveTransaction(amount, from, to, result) {
  try {
    await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        fromCurrency: from,
        toCurrency: to,
        convertedAmount: result,
        date: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Failed to save transaction:', error);
  }
}

export { fetchExchangeRate, saveTransaction };