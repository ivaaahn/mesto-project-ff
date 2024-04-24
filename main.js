(()=>{"use strict";var e=".card",t="#card-template",n=".card__title",r=".card__image",o=".card__delete-button",c=".card__like-button",a=".card__like-counter",i="card__like-button_is-active",u="card__delete-button-hidden",l=document.querySelector(t).content.querySelector(e);function s(e,t,s,d,p){var f=l.cloneNode(!0);f.querySelector(n).textContent=e.name;var _=f.querySelector(r);_.addEventListener("click",(function(){return s(e)})),_.src=e.link,_.alt=e.name,f.querySelector(a).textContent=e.likes.length;var m=f.querySelector(c);m.addEventListener("click",(function(){return p(e,f)})),e.likes.map((function(e){return e._id})).includes(t)&&m.classList.add(i);var v=f.querySelector(o);return e.owner._id===t?v.addEventListener("click",(function(){return d(e,f)})):v.classList.add(u),f}var d={baseUrl:"https://mesto.nomoreparties.co/v1/",token:"ad7b7e5c-615c-4d26-bcc2-88a9d5de659e",groupId:"cohort-magistr-2"},p={authorization:d.token,"Content-Type":"application/json"};function f(e){return new URL("".concat(d.groupId).concat(e),d.baseUrl).toString()}function _(e){return e.ok?e.json():Promise.reject("Что-то пошло не так: ".concat(e.status))}function m(e){return fetch(f("/cards/likes/".concat(e)),{method:"PUT",headers:p}).then(_)}function v(e){return fetch(f("/cards/likes/".concat(e)),{method:"DELETE",headers:p}).then(_)}var y="popup_is-opened",h="popup",S="popup__close";function b(e){"Escape"===e.key&&C(document.querySelector(".popup_is-opened"))}function q(e){var t=e.target.classList;(t.contains(h)||t.contains(S))&&C(e.currentTarget)}function g(e){document.addEventListener("keydown",b),e.addEventListener("mousedown",q),e.classList.add(y)}function C(e){document.removeEventListener("keydown",b),e.removeEventListener("mousedown",q),e.classList.remove(y)}var L={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function E(e){var t=T(e),n=O(e);t.forEach((function(t){j(e,t)})),x(n)}function k(e,t){e.every((function(e){return e.validity.valid}))?function(e){e.classList.remove(L.inactiveButtonClass),e.disabled=!1}(t):x(t)}function x(e){e.classList.add(L.inactiveButtonClass),e.disabled=!0}var A=function(e,t,n){t.classList.add(L.inputErrorClass);var r=w(e,t);r.classList.add(L.errorClass),r.textContent=n},j=function(e,t){t.classList.remove(L.inputErrorClass);var n=w(e,t);n.classList.remove(L.errorClass),n.textContent=""};function w(e,t){return e.querySelector(".".concat(t.id,"-error"))}function T(e){return Array.from(e.querySelectorAll(L.inputSelector))}function O(e){return e.querySelector(L.submitButtonSelector)}function D(e){console.error("Ошибка: ".concat(e))}function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var P="Сохранение...",B={id:"",name:"",job:"",avatar:"",initFromServer:function(e){this.id=e._id,this.name=e.name,this.job=e.about,this.avatar=e.avatar}},U=document.querySelector(".profile__title"),F=document.querySelector(".profile__description"),M=document.querySelector(".profile__edit-button"),N=document.querySelector(".popup_type_edit"),J=N.querySelector(".popup__form"),H=J.querySelector(".popup__input_type_name"),z=J.querySelector(".popup__input_type_description");function R(){U.textContent=B.name,F.textContent=B.job,re.style.backgroundImage="url(".concat(B.avatar,")")}M.addEventListener("click",(function(){H.value=U.textContent,z.value=F.textContent,E(J),g(N)})),J.addEventListener("submit",(function(e){e.preventDefault();var t,n=e.submitter,r=n.textContent;n.textContent=P,(t={name:H.value,about:z.value},fetch(f("/users/me"),{method:"PATCH",headers:p,body:JSON.stringify(t)}).then(_)).then((function(e){B.initFromServer(e),R(),C(N)})).catch(console.log).finally((function(){n.textContent=r}))}));var $=document.querySelector(".places__list"),G=document.querySelector(".popup_type_image"),K=G.querySelector(".popup__image"),Q=G.querySelector(".popup__caption"),V=document.querySelector(".profile__add-button"),W=document.querySelector(".popup_type_new-card"),X=W.querySelector(".popup__form"),Y=X.querySelector(".popup__input_type_card-name"),Z=X.querySelector(".popup__input_type_url");function ee(e){K.src=e.link,K.alt=e.name,Q.textContent=e.name,g(G)}function te(e,t){var n;(n=e._id,fetch(f("/cards/".concat(n)),{method:"DELETE",headers:p}).then(_)).then((function(){!function(e){e.remove()}(t)})).catch(D)}function ne(e,t){var n=function(e){return e.querySelector(c).classList.contains(i)}(t)?v:m;n(e._id).then((function(e){!function(e,t){var n=e.querySelector(c),r=e.querySelector(a);n.classList.toggle(i),r.textContent=t}(t,e.likes.length)})).catch(D)}V.addEventListener("click",(function(){g(W)})),X.addEventListener("submit",(function(e){e.preventDefault();var t,n,r=e.submitter,o=r.textContent;r.textContent=P,(t=Y.value,n=Z.value,fetch(f("/cards"),{method:"POST",headers:p,body:JSON.stringify({name:t,link:n})}).then(_)).then((function(e){X.reset(),E(X),$.prepend(s(e,B.id,ee,te,ne)),C(W)})).catch(console.log).finally((function(){r.textContent=o}))}));var re=document.querySelector(".profile__image"),oe=document.querySelector(".popup_type_change-avatar"),ce=oe.querySelector(".popup__form"),ae=ce.querySelector(".popup__input_type_url");re.addEventListener("click",(function(){g(oe)})),ce.addEventListener("submit",(function(e){e.preventDefault();var t,n=e.submitter,r=n.textContent;n.textContent=P,(t=ae.value,fetch(f("/users/me/avatar"),{method:"PATCH",headers:p,body:JSON.stringify({avatar:t})}).then(_)).then((function(e){B.initFromServer(e),C(oe)})).then(R).catch(console.log).finally((function(){n.textContent=r}))})),Promise.all([fetch(f("/users/me"),{headers:p}).then(_),fetch(f("/cards"),{headers:p}).then(_)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];B.initFromServer(o),R(),c.forEach((function(e){$.prepend(s(e,B.id,ee,te,ne))}))})).catch(console.log),Array.from(document.querySelectorAll(L.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()}));var t=O(e),n=T(e);k(n,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t){var n=t.validity;n.valid?j(e,t):n.patternMismatch?A(e,t,t.dataset.errorMessage):A(e,t,t.validationMessage)}(e,r),k(n,t)}))}))}))})();