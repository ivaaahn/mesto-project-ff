import './styles/index.css';

import {cardsList, createCard} from "./components/card";
import {closeModal, openModal} from "./components/modal";
import {clearValidation, enableValidation} from "./components/validation";

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// Открытие карточки
const cardsListElement = document.querySelector(".places__list")
const cardOpenModal = document.querySelector(".popup_type_image")
const cardOpenModalImage = cardOpenModal.querySelector(".popup__image")
const cardOpenModalCaption = cardOpenModal.querySelector(".popup__caption")

function openCardOpenModal(name, src) {
    cardOpenModalImage.src = src
    cardOpenModalImage.alt = name
    cardOpenModalCaption.textContent = name
    openModal(cardOpenModal)
}

// Добавление карточки
const cardAddButton = document.querySelector(".profile__add-button")
const cardAddModal = document.querySelector(".popup_type_new-card")
const cardAddModalForm = cardAddModal.querySelector(".popup__form")
const cardAddModalFormTitleInput = cardAddModalForm.querySelector(".popup__input_type_card-name")
const cardAddModalFormUrlInput = cardAddModalForm.querySelector(".popup__input_type_url")

function openCardAddModal() {
    openModal(cardAddModal)
}

function addCard(evt) {
    evt.preventDefault();

    const card = createCard(cardAddModalFormTitleInput.value, cardAddModalFormUrlInput.value, openCardOpenModal)
    cardAddModalForm.reset()
    clearValidation(cardAddModalForm, validationSettings)

    cardsListElement.prepend(card)
    closeModal(cardAddModal)
}

cardAddButton.addEventListener('click', openCardAddModal)
cardAddModalForm.addEventListener('submit', addCard);

// Инициализация карточек
cardsList.map((cardData) => {
        const card = createCard(cardData.name, cardData.link, openCardOpenModal)
        cardsListElement.prepend(card)
    }
)


// Редактирование профиля
const profileName = document.querySelector(".profile__title")
const profileJob = document.querySelector(".profile__description")
const profileEditButton = document.querySelector(".profile__edit-button")


const profileEditModal = document.querySelector(".popup_type_edit")
const profileEditModalForm = profileEditModal.querySelector(".popup__form")
const profileEditModalFormNameInput = profileEditModalForm.querySelector(".popup__input_type_name")
const profileEditModalFormJobInput = profileEditModalForm.querySelector(".popup__input_type_description")


function openProfileEditModal() {
    profileEditModalFormNameInput.value = profileName.textContent
    profileEditModalFormJobInput.value = profileJob.textContent
    clearValidation(profileEditModalForm, validationSettings)
    openModal(profileEditModal)
}

function updateProfile(evt) {
    evt.preventDefault();

    profileName.textContent = profileEditModalFormNameInput.value
    profileJob.textContent = profileEditModalFormJobInput.value
    closeModal(profileEditModal)
}

profileEditButton.addEventListener('click', openProfileEditModal)
profileEditModalForm.addEventListener('submit', updateProfile);


// Валидация форм
enableValidation(validationSettings)