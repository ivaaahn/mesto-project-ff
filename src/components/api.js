const config = {
    baseUrl: "https://mesto.nomoreparties.co/v1/",
    token: "ad7b7e5c-615c-4d26-bcc2-88a9d5de659e",
    groupId: "cohort-magistr-2",
}

const baseHeaders = {
    authorization: config.token,
    "Content-Type": "application/json",
}

function makeUrl(path) {
    return new URL(`${config.groupId}${path}`, config.baseUrl).toString();
}

function checkResponse(res) {
    if (!res.ok) {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }

    return res.json();
}

export function fetchCurrentUser() {
    return fetch(makeUrl("/users/me"), {headers: baseHeaders})
        .then(checkResponse)
}

export function updateCurrentUser(data) {
    return fetch(makeUrl("/users/me"), {
        method: "PATCH",
        headers: baseHeaders,
        body: JSON.stringify(data)
    })
        .then(checkResponse)
}
export function updateAvatarOnServer(avatarUrl) {
    return fetch(makeUrl("/users/me/avatar"), {
        method: "PATCH",
        headers: baseHeaders,
        body: JSON.stringify({avatar: avatarUrl})
    })
        .then(checkResponse)
}

export function fetchCards() {
    return fetch(makeUrl("/cards"), {headers: baseHeaders})
        .then(checkResponse)
}

export function addCardToServer(name, link) {
    return fetch(makeUrl("/cards"), {
        method: "POST",
        headers: baseHeaders,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(checkResponse)
}

export function deleteCardFromServer(cardId) {
    return fetch(makeUrl(`/cards/${cardId}`), {
        method: "DELETE",
        headers: baseHeaders,
    })
        .then(checkResponse)
}

export function likeCardOnServer(cardId) {
    return fetch(makeUrl(`/cards/likes/${cardId}`), {
        method: "PUT",
        headers: baseHeaders,
    })
        .then(checkResponse)
}

export function unlikeCardOnServer(cardId) {
    return fetch(makeUrl(`/cards/likes/${cardId}`), {
        method: "DELETE",
        headers: baseHeaders,
    })
        .then(checkResponse)
}


