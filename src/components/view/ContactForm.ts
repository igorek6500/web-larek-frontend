import {Form} from '../common/Form';
import {IContactFormData} from '../../types';
import {IEvents} from '../base/events';

export class ContactForm extends Form<IContactFormData> {
	constructor(container: HTMLFormElement, event: IEvents) {
		super(container, event);

		this._name = container.elements.namedItem("name") as HTMLInputElement;
		this._email = container.elements.namedItem("email") as HTMLInputElement;
	}

	protected _name: HTMLInputElement;

	set name(value: string) {
		this._name.value = value;
	}

	protected _email: HTMLInputElement;

	set email(value: string) {
		this._email.value = value;
	}
}
