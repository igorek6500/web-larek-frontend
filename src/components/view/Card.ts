import {BaseComponent} from "../base/BaseComponent";
import {ensureElement} from "../../utils/utils";
import {IProduct} from '../../types';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends BaseComponent<IProduct> {
	protected _deleteButton?: HTMLButtonElement;

	constructor(protected blockName: string, container: HTMLElement, actions?: ICardActions, inBasket?: boolean, forBasket?: boolean) {
		super(container);

		this._category = this.container.querySelector('.card__category');
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, this.container);
		this._image = this.container.querySelector('.card__image');
		this._description = this.container.querySelector(`.${blockName}__text`);
		this._index = this.container.querySelector('.basket__item-index');
		this._button = this.container.querySelector(`.${blockName}__button`);
		this._deleteButton = container.querySelector('.basket__item-delete');
		this._price = ensureElement<HTMLImageElement>(`.${blockName}__price`, container);

		if (this._deleteButton) {
			this._deleteButton.addEventListener('click', (evt) => {
				actions.onClick(evt);
			});
		}

		if (actions?.onClick) {
			const buttonToClick = this._button || container;
			buttonToClick.addEventListener('click', actions.onClick);
		}

		if (!forBasket) this.setButtonText(inBasket);
	}

	protected _id?: string;

	get id(): string {
		return this.container.dataset.id || '';
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	protected _category?: HTMLElement;

	set category(value: string) {
		const categoryMap: Record<string, string> = {
			"софт-скил": "soft",
			"хард-скил": "hard",
			"другое": "other",
			"дополнительное": "additional",
			"кнопка": "button",
		};

		const enCategory = categoryMap[value];

		Object.values(categoryMap).forEach((category) => {
			this.toggleClass(this._category, `card__category_${category}`, false);
		})
		this.toggleClass(this._category, `card__category_${enCategory}`, true);
		this.setText(this._category, value);
	}

	protected _title: HTMLElement;

	get title(): string {
		return this._title.textContent || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	protected _image?: HTMLImageElement;

	set image(value: string) {
		this.setImage(this._image, value, this.title)
	}

	protected _price?: HTMLElement;

	get price() {
		return parseInt(this._price.textContent);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this._price, `Бесценно`);
			this.setDisabled(this._button, true);
			this.setText(this._button, `Нельзя купить`);
		} else {
			this.setText(this._price, value + ` синапсов`);
		}
	}

	protected _description?: HTMLElement;

	set description(value: string) {
		this.setText(this._description, value)
	}

	protected _button?: HTMLButtonElement;

	set button(value: string) {
		if (this.price) {
			this.setText(this._button, value);
		} else {
			this.setText(this._button, `Нельзя купить`);
		}
	}

	protected _index: HTMLElement;

	set index(value: number) {
		this.setText(this._index, value);
	}

	setButtonText(value: boolean) {
		if (value) {
			this.button = `Добавлено в корзину`;
			this.setDisabled(this._button, value);
		} else this.button = `В корзину`;
	}
}
