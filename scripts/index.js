const cardTemplateContent = document.querySelector("#card-template").content

function createCard(cardData, deleteCallback) {
    const cardElement = cardTemplateContent.querySelector(".card").cloneNode(true)

    cardElement.querySelector(".card__image").src = cardData.link
    cardElement.querySelector(".card__title").textContent = cardData.name
    cardElement.querySelector(".card__delete-button").addEventListener('click', deleteCallback)
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