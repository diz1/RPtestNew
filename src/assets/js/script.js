//= jqsettings.js
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
	errorSpan = document.createElement('span');

const checkReg = (elem, regExp, msg) => {
		errorSpan.remove();
		elem.classList.remove('form__input--validate--error');
		elem.nextElementSibling.classList.remove('form__label--validate--error');
		if (regExp.test(elem.value) === false) {
			elem.classList.add('form__input--validate--error');
			elem.nextElementSibling.classList.add('form__label--validate--error');
			elem.parentElement.append(errorSpan);
			errorSpan.classList.add('validate');
			errorSpan.classList.add('validate__error');
			errorSpan.textContent = msg;
			return false;
		}
	},
	checkEmpty = elem => {
		let msg = 'Поле пустое, введите символы';
		errorSpan.remove();
		elem.classList.remove('form__input--validate--error');
		elem.nextElementSibling.classList.remove('form__label--validate--error');
		if (elem.value === '') {
			elem.classList.add('form__input--validate--error');
			elem.nextElementSibling.classList.add('form__label--validate--error');
			elem.parentElement.append(errorSpan);
			errorSpan.classList.add('validate');
			errorSpan.classList.add('validate__error');
			errorSpan.textContent = msg;
			return false;
		}
	},
	validMail = () => {
		let regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
			msg = 'E-Mail не введен или введен некорректно';
		checkReg(groupMail, regExp, msg);
	},
	validAlias = () => {
		let regExp = /^[A-Za-z0-9-]+$/,
			msg = 'Алиас не может быть пустым или содержать русские буквы и пробелы';
		checkReg(groupAlias, regExp, msg);
	},
	saveData = () => {
		localStorage.setItem('group_name', groupName.value);
		localStorage.setItem('group_alias', groupAlias.value);
		localStorage.setItem('group_mail', groupMail.value);
		localStorage.setItem('responsible_phone', responsiblePhone.value);
		localStorage.setItem('responsible_name', responsibleName.value);
		localStorage.setItem('responsible_position', responsiblePosition.value);
		localStorage.setItem('description_inner', descriptionInner.value);
		localStorage.setItem('description_public', descriptionPublic.value);
	},
	getData = () => {
		groupName.value = localStorage.getItem('group_name');
		groupAlias.value = localStorage.getItem('group_alias');
		groupMail.value = localStorage.getItem('group_mail');
		responsiblePhone.value = localStorage.getItem('responsible_phone');
		responsibleName.value = localStorage.getItem('responsible_name');
		responsiblePosition.value = localStorage.getItem('responsible_position');
		descriptionInner.value = localStorage.getItem('description_inner');
		descriptionPublic.value = localStorage.getItem('description_public');
	},
	showWarning = e => {
		e.preventDefault();
		saveData();
		warning.classList.toggle('warning__inner--active');
		setTimeout(() => {
			warning.classList.toggle('warning__inner--active');
		}, 5500);
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
getData();


// Обработчики
btnSave.addEventListener('click', showWarning);
checkboxPublicName.addEventListener('change', showPublic);
groupAlias.addEventListener('change', validAlias);
groupMail.addEventListener('change', validMail);
groupName.addEventListener('change', validName);
responsibleName.addEventListener('change', validResponsibleName);
responsiblePosition.addEventListener('change', validResponsiblePosition);
descriptionInner.addEventListener('change', validDescriptionInner);
descriptionPublic.addEventListener('change', validDescriptionPublic);

