export class FormValidation {
  constructor(settings, formElement) {
    this._formSelector = formElement;

    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }
  _hideInputError(formEl, inputEl, options) {
    this._errorMessageEl = this._formSelector.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = " ";
    this._errorMessageEl.classList.remove(options.errorClass);
  }

  _showInputError(inputEl) {
    this._errorMessageEl = this._formSelector.querySelector(
      `#${inputEl.id}-error`
    );
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(options.errorClass);
  }
  _checkInputValidity(formEl, inputEl, options) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, options);
    } else {
      hideInputError(formEl, inputEl, options);
    }
  }

  toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;

    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
      this._submitButton.classList.add(inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  _setEventListeners() {
    this._inputEls = [
      ...this._formSelector.querySelectorAll(this._inputSelector),
    ]; // los "..." se llaman spray operator, es igual que Array.from
    this._submitButton = this._formSelector.querySelector(
      this._submitButtonSelector
    );
    toggleButtonState(inputEls, submitButton, options); //// de esta forma el boton no esta activado desde que se abre el popup

    this._inputSelector.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(this._formSelector, inputEl, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }
  enableValidation() {
    this._formSelector.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }
}
