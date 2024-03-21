function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(`#${inputEl.id}-error`);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  }
  // else {
  //   hideInputError(formEl, inputEl, options);
  // }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)]; // los "..." se llaman spray operator, es igual que Array.from
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];

  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);

    //look for all the inPuts inside the form.
    // loop through all the inPut to see if all are valid.
    ///// if input is not valid.
    ////////get validation Message.
    ////////add error class to input.
    ////////display error Message.
    ////////disable Button.
    ////////if all inPuts are we should enable Button.
    ////////reset erro Messages.
  });
}

const config = {
  formSelector: ".modal__form", //".popup__form"
  inputSelector: ".modal__input", // ".popup__input",
  submitButtonSelector: ".modal__button", //".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
