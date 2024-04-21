import './styles/index.css';

import {createCard, deleteCard, likeCard} from "./components/card";
import {closeModal, openModal} from "./components/modal";
import {clearValidation, enableValidation} from "./components/validation";
import {addCardToServer, fetchCards, fetchCurrentUser, updateAvatarOnServer, updateCurrentUser} from "./components/api";

const BUTTON_LOADER_TEXT = "Сохранение...";

const currentUser = {
    id: "",
    name: "",
    job: "",
    avatar: "",

    initFromServer: function (serverData) {
        this.id = serverData._id
        this.name = serverData.name
        this.job = serverData.about
        this.avatar = serverData.avatar
    }
}


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

    clearValidation(profileEditModalForm)
    openModal(profileEditModal)
}

function syncProfileWithCurrentUser() {
    profileName.textContent = currentUser.name
    profileJob.textContent = currentUser.job
    profileAvatar.style.backgroundImage = `url(${currentUser.avatar})`
}

function updateProfile(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter
    const originalButtonText = submitButton.textContent

    submitButton.textContent = BUTTON_LOADER_TEXT

    updateCurrentUser({
        name: profileEditModalFormNameInput.value,
        about: profileEditModalFormJobInput.value
    })
        .then((res) => {
            currentUser.initFromServer(res)
            syncProfileWithCurrentUser()
            closeModal(profileEditModal)
        })
        .catch(console.log)
        .finally(() => {
            submitButton.textContent = originalButtonText
        })
}

profileEditButton.addEventListener('click', openProfileEditModal)
profileEditModalForm.addEventListener('submit', updateProfile);


// Добавление карточки
const cardsListElement = document.querySelector(".places__list")

const cardOpenModal = document.querySelector(".popup_type_image")
const cardOpenModalImage = cardOpenModal.querySelector(".popup__image")
const cardOpenModalCaption = cardOpenModal.querySelector(".popup__caption")

const cardAddButton = document.querySelector(".profile__add-button")
const cardAddModal = document.querySelector(".popup_type_new-card")
const cardAddModalForm = cardAddModal.querySelector(".popup__form")
const cardAddModalFormTitleInput = cardAddModalForm.querySelector(".popup__input_type_card-name")
const cardAddModalFormUrlInput = cardAddModalForm.querySelector(".popup__input_type_url")

function openCardOpenModal(name, src) {
    cardOpenModalImage.src = src
    cardOpenModalImage.alt = name
    cardOpenModalCaption.textContent = name
    openModal(cardOpenModal)
}

function openCardAddModal() {
    openModal(cardAddModal)
}

function addCard(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter
    const originalButtonText = submitButton.textContent

    submitButton.textContent = BUTTON_LOADER_TEXT

    addCardToServer(cardAddModalFormTitleInput.value, cardAddModalFormUrlInput.value)
        .then((cardData) => {
            cardAddModalForm.reset()
            clearValidation(cardAddModalForm)

            cardsListElement.prepend(
                createCard(cardData, currentUser.id, openCardOpenModal, deleteCard, likeCard)
            )
            closeModal(cardAddModal)
        })
        .catch(console.log)
        .finally(() => {
            submitButton.textContent = originalButtonText
        })

}

cardAddButton.addEventListener('click', openCardAddModal)
cardAddModalForm.addEventListener('submit', addCard);


// Смена аватара
const profileAvatar = document.querySelector(".profile__image")
const profileAvatarChangeModal = document.querySelector(".popup_type_change-avatar")
const profileAvatarChangeModalForm = profileAvatarChangeModal.querySelector(".popup__form")
const profileAvatarChangeModalFormUrlInput = profileAvatarChangeModalForm.querySelector(".popup__input_type_url")

function openChangeAvatarModal() {
    openModal(profileAvatarChangeModal)
}

function changeAvatar(evt) {
    evt.preventDefault();

    const submitButton = evt.submitter
    const originalButtonText = submitButton.textContent

    submitButton.textContent = BUTTON_LOADER_TEXT

    updateAvatarOnServer(profileAvatarChangeModalFormUrlInput.value)
        .then((res) => {
            currentUser.initFromServer(res)
            closeModal(profileAvatarChangeModal)
        })
        .then(syncProfileWithCurrentUser)
        .catch(console.log)
        .finally(() => {
            submitButton.textContent = originalButtonText
        })
}

profileAvatar.addEventListener('click', openChangeAvatarModal)
profileAvatarChangeModalForm.addEventListener('submit', changeAvatar);


// Инициализация данных
Promise.all([fetchCurrentUser(), fetchCards()])
    .then(([userData, cardsData]) => {
        currentUser.initFromServer(userData)
        syncProfileWithCurrentUser()

        cardsData.forEach((cardData) => {
            cardsListElement.prepend(createCard(cardData, currentUser.id, openCardOpenModal, deleteCard, likeCard))
        })
    })
    .catch(console.log)


// Валидация форм
enableValidation()