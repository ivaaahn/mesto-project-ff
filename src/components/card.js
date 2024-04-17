import {openModal} from "./modal";


function initCard(name, link, alt) {
    const cardTemplateContent = document.querySelector("#card-template").content
    const cardElement = cardTemplateContent.querySelector(".card").cloneNode(true)

    // Заголовок
    const cardTitleElement = cardElement.querySelector(".card__title")
    cardTitleElement.textContent = alt

    // Картинка
    const cardImageElement = cardElement.querySelector(".card__image")
    cardImageElement.src = link
    cardImageElement.alt = name

    return cardElement
}


function deleteCardCallback(evt) {
    evt.target.closest(".card").remove()
}

function likeCardCallback(evt) {
    evt.target.classList.toggle("card__like-button_is-active")
}

function openCardCallback(evt) {
    const targetElement = evt.target
    const openCardPopupImageElement = document.querySelector(".popup__image")
    const openCardPopupCaptionElement = document.querySelector(".popup__caption")

    openCardPopupImageElement.setAttribute("src", targetElement.getAttribute("src"))
    openCardPopupImageElement.setAttribute("alt", targetElement.getAttribute("alt"))
    openCardPopupCaptionElement.textContent = targetElement.getAttribute("alt")

    const openCardPopup = document.querySelector(".popup_type_image")
    openModal(openCardPopup)
}

export function createCard(name, link, alt, openCardCallback, likeCardCallback, deleteCardCallback) {
    const cardElement = initCard(name, link, alt)

    const cardImageElement = cardElement.querySelector(".card__image")
    cardImageElement.addEventListener('click', openCardCallback)

    const cardLikeButtonElement = cardElement.querySelector(".card__like-button")
    cardLikeButtonElement.addEventListener('click', likeCardCallback)

    const cardDeleteButtonElement = cardElement.querySelector(".card__delete-button")
    cardDeleteButtonElement.addEventListener('click', deleteCardCallback)

    const placesListElement = document.querySelector(".places__list")
    placesListElement.append(cardElement)
}


export function createCardBulk(cardsData) {
    cardsData.map(cardData => createCard(
        cardData.name, cardData.link, cardData.name, openCardCallback, likeCardCallback, deleteCardCallback
    ))
}