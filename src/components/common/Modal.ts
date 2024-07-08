import {ensureElement} from '../../utils/utils';
import {BaseComponent} from '../base/BaseComponent';
import {IEvents} from '../base/events';

interface IModalState {
	content: HTMLElement | null;
}

export class Modal extends BaseComponent<IModalState> {
	protected _closeButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected event: IEvents) {
		super(container);

		this._content = ensureElement<HTMLElement>(`.modal__content`, container);
		this._closeButton = ensureElement<HTMLButtonElement>(
			`.modal__close`,
			container
		);
		this._closeButton.addEventListener(`click`, this.close.bind(this));
		this.container.addEventListener(`click`, this.close.bind(this));
		this._content.addEventListener(`click`, (evt) => evt.stopPropagation());
	}

	protected _content: HTMLElement;

	set content(value: HTMLElement | null) {
		if (value) {
			this._content.replaceChildren(value);
		} else {
			this._content.innerHTML = ''; // Clear content
		}
	}

	open() {
		this.toggleClass(this.container, `modal_active`, true);
		this.event.emit(`modal:open`);
	}

	close() {
		this.toggleClass(this.container, `modal_active`, false);
		this.content = null;
		this.event.emit(`modal:close`);
	}

	render(data: IModalState): HTMLElement {
		super.render(data);
		this.content = data.content;
		this.open();
		return this.container;
	}
}
