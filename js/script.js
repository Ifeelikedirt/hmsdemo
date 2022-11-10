"use strict";
const accountAdmin = {
  owner: "Systems Admininstrator",
  movements: ["Malaria Treatment", "Monthly Checkup", "HIV checking"],
  interestRate: 1.2,
  pin: 1111,
};

const accountUser = {
  owner: "First User",
  movements: ["Typhoid treatment"],
  interestRate: 1.4,
  pin: 2222,
};

const accounts = [accountAdmin, accountUser];

/////////////////////////////////////////////////
// Elements
//
const header = document.querySelector(".header");
const app = document.querySelector(".app");
const loginBtn = document.querySelectorAll(".btn-login");
const closeBtn = document.querySelector(".close-btn");
const form = document.querySelector(".form-section");
const overlay = document.querySelector(".overlay");
const inputUsername = document.querySelector(".form-input-user");
const inputPassword = document.querySelector(".form-input-password");
const usernameError = document.querySelector(".username-error");
const passwordError = document.querySelector(".password-error");
const contentSubmit = document.querySelector(".content-submit");
const loginError = document.querySelector(".login-content");
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const time = new Date().toLocaleTimeString();

const btnTransfer = document.querySelector(".form__btn--transfer");
const btnClose = document.querySelector(".form__btn--close");

const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const operationClose = document.querySelector(".operation--close");
const operationTransfer = document.querySelector(".operation--transfer");
/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "admission" : "removal";
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } : ${time}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);
};

createUsernames(accounts);

///////////////////////////////////////
// Event handlers
let currentAccount;

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const activity = inputTransferAmount.value;
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (receiverAcc && receiverAcc?.username !== currentAccount.username) {
    // Doing the transfer
    currentAccount.movements.push(activity);
    receiverAcc.movements.push(activity);

    // Update UI
    updateUI(currentAccount);
  }
});
/*
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const activity = inputLoanAmount.value;

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});
*/
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value == currentAccount.username &&
    Number(inputClosePin.value) == currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username == currentAccount.username
    );

    accounts.splice(index, 1);
    header.classList.remove("hidden");
    form.classList.add("hidden");
    overlay.classList.add("hidden");
    app.classList.add("hidden");

    inputUsername.value =
      inputPassword.value =
      inputCloseUsername.value =
      inputClosePin.value =
        "";
  }
});
console.log(accounts);
loginBtn.forEach(function (login) {
  login.addEventListener("click", function (e) {
    e.preventDefault();
    form.classList.remove("hidden");
    overlay.classList.remove("hidden");
  });
});

closeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  form.classList.add("hidden");
  overlay.classList.add("hidden");
});
contentSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find((acc) => acc.username === inputUsername.value);
  if (+currentAccount?.pin == inputPassword.value) {
    header.classList.add("hidden");
    form.classList.add("hidden");
    overlay.classList.add("hidden");
    app.classList.remove("hidden");
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[1]
    }!`;
    labelDate.textContent = new Date().toLocaleDateString();
    console.log(currentAccount);
    updateUI(currentAccount);

    if (currentAccount.username == "fu") {
      operationTransfer.classList.add("hidden");
    } else {
      operationTransfer.classList.remove("hidden");
    }
  }
});
