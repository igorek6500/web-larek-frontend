import {ensureElement} from '../../utils/utils';
import {BaseComponent} from '../base/BaseComponent';
import {IEvents} from '../base/events';

interface IFormData {
	valid: boolean;
	errors: string[];
	address: string;
	payment: string;
	phone: string;
	email: string;
}

export class Form<T> extends BaseComponent<IFormData> {
	protected _submitButton: HTMLButtonElement;
	protected _errorContainer: HTMLElement;

	constructor(protected formElement: HTMLFormElement, protected eventManager: IEvents) {
		super(formElement);

		try {
			this._submitButton = ensureElement<HTMLButtonElement>(
				'button[type=submit]',
				this.formElement
			);
		} catch (e) {
			this._submitButton = ensureElement<HTMLButtonElement>(
				'button',
				this.formElement
			);
		}

		this._errorContainer = ensureElement<HTMLElement>('.form__errors', this.formElement);

		this.formElement.addEventListener('submit', (event: Event) => {
			event.preventDefault();
			this.eventManager.emit(`${this.formElement.name}:submit`);
		});

		this.formElement.addEventListener('input', (event: Event) => {
			const inputElement = event.target as HTMLInputElement;
			const fieldName = inputElement.name as keyof T;
			const fieldValue = inputElement.value;
			this.onInputChange(fieldName, fieldValue);
		});
	}

	set valid(value: boolean) {
		this.setDisabled(this._submitButton, value);
		// this._submitButton.disabled = !value;
	}

	set errors(message: string) {
		this.setText(this._errorContainer, message);
	}

	onInputChange(fieldName: keyof T, value: string) {
		this.eventManager.emit(`${this.formElement.name}.${String(fieldName)}:change`, {
			field: fieldName,
			value,
		});
	}

	clearForm() {
		this.formElement.reset();
	}
}
