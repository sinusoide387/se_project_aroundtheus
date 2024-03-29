function showInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(options.inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(options.errorClass);
}

function hideInputError(formEl, inputEl, options) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(options.inputErrorClass);
  errorMessageEl.textContent = " ";
  errorMessageEl.classList.remove(options.errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}
function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
  let foundInvalid = false;

  inputEls.forEach((inputEl) => {
    if (!inputEl.validity.valid) {
      foundInvalid = true;
    }
  });
  if (foundInvalid) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options; //genero una constante que se llama inputSelector. y la uso abajo para obtener los inputs.
  const inputEls = [...formEl.querySelectorAll(inputSelector)]; // los "..." se llaman spray operator, es igual que Array.from
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, options); //// de esta forma el boton no esta activado desde que se abre el popup

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
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
//// can i have a clarification on this correction, i created a block out of those three popup classes for style my validation as i though you refer
const config = {
  formSelector: ".modal__form", //".popup__form"
  inputSelector: ".modal__input", // ".popup__input",
  submitButtonSelector: ".modal__button", //".popup__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible", //"popup__error"//
};

enableValidation(config);
