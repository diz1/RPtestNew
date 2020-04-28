'use strict';
document.addEventListener('DOMContentLoaded', () => {
//= maskPhone


	// Переменные и функции

	const btnSave = document.getElementById('btn_save'),
		btnConfirm = document.getElementById('btn_confirm'),
		btnReset = document.getElementById('btn_reset'),
		warning = document.querySelector('.warning__inner'),
		infoBlock = document.querySelector('.info'),
		inputs = document.querySelectorAll('.form__input'),
		labels = document.querySelectorAll('.form__label'),
		inputsTypeInput = [], inputLabels = [];
	let inputTypeCheckbox = {}, canSave = false, errors;

	inputs.forEach(item => {
		if (item.type !== 'checkbox') {
			inputsTypeInput.push(item);
		} else if (item.type === 'checkbox') {
			inputTypeCheckbox = item;
		}
	});
	labels.forEach(item => item.className === 'form__label' ? inputLabels.push(item) : false);


	// Функции

	const showError = (item, msg) => {
			const span = document.createElement('span'),
				itemParent = item.parentElement;

			span.classList.toggle('validate');
			span.classList.toggle('validate__error');

			if (msg) {
				span.textContent = msg;
			}

			inputLabels.forEach(label => {
				if (label.parentElement === itemParent) {
					label.classList.add('form__label--validate--error');
				}
			});

			item.classList.add('form__input--validate--error');

			itemParent.append(span);
		},
		delError = item => {
			const itemParent = item.parentElement;

			if (itemParent.children.length > 2) {
				[...itemParent.children].forEach(elem => {
					if (elem.tagName.toLowerCase() === 'span') {
						elem.remove();
					}
				});
			}

			inputLabels.forEach(label => {
				if (label.parentElement === itemParent) {
					label.classList.remove('form__label--validate--error');
				}
			});

			item.classList.remove('form__input--validate--error');
		},
		saveData = () => {
			if (!canSave) {
				return
			}

			inputsTypeInput.forEach(item => {
				if (item.value.trim() !== '') {
					localStorage.setItem(item.id, item.value.toString());
				}
			});
			localStorage.setItem(inputTypeCheckbox.id, inputTypeCheckbox.checked)
		},
		getData = () => {
			let indication = 0;
			inputsTypeInput.forEach(item => {
				if (localStorage.getItem(item.id) !== '') {
					indication++;
					item.value = localStorage.getItem(item.id);
				}
			});
			inputTypeCheckbox.checked = localStorage.getItem(inputTypeCheckbox.id) === 'true' ? 1 : 0;
			inputsTypeInput.forEach(item => {
				if (item.parentElement.classList.contains('form-description__item--hide')) {
					if (inputTypeCheckbox.checked) {
						item.parentElement.classList.add('form-description__item--active');
					} else {
						item.parentElement.classList.remove('form-description__item--active');
						item.value = '';
						localStorage.removeItem(item.id);
					}
				}
			});

			return indication > 0;

		},
		showWarning = () => {
			warning.classList.toggle('warning__inner--active');
			btnSave.setAttribute('disabled', 'true');

			setTimeout(() => {
				warning.classList.toggle('warning__inner--active');
				// setTimeout(() => btnSave.removeAttribute('disabled'), 500);
			}, 7000);
		};


	// Вызовы функций

	maskPhone('#responsible_phone');
	if (localStorage.length > 1) {
		getData();
		showWarning();
	}


	// Обработчики событий

	inputTypeCheckbox.addEventListener('change', () => {
		inputsTypeInput.forEach(item => {
			if (item.parentElement.classList.contains('form-description__item--hide')) {
				item.parentElement.classList.toggle('form-description__item--active');
			}
		});
	});
	infoBlock.addEventListener('input', e => {
		const target = e.target;

		inputsTypeInput.forEach(item => {
			if (target === item) {
				if (item.id === 'group_name') {
					// const regExp = /[\w\d\!\@\#\$\%\^\&\*\(\)\_\+\-\=\{\[\}\]\:\;\"\'\<\,\>\.\?\\\/\|\№]+/gi;
					const regExp = /^[a-zа-я\s]+$/i;
					if (regExp.test(item.value)) {
						delError(item);
					} else if (!regExp.test(item.value)) {
						if (item.parentElement.children.length < 3) {
							showError(item, 'Поле "Название группы" должно соржать только' +
								' русские, английские буквы и символы пробела');
						}
					}
				}
				if (item.id === 'group_alias') {
					const regExp = /^[A-Za-z0-9-]+$/;
					if (regExp.test(item.value)) {
						delError(item);
					} else if (!regExp.test(item.value)) {
						if (item.parentElement.children.length < 3) {
							showError(item, 'Алиас не может быть пустым, содержать ' +
								'русские буквы, пробелы или символы (кроме символа "-")');
						}
					}
				}
				if (item.id === 'group_mail') {
					const regExp = /^([\w-]+\.)*[\w-]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,6}$/;
					if (regExp.test(item.value)) {
						delError(item);
					} else if (!regExp.test(item.value.toLowerCase())) {
						if (item.parentElement.children.length < 3) {
							showError(item, 'Некорректно заполненное поле');
						}
					}
				}
				if (item.id === 'responsible_name') {
					const regExp = /^[a-zа-я\s]+$/i;
					if (regExp.test(item.value)) {
						delError(item);
					} else if (!regExp.test(item.value.toLowerCase())) {
						if (item.parentElement.children.length < 3) {
							showError(item, 'Поле "ФИО представителя" должно соржать только русские, ' +
								'английские буквы и символы пробела');
						}
					}
				}
				if (item.id === 'responsible_position') {
					const regExp = /^[a-zа-я\s]+$/i;
					if (regExp.test(item.value)) {
						delError(item);
					} else if (!regExp.test(item.value.toLowerCase())) {
						if (item.parentElement.children.length < 3) {
							showError(item, 'Поле "Должность ответственного" должно соржать только русские, ' +
								'английские буквы и символы пробела');
						}
					}
				}
			}
		});
		errors = document.querySelectorAll('span.validate');

		const values = inputsTypeInput.filter(item => {
			if ((errors && errors.length === 0) && item.value.trim() !== '') {
				return item;
			}
		});

		if (values.length > 0) {
			canSave = true;
			btnConfirm.removeAttribute('disabled');
			btnSave.removeAttribute('disabled');
			return
		}
		canSave = false;
		btnConfirm.setAttribute('disabled','true');
		btnSave.setAttribute('disabled','true');
	});

	infoBlock.addEventListener('click', e => {
		const target = e.target;
		if (target === btnReset) {
			inputTypeCheckbox.checked = false;
			inputsTypeInput.forEach(item => {
				delError(item);

				if (item.parentElement.classList.contains('form-description__item--hide')) {
					item.parentElement.classList.remove('form-description__item--active');
					item.parentElement.value = '';
				}
			});
			btnConfirm.setAttribute('disabled','true');
			btnSave.setAttribute('disabled','true');
		}
		if (target === btnSave) {
			e.preventDefault();
			saveData();
			showWarning();
		}
	});
	window.addEventListener('beforeunload', saveData);
});
