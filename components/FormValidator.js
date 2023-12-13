class FormValidator {
  //create constructor and copy everything from validate.js except formSelector since formElement is used instead
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
    this._submitButton = formElement.querySelector(
      settings.submitButtonSelector
    );

    //this will log the Class itself***
    console.log("settings", settings);
  }
  //this will basically toggle the error-refactored**
  //formElement becomes this._form
  //**If its on the constructor in the methods, add the 'this' keyword */
  _showInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    //console.log(errorMessageElement);
    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage; //errorMessage =inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }
  //note this does not have an error message paramater, it just hides it
  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }
  //remove submitbutton,inactivebuttonclass since its been defined in the constructor
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
    return;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
    return;
  }

  //removed paramters that were declared within this class already
  //inputElements is removed from the parameters b.c its declared even though its not in the contructor
  _toggleButtonState() {
    console.log("testing1211", this._submitButton);
    if (this._hasInvalidInput(this._inputElements)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
  //remove everything edxcept inputelement from parameter
  //b/c it already exists in the constructor
  //refactored**
  _hideInputError(inputElement) {
    const errorMessageElement = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  //remove options since constructor already has these?
  //all functions inside methods need a this?
  //only argument that is needed in inputElement
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    }

    this._hideInputError(inputElement);
  }

  _setEventListeners() {
    this._inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    //this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(); //can remove the paramters and add this since you are calling it within the class
      });
    });
  }
  //need inputElement as standalone

  //public method that activates the validation of the generated form
  //plays the role of init method (its public)
  //Will be called by the 2 form methods on index.js
  //also removing the loops since that is handled in index.js, once per unique form
  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

//const editFormValidator = new FormValidator(settings, editForm);
//editFormValidator.enableValidation();
//const addFormValidator = new FormValidator(settings, addForm);

export default FormValidator;
