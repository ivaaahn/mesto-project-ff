import './styles/index.css';

import {createCardBulk} from "./components/card";
import {closeModal, openModal} from "./components/modal";
import {createCard} from "./components/card";

createCardBulk(
    [
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
)

// Добавление карточки
const addPlaceButton = document.querySelector(".profile__add-button")

const addNewCardModal = document.querySelector(".popup_type_new-card")
const newCardModalForm = document.querySelector(".popup_type_new-card").querySelector(".popup__form")
const newCardModalFormTitleInput = document.querySelector(".popup__input_type_card-name")
const newCardModalFormUrlInput = document.querySelector(".popup__input_type_url")

// Клик по кнопке добавления места открывает модалку с добавлением карточки
addPlaceButton.addEventListener('click', (evt) => {
    openModal(addNewCardModal)
})
// Отправка формы из модалки добавления карточки создает карточку, сбрасывает форму и скрывает модалку
newCardModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    createCard(newCardModalFormTitleInput.value, newCardModalFormUrlInput.value, newCardModalFormTitleInput.value)

    newCardModalForm.reset()
    closeModal(addNewCardModal)
});


// Редактирование профиля
const profileTitle = document.querySelector(".profile__title")
const profileDescription = document.querySelector(".profile__description")
const profileEditButtonElement = document.querySelector(".profile__edit-button")

const profileEditModal = document.querySelector(".popup_type_edit")
const profileEditModalForm = document.querySelector(".popup_type_edit").querySelector(".popup__form")
const profileEditModalFormNameInput = document.querySelector(".popup__input_type_name")
const profileEditModalFormJobInput = document.querySelector(".popup__input_type_description")

// Клик по кнопке редактирования профиля, открывает предзаполненную текущими данными модалку редактирования
profileEditButtonElement.addEventListener('click', () => {
    profileEditModalFormNameInput.setAttribute("value", profileTitle.textContent)
    profileEditModalFormJobInput.setAttribute("value", profileDescription.textContent)

    openModal(profileEditModal)
})

// Отправка формы редактирования профиля изменяет данные профиля и скрывает модалку
profileEditModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    profileTitle.textContent = profileEditModalFormNameInput.value
    profileDescription.textContent = profileEditModalFormJobInput.value

    closeModal(profileEditModal)
});
