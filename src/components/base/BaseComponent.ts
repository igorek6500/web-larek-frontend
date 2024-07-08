export abstract class BaseComponent<T> {
    protected constructor(protected readonly container: HTMLElement) {
    }

    render(data?: Partial<T>): HTMLElement {
        if (data) {
            Object.assign(this, data);
        }
        return this.container;
    }

    protected toggleClass(element: HTMLElement, className: string, force?: boolean) {
        if (element) {
            element.classList.toggle(className, force);
        }
    }

    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    protected setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) {
                element.setAttribute('disabled', 'disabled');
            } else {
                element.removeAttribute('disabled');
            }
        }
    }

    protected setHidden(element: HTMLElement) {
        if (element) {
            element.style.display = 'none';
        }
    }

    protected setVisible(element: HTMLElement) {
        if (element) {
            element.style.removeProperty('display');
        }
    }

    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            element.alt = alt ?? '';
        }
    }
}
