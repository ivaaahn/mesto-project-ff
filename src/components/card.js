const config = {
    cardSelector: ".card",
    cardTemplateSelector: "#card-template",
    cardTitleSelector: ".card__title",
    cardImageSelector: ".card__image",
    cardDeleteButtonSelector: ".card__delete-button",
    cardLikeButtonSelector: ".card__like-button",
    cardLikeCounterSelector: ".card__like-counter",
    cardIsActiveLikeButtonClass: "card__like-button_is-active",
    cardIsHiddenCardDeleteButtonClass: "card__delete-button-hidden",
}

const cardTemplate = document.querySelector(config.cardTemplateSelector).content.querySelector(config.cardSelector)


export function create(cardData, currentUserId, clickOnCardCallback, deleteCardCallback, likeCardCallback) {
    const cardElement = cardTemplate.cloneNode(true)

    const cardTitleElement = cardElement.querySelector(config.cardTitleSelector)
    cardTitleElement.textContent = cardData.name

    const cardImageElement = cardElement.querySelector(config.cardImageSelector)
    cardImageElement.addEventListener('click', () => clickOnCardCallback(cardData))
    cardImageElement.src = cardData.link
    cardImageElement.alt = cardData.name

    const cardLikeCounterElement = cardElement.querySelector(config.cardLikeCounterSelector)
    cardLikeCounterElement.textContent = cardData.likes.length

    const cardLikeButtonElement = cardElement.querySelector(config.cardLikeButtonSelector)
    cardLikeButtonElement.addEventListener('click', () =>
        likeCardCallback(cardData, cardElement)
    )
    // Отмечаем проставленный лайк текущего пользователя
    if (cardData.likes.map(user => user._id).includes(currentUserId)) {
        cardLikeButtonElement.classList.add(config.cardIsActiveLikeButtonClass)
    }

    const cardDeleteButtonElement = cardElement.querySelector(config.cardDeleteButtonSelector)
    // Отображаем кнопку удаления карточки только если она принадлежит текущему пользователю
    if (cardData.owner._id === currentUserId) {
        cardDeleteButtonElement.addEventListener('click', () =>
            deleteCardCallback(cardData, cardElement)
        )
    } else {
        cardDeleteButtonElement.classList.add(config.cardIsHiddenCardDeleteButtonClass)
    }

    return cardElement
}

export function remove(cardElement) {
    cardElement.remove()
}

export function isLiked(cardElement) {
    const cardLikeButtonElement = cardElement.querySelector(config.cardLikeButtonSelector)
    return cardLikeButtonElement.classList.contains(config.cardIsActiveLikeButtonClass)
}

export function toggleLike(cardElement, newNumberOfLikes) {
    const cardLikeButtonElement = cardElement.querySelector(config.cardLikeButtonSelector)
    const cardLikeCounterElement = cardElement.querySelector(config.cardLikeCounterSelector)

    cardLikeButtonElement.classList.toggle(config.cardIsActiveLikeButtonClass)
    cardLikeCounterElement.textContent = newNumberOfLikes
}
