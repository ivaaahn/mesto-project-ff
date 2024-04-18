const IS_OPENED_MODAL_CLASS = "popup_is-opened"
const IS_MODAL_CLASS = "popup"
const IS_CLOSE_MODAL_ICON = "popup__close"

function closeModalByPressEscape(evt) {
    if (evt.key === "Escape") {
        closeModal(document.querySelector(".popup_is-opened"))
    }
}

function closeModalByMouseDown(evt) {
    const targetEvtClassList = evt.target.classList

    // Клик по оверлею или по крестику приводит к закрытию
    if (targetEvtClassList.contains(IS_MODAL_CLASS) || targetEvtClassList.contains(IS_CLOSE_MODAL_ICON)) {
        closeModal(evt.currentTarget)
    }
}

export function openModal(modalElement) {
    document.addEventListener('keydown', closeModalByPressEscape)
    modalElement.addEventListener('mousedown', closeModalByMouseDown)

    modalElement.classList.add(IS_OPENED_MODAL_CLASS)
}

export function closeModal(modalElement) {
    document.removeEventListener('keydown', closeModalByPressEscape)
    modalElement.removeEventListener('mousedown', closeModalByMouseDown)

    modalElement.classList.remove(IS_OPENED_MODAL_CLASS)
}
