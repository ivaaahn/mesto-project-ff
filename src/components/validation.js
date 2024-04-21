const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export function enableValidation() {
    const formList = Array.from(document.querySelectorAll(config.formSelector))

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        const formSubmitButton = getFormSubmitButton(formElement);
        const formInputList = getFormInputList(formElement);
        toggleButtonState(formInputList, formSubmitButton)

        formInputList.forEach((formInputElement) => {
            formInputElement.addEventListener('input', () => {
                checkFormInputValidity(formElement, formInputElement)
                toggleButtonState(formInputList, formSubmitButton)
            });
        });
    });
}

/**
 * Очищает ошибки валидации формы и делает кнопку неактивной.
 * @param {HTMLElement} formElement - Форма, ошибки валидации которой нужно очистить.
 */
export function clearValidation(formElement) {
    const formInputList = getFormInputList(formElement);
    const formSubmitButton = getFormSubmitButton(formElement);

    formInputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });

    disableButton(formSubmitButton);
}


function toggleButtonState(formInputList, buttonElement) {
    const inputIsValid = formInputList.every((formInputElement) => formInputElement.validity.valid);
    if (inputIsValid) {
        enableButton(buttonElement)
    } else {
        disableButton(buttonElement)
    }
}

function enableButton(buttonElement) {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
}

function disableButton(buttonElement) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
}

function checkFormInputValidity(formElement, formInputElement) {
    const formInputElementValidity = formInputElement.validity;

    if (formInputElementValidity.valid) {
        hideInputError(formElement, formInputElement);
    } else if (formInputElementValidity.patternMismatch) {
        showInputError(formElement, formInputElement, formInputElement.dataset.errorMessage);
    } else {
        showInputError(formElement, formInputElement, formInputElement.validationMessage);
    }
}


const showInputError = (formElement, formInputElement, errorMessage) => {
    // Помечаем инпут как ошибочный
    formInputElement.classList.add(config.inputErrorClass);

    // Показываем элемент с инфой об ошибке
    const errorElement = getFormInputErrorElement(formElement, formInputElement);
    errorElement.classList.add(config.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, formInputElement) => {
    // Убираем пометку инпута как ошибочного
    formInputElement.classList.remove(config.inputErrorClass);

    // Скрываем элемент с инфой об ошибке
    const errorElement = getFormInputErrorElement(formElement, formInputElement);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};


function getFormInputErrorElement(formElement, formInputElement) {
    return formElement.querySelector(`.${formInputElement.id}-error`)
}

function getFormInputList(formElement) {
    return Array.from(formElement.querySelectorAll(config.inputSelector));
}

function getFormSubmitButton(formElement) {
    return formElement.querySelector(config.submitButtonSelector);
}




