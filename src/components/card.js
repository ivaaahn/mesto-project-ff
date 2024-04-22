import {deleteCardFromServer, likeCardOnServer, unlikeCardOnServer} from "./api";
import {logError} from "./utils";

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card")
const IS_ACTIVE_LIKE_BUTTON_CLASS = "card__like-button_is-active"
const IS_HIDDEN_CARD_DELETE_BUTTON_CLASS = "card__delete-button-hidden"


export function createCard(cardData, currentUserId, openCardCallback, deleteCardCallback, likeCardCallback) {
    const cardElement = cardTemplate.cloneNode(true)

    const cardTitleElement = cardElement.querySelector(".card__title")
    cardTitleElement.textContent = cardData.name

    const cardImageElement = cardElement.querySelector(".card__image")
    cardImageElement.addEventListener('click', () => openCardCallback(cardData.name, cardData.link))
    cardImageElement.src = cardData.link
    cardImageElement.alt = cardData.name

    const cardLikeCounterElement = cardElement.querySelector(".card__like-counter")
    cardLikeCounterElement.textContent = cardData.likes.length

    const cardLikeButtonElement = cardElement.querySelector(".card__like-button")
    cardLikeButtonElement.addEventListener('click', () =>
        likeCardCallback(cardLikeButtonElement, cardLikeCounterElement, cardData._id)
    )
    // Отмечаем проставленный лайк текущего пользователя
    if (cardData.likes.map(user => user._id).includes(currentUserId)) {
        cardLikeButtonElement.classList.add(IS_ACTIVE_LIKE_BUTTON_CLASS)
    }

    const cardDeleteButtonElement = cardElement.querySelector(".card__delete-button")
    // Отображаем кнопку удаления карточки только если она принадлежит текущему пользователю
    if (cardData.owner._id === currentUserId) {
        cardDeleteButtonElement.addEventListener('click', () =>
            deleteCardCallback(cardElement, cardData._id)
        )
    } else {
        cardDeleteButtonElement.classList.add(IS_HIDDEN_CARD_DELETE_BUTTON_CLASS)
    }

    return cardElement
}

export function deleteCard(cardToDelete, cardId) {
    deleteCardFromServer(cardId)
        .then(() => {
            cardToDelete.remove()
        })
        .catch(logError);
}

export function likeCard(cardLikeElement, cardLikesCounterElement, cardId) {
    if (cardLikeElement.classList.contains(IS_ACTIVE_LIKE_BUTTON_CLASS)) {
        unlikeCardOnServer(cardId)
            .then(res => {
                cardLikeElement.classList.remove(IS_ACTIVE_LIKE_BUTTON_CLASS)
                cardLikesCounterElement.textContent = res.likes.length
            })
            .catch(logError);
    } else {
        likeCardOnServer(cardId)
            .then(res => {
                cardLikeElement.classList.add(IS_ACTIVE_LIKE_BUTTON_CLASS)
                cardLikesCounterElement.textContent = res.likes.length
            })
            .catch(logError);
    }
}
