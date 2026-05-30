//overlay open/close
 const overlay = document.getElementById('donationOverlay');

function showDonationOverlay() {
  if (!overlay) return;
  
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  //close overlay when clicking outside
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeDonationOverlay();
  });
}

function closeDonationOverlay() {
 
  
  if (!overlay) return;
  
  //reset the form completely
  const form = document.getElementById('donationForm');
  if (form) {
    form.reset();
  }
  

  
  //reset amount display
  const amountDisplay = document.getElementById('amountDisplay');
  if (amountDisplay) {
    amountDisplay.textContent = '';
  }
  
  //remove checked state from amount buttons
  const amountButtons = document.querySelectorAll('.donation_overlay .money-btn');
  amountButtons.forEach((btn) => btn.classList.remove('is-checked'));
  
  overlay.style.display = 'none';
  document.body.style.overflow = 'auto';
}

//Initialize donation functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  //Handle donation steps
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const continueBtn = document.getElementById('continueBtn');
  const changeBtn = document.getElementById('changeAmountBtn');
  const amountDisplay = document.getElementById('amountDisplay');

  //only initialize if donation elements exist
  if (!step1 || !step2) return;

  const circles = document.querySelectorAll('.donation_overlay .circle');
  let currentStep = 1;

  function switchPages(hidePage, showPage) {
    hidePage.style.opacity = '0';
    hidePage.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      hidePage.style.display = 'none';
      showPage.style.display = 'block';
      setTimeout(() => {
        showPage.style.opacity = '1';
        showPage.style.transform = 'translateX(0)';
      }, 50);
    }, 300);
  }

  function updateProgress(step) {
    if (step === 1) {
      circles[1].classList.remove('active');
    } else {
      circles[1].classList.add('active');
    }
  }

  //Handle donation amount
  const amountInput = document.querySelector('.donation_overlay .custAmount');
  const amountButtons = document.querySelectorAll('.donation_overlay .money-btn');

  amountButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      amountButtons.forEach((b) => b.classList.remove('is-checked'));
      btn.classList.add('is-checked');
      amountInput.value = btn.textContent.trim();
      if (amountDisplay) amountDisplay.textContent = btn.textContent.trim();
    });
  });

  if (amountInput) {
    amountInput.addEventListener('focus', () => {
      amountButtons.forEach((b) => b.classList.remove('is-checked'));
    });

    amountInput.addEventListener('input', (e) => {
      let input = e.target.value.replace(/\D/g, '');
      if (input) {
        e.target.value = 'R ' + parseInt(input, 10).toLocaleString();
        if (amountDisplay) amountDisplay.textContent = e.target.value;
      } else {
        if (amountDisplay) amountDisplay.textContent = '';
      }
    });
  }
  

  

  //Step navigation
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      const donorName = document.querySelector('.donation_overlay input[name="donor_name"]');
      const donorEmail = document.querySelector('.donation_overlay input[name="email"]');

      if (!amountInput.value.trim()) {
        amountInput.classList.add('error-flash');
        setTimeout(() => amountInput.classList.remove('error-flash'), 1500);
        amountInput.focus();
        return;
      }
      if (!donorName.value.trim() || !donorEmail.value.trim()) {
        alert('Please fill in your name and email.');
        return;
      }

      switchPages(step1, step2);
      currentStep = 2;
      updateProgress(currentStep);
    });
  }

  if (changeBtn) {
    changeBtn.addEventListener('click', () => {
      switchPages(step2, step1);
      currentStep = 1;
      updateProgress(currentStep);
    });
  }

  //Payment Options
  const paymentRadios = document.querySelectorAll('.donation_overlay input[name="view"]');
  const cardForm = document.querySelector('.donation_overlay .card_form');

  if (paymentRadios.length > 0 && cardForm) {
    paymentRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        const method = e.target.value;
        switch (method) {
          case 'CreditCard':
            cardForm.style.display = 'block';
            break;
          case 'GooglePay':
          case 'PayPal':
            cardForm.style.display = 'none';
            break;
        }
      });
    });
  }

  //Format Card Fields
  const cardInput = document.querySelector('.donation_overlay input[name="cardNumber"]');
  const expiryInput = document.querySelector('.donation_overlay input[name="expirationDate"]');
  const cvvInput = document.querySelector('.donation_overlay input[name="cvv"]');

  //digits only
  function digitsOnly(str) {
    return (str || '').replace(/\D/g, '');
  }

  //small inline error handling (keeps unrelated markup unchanged)
  function showFieldError(inputEl, msg) {
    if (!inputEl) return;
    let container = inputEl.parentNode;
    let err = container.querySelector('.field-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'field-error';
      err.style.color = '#c0392b';
      err.style.fontSize = '12px';
      err.style.marginTop = '6px';
      container.appendChild(err);
    }
    err.textContent = msg;
    inputEl.classList.add('input-error');
  }

  function clearFieldError(inputEl) {
    if (!inputEl) return;
    let container = inputEl.parentNode;
    let err = container.querySelector('.field-error');
    if (err) err.textContent = '';
    inputEl.classList.remove('input-error');
  }

  //card number formatting & enforce exactly 16 digits
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      //keep only digits and limit to 16 digits
      let digits = digitsOnly(e.target.value).substring(0, 16);
      //ormat (XXXX XXXX XXXX XXXX)
      const groups = [];
      for (let i = 0; i < digits.length; i += 4) groups.push(digits.substring(i, i + 4));
      e.target.value = groups.join(' ').trim();
      //clear error when user reaches 16 digits
      if (digits.length === 16) clearFieldError(cardInput);
    });

    cardInput.addEventListener('blur', () => {
      const count = digitsOnly(cardInput.value).length;
      if (count !== 16) showFieldError(cardInput, 'Card number must be exactly 16 digits.');
      else clearFieldError(cardInput);
    });
  }

  //expiry date formatting
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let input = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (input.length > 2) input = input.substring(0, 2) + '/' + input.substring(2);
      e.target.value = input;
    });
  }

  //limit cvv to 3 digits
  if (cvvInput) {
    cvvInput.addEventListener('input', (e) => {
      e.target.value = digitsOnly(e.target.value).substring(0, 3);
      if (e.target.value.length === 3) clearFieldError(cvvInput);
    });

    cvvInput.addEventListener('blur', () => {
      if (digitsOnly(cvvInput.value).length !== 3) {
        showFieldError(cvvInput, 'CVV must be 3 digits.');
      } else {
        clearFieldError(cvvInput);
      }
    });
  }

  //form submission
  const form = document.getElementById('donationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const creditCardRadio = document.getElementById('creditcard');

      //clear previous errors
      [cardInput, cvvInput].forEach(el => el && clearFieldError(el));

      //enforce the 16-digit card + 3-digit CVV rule.
      const requireCard = (creditCardRadio && creditCardRadio.checked) || (!creditCardRadio && cardInput);

      if (requireCard) {
        const cardDigits = cardInput ? digitsOnly(cardInput.value).length : 0;
        const cvvDigits = cvvInput ? digitsOnly(cvvInput.value).length : 0;

        let valid = true;
        if (cardDigits !== 16) {
          valid = false;
          if (cardInput) showFieldError(cardInput, 'Card number must be exactly 16 digits.');
        }
        if (cvvDigits !== 3) {
          valid = false;
          if (cvvInput) showFieldError(cvvInput, 'CVV must be exactly 3 digits.');
        }

        if (!valid) {
          e.preventDefault();
          if (cardDigits !== 16 && cardInput) cardInput.focus();
          else if (cvvDigits !== 3 && cvvInput) cvvInput.focus();
          return;
        }
      }

    });
  }
});
