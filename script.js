// State variables
let activeTipPercent = null;

// DOM Elements
const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipButtons = document.querySelectorAll('.tip-btn');

const billError = document.getElementById('bill-error');
const tipError = document.getElementById('tip-error');
const peopleError = document.getElementById('people-error');

const tipTotalDisplay = document.getElementById('tip-total');
const grandTotalDisplay = document.getElementById('grand-total');
const perPersonDisplay = document.getElementById('per-person-total');
const resetBtn = document.getElementById('reset-btn');

// Setup event listeners
billInput.addEventListener('input', calculate);
customTipInput.addEventListener('input', () => {
  if (customTipInput.value !== '') {
    clearActiveButtons();
    activeTipPercent = null;
  }
  calculate();
});
peopleInput.addEventListener('input', calculate);

tipButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    clearActiveButtons();
    e.target.classList.add('active');
    activeTipPercent = parseFloat(e.target.dataset.tip);
    customTipInput.value = ''; // clear custom choice
    calculate();
  });
});

resetBtn.addEventListener('click', resetApp);

function clearActiveButtons() {
  tipButtons.forEach(btn => btn.classList.remove('active'));
}

function resetApp() {
  billInput.value = '';
  customTipInput.value = '';
  peopleInput.value = '';
  clearActiveButtons();
  activeTipPercent = null;
  
  billError.textContent = '';
  tipError.textContent = '';
  peopleError.textContent = '';
  
  tipTotalDisplay.textContent = '$0.00';
  grandTotalDisplay.textContent = '$0.00';
  perPersonDisplay.textContent = '$0.00';
  
  resetBtn.disabled = true;
}

function calculate() {
  // Enable reset if any field has entries
  if (billInput.value || customTipInput.value || peopleInput.value || activeTipPercent !== null) {
    resetBtn.disabled = false;
  } else {
    resetBtn.disabled = true;
  }

  // Clear previous errors
  billError.textContent = '';
  tipError.textContent = '';
  peopleError.textContent = '';

  const billValue = parseFloat(billInput.value);
  const peopleValue = parseInt(peopleInput.value, 10);
  
  // Figure out which tip metric to capture
  let tipPercent = 0;
  if (activeTipPercent !== null) {
    tipPercent = activeTipPercent;
  } else if (customTipInput.value !== '') {
    tipPercent = parseFloat(customTipInput.value);
  }

  let hasErrors = false;

  // 1. Validation Logic
  if (billInput.value !== '' && (isNaN(billValue) || billValue <= 0)) {
    billError.textContent = 'Bill must be a positive number';
    hasErrors = true;
  }

  if (customTipInput.value !== '' && (isNaN(tipPercent) || tipPercent < 0 || tipPercent > 300)) {
    tipError.textContent = 'Tip must be between 0% and 300%';
    hasErrors = true;
  }

  if (peopleInput.value !== '' && (isNaN(peopleValue) || peopleValue < 1 || !Number.isInteger(parseFloat(peopleInput.value)))) {
    peopleError.textContent = 'Must be a whole number ≥ 1';
    hasErrors = true;
  }

  // If inputs are partially empty or invalid, clear results safely
  if (hasErrors || isNaN(billValue) || isNaN(peopleValue)) {
    tipTotalDisplay.textContent = '$0.00';
    grandTotalDisplay.textContent = '$0.00';
    perPersonDisplay.textContent = '$0.00';
    return;
  }

  // 2. Perform Math
  const totalTipAmount = billValue * (tipPercent / 100);
  const grandTotalAmount = billValue + totalTipAmount;
  
  // Rounding Strategy: Ceil to ensure group never underpays
  const sharePerPerson = Math.ceil((grandTotalAmount / peopleValue) * 100) / 100;

  // 3. Render updates safely
  tipTotalDisplay.textContent = `$${totalTipAmount.toFixed(2)}`;
  grandTotalDisplay.textContent = `$${grandTotalAmount.toFixed(2)}`;
  perPersonDisplay.textContent = `$${sharePerPerson.toFixed(2)}`;
}