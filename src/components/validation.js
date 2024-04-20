export function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector))

    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        const formSubmitButton = getFormSubmitButton(formElement, settings);
        const formInputList = getFormInputList(formElement, settings);
        toggleButtonState(formInputList, formSubmitButton, settings)

        formInputList.forEach((formInputElement) => {
            formInputElement.addEventListener('input', () => {
                checkFormInputValidity(formElement, formInputElement, settings)
                toggleButtonState(formInputList, formSubmitButton, settings)
            });
        });
    });
}

/**
 * Очищает ошибки валидации формы и делает кнопку неактивной.
 * @param {HTMLElement} formElement - Форма, ошибки валидации которой нужно очистить.
 * @param {Object} settings - Настройки валидации.
 */
export function clearValidation(formElement, settings) {
    const formInputList = getFormInputList(formElement, settings);
    const formSubmitButton = getFormSubmitButton(formElement, settings);

    formInputList.forEach((inputElement, validationSettings) => {
        hideInputError(formElement, inputElement, validationSettings);
        inputElement.value = "";
    });

    disableButton(formSubmitButton, settings);
}


function toggleButtonState(formInputList, buttonElement, settings) {
    const inputIsValid = formInputList.every((formInputElement) => formInputElement.validity.valid);
    if (inputIsValid) {
        enableButton(buttonElement, settings)
    } else {
        disableButton(buttonElement, settings)
    }
}

function enableButton(buttonElement, settings) {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
}

function disableButton(buttonElement, settings) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
}

function checkFormInputValidity(formElement, formInputElement, settings) {
    const formInputElementValidity = formInputElement.validity;

    if (formInputElementValidity.valid) {
        hideInputError(formElement, formInputElement, settings);
    } else if (formInputElementValidity.patternMismatch) {
        showInputError(formElement, formInputElement, formInputElement.dataset.errorMessage, settings);
    } else {
        showInputError(formElement, formInputElement, formInputElement.validationMessage, settings);
    }
}


const showInputError = (formElement, formInputElement, errorMessage, settings) => {
    // Помечаем инпут как ошибочный
    formInputElement.classList.add(settings.inputErrorClass);

    // Показываем элемент с инфой об ошибке
    const errorElement = getFormInputElementErrorElement(formElement, formInputElement);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, formInputElement, settings) => {
    // Убираем пометку инпута как ошибочного
    formInputElement.classList.remove(settings.inputErrorClass);

    // Скрываем элемент с инфой об ошибке
    const errorElement = getFormInputElementErrorElement(formElement, formInputElement);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};


function getFormInputElementErrorElement(formElement, formInputElement) {
    return formElement.querySelector(`.${formInputElement.id}-error`)
}

function getFormInputList(formElement, settings) {
    return Array.from(formElement.querySelectorAll(settings.inputSelector));
}

function getFormSubmitButton(formElement, settings) {
    return formElement.querySelector(settings.submitButtonSelector);
}




