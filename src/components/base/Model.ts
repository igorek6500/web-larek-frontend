import {IEvents} from "./events";

export abstract class Model<T> {
	protected data: Partial<T>;

	protected constructor(data: Partial<T>, protected events: IEvents) {
		this.data = {};
		this.update(data);
	}

	update(data: Partial<T>) {
		Object.assign(this.data, data);
	}

	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}

