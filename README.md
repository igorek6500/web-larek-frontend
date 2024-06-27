https://github.com/igorek6500/web-larek-frontend

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектурное проектирование

Рассмотрим основные компоненты и их взаимодействие.

### Ключевые классы (Основные классы)

1. **BaseComponent<T>**

```typescript
class BaseComponent<T extends HTMLElement> {
  container: T;

  constructor(container: T) {
    this.container = container;
  }

  toggleElementClass() {
    // Переключение класса элемента
  }

  setElementText() {
    // Установка текста элемента
  }

  disableElement() {
    // Отключение элемента
  }

  hideElement() {
    // Скрытие элемента
  }

  showElement() {
    // Отображение элемента
  }

  setElementImage() {
    // Установка изображения элемента
  }

  renderData() {
    // Отображение данных
  }
}
```

- Представляет базовый компонент с различными элементами HTML и методами для управления ими.


2. **AbstractView<T>**

```typescript
class AbstractView<T extends HTMLElement> extends BaseComponent<T> {
  events: IEvents;

  constructor(container: T, events: IEvents) {
    super(container);
    this.events = events;
  }
}
```

- Базовый абстрактный класс для всех представлений, наследует BaseComponent.
- Содержит контейнер и события.

### Классы

1. **WebApiImpl**

```typescript
class WebApiImpl implements WebApi {
  cdn: string;
  baseUrl: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    this.cdn = cdn;
    this.baseUrl = baseUrl;
  }
}
```

- Класс для взаимодействия с WebLarek API, реализует интерфейс WebApi.
- Свойства:
  - `cdn`: URL контентной сети доставки.

2. **EventsImpl**
  - Класс для управления событиями, реализует интерфейс Events.
  - Методы:
    - `onAll()`: Подписка на все события.
    - `offAll()`: Отписка от всех событий.

3. **AppData**

```typescript
class AppData {
  items: IProduct[] = [];
  preview: IProduct | null = null;
  basket: IBasket = {items: [], total: 0};
  order: IOrder | null = null;
  formErrors: Partial<Record<string, string>> = {};
  events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }
}
```

- Класс для управления данными приложения.
- Свойства:
  - `items`: Список продуктов.
  - `preview`: Предпросмотр продукта.
  - `basket`: Корзина.
  - `order`: Заказ.
  - `formErrors`: Ошибки формы.
  - `events`: События.
- Методы:
  - `setItems()`: Установка списка продуктов.
  - `setPreviewItem()`: Установка продукта для предпросмотра.
  - `isInBasket()`: Проверка наличия продукта в корзине.
  - `addToBasket()`: Добавление продукта в корзину.
  - `removeFromBasket()`: Удаление продукта из корзины.
  - `clearBasket()`: Очистка корзины.
  - `setPaymentMethod()`: Установка метода оплаты.
  - `setOrderField()`: Установка поля заказа.
  - `validateOrder()`: Валидация заказа.
  - `clearOrder()`: Очистка заказа.

4. **Page**

```typescript
class Page extends AbstractView<HTMLDivElement> {
  counter: HTMLElement;
  catalog: HTMLElement;
  wrapper: HTMLElement;
  basket: HTMLElement;
}
```

- Представление страницы.
- Свойства:
  - `counter`: Счетчик.
  - `catalog`: Каталог.
  - `wrapper`: Обертка.
  - `basket`: Корзина.
- Методы:
  - `counter()`: Управление счетчиком.
  - `catalog()`: Управление каталогом.
  - `locked()`: Управление блокировкой.

5. **Basket**

```typescript
class Basket extends AbstractView<HTMLDivElement> {
  items: string {
};
list: string[];
total: number;
button: HTMLElement;
}
```

- Представление корзины.
- Свойства:
  - `items`: Элементы корзины.
  - `list`: Список элементов.
  - `total`: Общая стоимость.
  - `button`: Кнопка управления.
- Методы:
  - `toggleButton()`: Переключение состояния кнопки.
  - `setItems()`: Установка элементов корзины.
  - `total()`: Расчет общей стоимости.

6. **Card**

```typescript
class Card extends AbstractView<HTMLDivElement> {
  title: string;
  image: string;
  price: number;
  description: string;
  category: string;
  button: HTMLButtonElement;
}
```

- Представление карточки продукта.
- Свойства:
  - `title`: Заголовок.
  - `image`: Изображение.
  - `price`: Цена.
  - `description`: Описание.
  - `category`: Категория.
  - `button`: Кнопка.
- Методы:
  - `toggle()`: Переключение состояния.
  - `setTitle()`: Установка заголовка.
  - `setPrice()`: Установка цены.
  - `setDescription()`: Установка описания.
  - `setImage()`: Установка изображения.
  - `button()`: Управление кнопкой.

7. **Form**

```typescript
class Form extends AbstractView<HTMLFormElement> {
  submit: HTMLButtonElement;
  errors: HTMLElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  ...
  }
}
```

- Представление формы.
- Свойства:
  - `submit`: Кнопка отправки.
  - `errors`: Ошибки формы.
- Методы:
  - `inputChange()`: Обработка изменения ввода.
  - `submit()`: Отправка формы.
  - `setVisible()`: Установка видимости.
  - `errors()`: Обработка ошибок.

8. **OrderForm**

```typescript
class OrderForm extends Form {
  _paymentCard: HTMLButtonElement;
  _paymentCash: HTMLButtonElement;
  address: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  ...
  }
}
```

- Форма заказа.
- Свойства:
  - `_paymentCard`: Кнопка оплаты картой.
  - `_paymentCash`: Кнопка оплаты наличными.
  - `address`: Адрес доставки.
- Методы:
  - `OrderForm()`: Конструктор.
  - `setPaymentValue()`: Установка значения оплаты.
  - `address()`: Установка адреса.

9. **Success**

```typescript
class Success extends AbstractView<HTMLDivElement> {
  close: HTMLButtonElement;
  total: HTMLElement;

  constructor(container: HTMLDivElement, events: IEvents) {
    super(container, events);
  ...
  }
}
```

- Представление успешного завершения операции.
- Свойства:
  - `close`: Кнопка закрытия.
  - `total`: Общая сумма.
- Методы:
  - `Success()`: Конструктор.
  - `total()`: Расчет общей суммы.

10. **Modal**

```typescript
class Modal extends AbstractView<HTMLDivElement> {
  closeButton: HTMLButtonElement;
  content: HTMLElement;

  constructor(container: HTMLDivElement, events: IEvents) {
    super(container, events);
  ...
  }
}
```

- Модальное окно.
- Свойства:
  - `closeButton`: Кнопка закрытия.
  - `content`: Содержимое модального окна.
- Методы:
  - `open()`: Открытие модального окна.
  - `close()`: Закрытие модального окна.
  - `render()`: Отображение данных.

11. **ContactsForm**

```typescript
class ContactsForm extends Form {
  name: HTMLInputElement;

  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);
  ...
  }
}
```

- Форма контактов.
- Свойства:
  - `submit`: Кнопка отправки.
  - `name`: Поле ввода имени.
- Методы:
  - `ContactsForm()`: Конструктор.

### Интерфейсы

1. **Http**

```typescript
interface Http {
  baseUrl: string;
  options: RequestInit;

  constructor(baseUrl: string, options: RequestInit = {})

{
  this.baseUrl = baseUrl;
  this.options = options;
}
}
```

- Интерфейс для взаимодействия с API.
- Методы:
  - `get()`: Выполнение GET-запроса.
  - `post()`: Выполнение POST-запроса.
  - `response()`: Обработка ответа от сервера.

2. **Events** (Интерфейс)
  - Интерфейс для работы с событиями.
  - Методы:
    - `on()`: Подписка на событие.
    - `emit()`: Испускание события.
    - `trigger()`: Вызов события.

3. **WebApi** (Интерфейс)
  - Интерфейс для взаимодействия с WebLarek API.
  - Методы:
    - `getProductList()`: Получение списка продуктов.
    - `getProductFromId()`: Получение продукта по ID.
    - `createOrder()`: Создание заказа.

### События приложения

#### События изменения данных (генерируются из модели данных)

- items:change - изменение массива продуктов
- preview:change - изменение продукта, который открыт в модальном окне
- basket:change - изменение изменение списка корзины
- formErrors:change - изменение в списке ошибок валидации формы

#### События интерфейса (генерируются из классов представления)

- modal:open - открытие модального окна
- modal:close - закрытие модального окна
- basket:open - открытие модального окна корзины
- card:select - выбор карточки
- order:open - открытие окна оформления заказа
- форма:submit - отправка формы с кастомным названием
- форма.поле:change - изменение поля с кастомным названием в форме с кастомным названием

### Взаимодействие классов

- **EventImpl** используется для управления событиями в различных компонентах.
- **Http** взаимодействует с **WebLarekAPI** для выполнения запросов к серверу.
- **AppData** управляет состоянием приложения и взаимодействует с различными представлениями, такими как **Page**, *
  *Basket**, и **Card**.
- **Forms** используются для обработки пользовательских данных и управления формами, такими как **OrderForm** и *
  *ContactsForm**.