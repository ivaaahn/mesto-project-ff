const cardTemplate = document.querySelector("#card-template").content.querySelector(".card")

export const cardsList = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
]

export function deleteCardCallback(evt) {
    evt.target.closest(".card").remove()
}

export function likeCardCallback(evt) {
    evt.target.classList.toggle("card__like-button_is-active")
}

export function createCard(name, src, openCardCallback, customLikeCardCallback, customDeleteCardCallback) {
    const cardElement = cardTemplate.cloneNode(true)

    const cardTitleElement = cardElement.querySelector(".card__title")
    cardTitleElement.textContent = name

    const cardImageElement = cardElement.querySelector(".card__image")
    cardImageElement.addEventListener('click', () => openCardCallback(name, src))
    cardImageElement.src = src
    cardImageElement.alt = name

    const cardLikeButtonElement = cardElement.querySelector(".card__like-button")
    cardLikeButtonElement.addEventListener('click', customLikeCardCallback || likeCardCallback)

    const cardDeleteButtonElement = cardElement.querySelector(".card__delete-button")
    cardDeleteButtonElement.addEventListener('click', customDeleteCardCallback || deleteCardCallback)

    return cardElement
}
