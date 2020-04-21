// Маска для номера телефона
$("#responsible_phone").mask("+7(999)999-99-99");

// Маска для емэйла
'use strict';

// Переменные и функции
const btnSave = document.getElementById('btn_save'),
	warning = document.querySelector('.warning__inner'),
	checkboxPublicName = document.getElementById('check_public'),
	publicDescription = document.getElementById('public_description'),
	groupName = document.querySelector('#group_name'),
	groupAlias = document.querySelector('#group_alias'),
	groupMail = document.querySelector('#group_mail'),
	responsiblePhone = document.querySelector('#responsible_phone'),
	responsibleName = document.querySelector('#responsible_name'),
	responsiblePosition = document.querySelector('#responsible_position'),
	descriptionInner = document.querySelector('#description_inner'),
	descriptionPublic = document.querySelector('#description_public'),
	inputs = document.querySelectorAll('.form__input');

const checkReg = (elem, regExp, msg) => {
		let span = document.createElement('span');
		span.classList.toggle('validate');
		span.classList.toggle('validate__error');
		let lastElem = elem.parentElement.lastElementChild;
		if (lastElem.tagName.toLowerCase() === 'span') {
			lastElem.remove();
		}
		if (elem.classList.contains('form__input--validate--error')) {
			elem.classList.toggle('form__input--validate--error');
		}
		if (elem.nextElementSibling.classList.contains('form__label--validate--error')) {
			elem.nextElementSibling.classList.toggle('form__label--validate--error');
		}
		if (regExp.test(elem.value) === false) {
			elem.classList.toggle('form__input--validate--error');
			elem.nextElementSibling.classList.toggle('form__label--validate--error');
			elem.parentElement.append(span);
			span.textContent = msg;
			return false;
		}
	},
	checkEmpty = elem => {
		let msg = 'Поле пустое, введите символы';
		let span = document.createElement('span');
		span.classList.toggle('validate');
		span.classList.toggle('validate__error');
		let lastElem = elem.parentElement.lastElementChild;
		if (lastElem.tagName.toLowerCase() === 'span') {
			lastElem.remove();
		}
		if (elem.classList.contains('form__input--validate--error')) {
			elem.classList.toggle('form__input--validate--error');
		}
		if (elem.nextElementSibling.classList.contains('form__label--validate--error')) {
			elem.nextElementSibling.classList.toggle('form__label--validate--error');
		}
		if (elem.value === '') {
			elem.classList.toggle('form__input--validate--error');
			elem.nextElementSibling.classList.toggle('form__label--validate--error');
			elem.parentElement.append(span);
			span.textContent = msg;
			return false;
		}
	},
	checkInputValues = () => {
		inputs.forEach(item => {
			item.addEventListener('input', () => {
				if (item.type !== 'checkbox') {
					if (item.value !== '') {
						btnSave.removeAttribute('disabled');
					} else {
						btnSave.setAttribute('disabled', 'disabled');
					}
				}
			});
		});
	},
	checkInputValuesOnLoad = () => {
		inputs.forEach(item => {
			if (item.type !== 'checkbox') {
				if (item.value !== '') {
					btnSave.removeAttribute('disabled');
				}
			}
		});
	},
	validMail = () => {
		let regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			msg = 'E-Mail не введен или введен некорректно';
		checkReg(groupMail, regExp, msg);
	},
	validAlias = () => {
		let regExp = /^[A-Za-z0-9-]+$/,
			msg = 'Алиас не может быть пустым, содержать русские буквы, пробелы или символы';
		checkReg(groupAlias, regExp, msg);
	},
	saveData = () => {
		inputs.forEach(item => {
			if (item.value != '' && item.type != 'checkbox') {
				localStorage.setItem(item.name, item.value);
			} else {
				return;
			}
		});
		// localStorage.setItem('group_name', groupName.value);
		// localStorage.setItem('group_alias', groupAlias.value);
		// localStorage.setItem('group_mail', groupMail.value);
		// localStorage.setItem('responsible_phone', responsiblePhone.value);
		// localStorage.setItem('responsible_name', responsibleName.value);
		// localStorage.setItem('responsible_position', responsiblePosition.value);
		// localStorage.setItem('description_inner', descriptionInner.value);
		// localStorage.setItem('description_public', descriptionPublic.value);
	},
	getData = () => {
		let indication = 0;
		inputs.forEach(item => {
			for (let key in localStorage) {
				if (key === item.name && localStorage.getItem([key]) != '') {
					item.value = localStorage.getItem([key]);
					indication++;
				}
			}
		});
		if (indication > 0) {
			return true;
		}
		return false;
		// groupName.value = localStorage.getItem('group_name');
		// groupAlias.value = localStorage.getItem('group_alias');
		// groupMail.value = localStorage.getItem('group_mail');
		// responsiblePhone.value = localStorage.getItem('responsible_phone');
		// responsibleName.value = localStorage.getItem('responsible_name');
		// responsiblePosition.value = localStorage.getItem('responsible_position');
		// descriptionInner.value = localStorage.getItem('description_inner');
		// descriptionPublic.value = localStorage.getItem('description_public');
	},
	showWarning = () => {
		warning.classList.toggle('warning__inner--active');
		btnSave.setAttribute('disabled', 'true');
		
		setTimeout(() => {
			warning.classList.toggle('warning__inner--active');
			setTimeout(() => btnSave.removeAttribute('disabled'), 500);
		}, 7000);
	},
	showPublic = () => publicDescription.classList.toggle('form-description__item--active'),
	validName = () => {
		checkEmpty(groupName);
	},
	validResponsibleName = () => {
		checkEmpty(responsibleName);
	},
	validResponsiblePosition = () => {
		checkEmpty(responsiblePosition);
	},
	validDescriptionInner = () => {
		checkEmpty(descriptionInner);
	},
	validDescriptionPublic = () => {
		checkEmpty(descriptionPublic);
	};

// Вызовы функций
document.addEventListener('DOMContentLoaded', () => {
	if (getData()) {
		getData();
		showWarning();							// Получаем данные при загрузке страницы
	}
	checkInputValuesOnLoad();               // Проверяем заполненность полей при загрузке для включения кнопки сохранения
	checkInputValues();                     // Проверяем заполненность полей для включения кнопки сохранения
});

// Обработчики
window.addEventListener('beforeunload', saveData);
btnSave.addEventListener('click', e => {
	e.preventDefault();
	saveData();
	showWarning();
});

checkboxPublicName.addEventListener('input', showPublic);
groupAlias.addEventListener('input', validAlias);
groupMail.addEventListener('input', validMail);
groupName.addEventListener('input', validName);
responsibleName.addEventListener('input', validResponsibleName);
responsiblePosition.addEventListener('input', validResponsiblePosition);
descriptionInner.addEventListener('input', validDescriptionInner);
descriptionPublic.addEventListener('input', validDescriptionPublic);