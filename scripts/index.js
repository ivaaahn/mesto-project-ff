const cardTemplateContent = document.querySelector("#card-template").content

function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplateContent.querySelector(".card").cloneNode(true)
    const cardTitleElement = cardElement.querySelector(".card__title")
    const cardImageElement = cardElement.querySelector(".card__image")
    const cardDeleteButtonElement = cardElement.querySelector(".card__delete-button")

    cardImageElement.src = cardData.link
    cardImageElement.alt = cardData.name
    cardTitleElement.textContent = cardData.name
    cardDeleteButtonElement.addEventListener('click', deleteCallback)
    return cardElement
}

function deleteCard(evt) {
    evt.target.closest(".card").remove()
}

function renderCards(cardsData) {
    const placesListElement = document.querySelector(".places__list")

    cardsData.forEach((item) => {
        placesListElement.append(createCard(item, deleteCard))
    })
}

renderCards(initialCards)