// Enabling validation by calling enableValidation()

const enableValidation = (e) => {
  //get the list of formelements
  // queryselectorall on forselector turn this into an array
  // loop through the array and add an event listener for each element in the array
  // inside the loop after you set the event listeners then you will call setEvnetlistener function
  formSelector.addEventListener("submit", (e) => {
    e.preventDefault();
  });
};

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(config);
