export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector; //this is the template of the card, i.e cardSeelctor = #card-template
    this._handleImageClick = handleImageClick;
    console.log(handleImageClick);
  }

  //Set the even listeners for the following (3):
  //1. Like Button
  //2. Delete Button
  //3. Preview Image
  _setEventListeners() {
    //".card__like-button" this._handleLikeIcon()
    //1-Handle the Like Button
    console.log("Event Listener: Listening!");
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    //console.log(likeButton);
    //".card__trash-button"
    //2-Handle the Delete Button
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    // this._cardImageElement = this._cardElement.querySelector(".card__image");
    // this._cardTitleElement = this._cardElement.querySelector(".card__title");
    //3-Handle the Click Image Button i.e. Preview Card Click
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        // this._handleImageClick(this._cardImageElement, this._cardTitleElement);
        this._handleImageClick(
          this._handleCardClickParameter1(),
          this._handleCardClickParameter2()
        );
        console.log("Modal Caption");
      });

    console.log(this._handleImageClick);
  }

  //fyi, cardelement is the current card we are working with
  _handleLikeIcon() {
    console.log("Pressing Like Button from  card class");
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
    //this._cardElement.classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
    console.log("removing card!");
  }

  _handleCardClickParameter1() {
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    return this._cardImageElement;
  }

  _handleCardClickParameter2() {
    this._cardTitleElement = this._cardElement.querySelector(".card__title");
    debugger;
    return this._cardTitleElement;
  }

  //this is a public method--since you can access it outside its class
  //this is the entrance point to your card, which will be used/called in index.js
  //we grab the templater first
  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    console.log("right here");
    console.log(this._cardTitle);
    this._cardTitle.textContent = this._name;

    //console.log(cardElement);
    this._setEventListeners();
    //1-get the card view
    //2-set event listeners-we are invoking a method, so we are using this
    //there will be 3 event listenrs, like button, delete button, preview image
    //3-return the card
    return this._cardElement;
  }
}
