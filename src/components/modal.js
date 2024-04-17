// Модуль для упрощения работы с модалками

export function openModal(modalElement) {
    // Открытие модалки сводится к добавлению класса popup_is-opened и навешиванию
    // обработчиков нажатий на escape и кликов по оверлею. Также навешивается обработчик
    // клика по крестику, закрывающему модалку

    function hidePopupByPressEscape(evt) {
        if (evt.key === "Escape") {
            closeModal(modalElement)
            document.removeEventListener('keydown', hidePopupByPressEscape)
        }
    }
    document.addEventListener('keydown', hidePopupByPressEscape)


    function hidePopupByClickOnOverlay(evt) {
        if (evt.target.classList.contains("popup")) {
            closeModal(modalElement)
            document.removeEventListener('keydown', hidePopupByClickOnOverlay)
        }
    }
    document.addEventListener('click', hidePopupByClickOnOverlay)

    const closePopupItem = modalElement.querySelector(".popup__close")
    closePopupItem.addEventListener('click', () => closeModal(modalElement))

    modalElement.classList.add("popup_is-opened")
}

export function closeModal(modalElement) {
    // Скрытие модалки сводится к удалению класса popup_is-opened
    modalElement.classList.remove("popup_is-opened")
}