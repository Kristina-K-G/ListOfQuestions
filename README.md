# База вопросов (List of Questions)

Фронтенд-приложение со списком вопросов для подготовки к собеседованиям: фильтры, поиск, пагинация и страница отдельного вопроса.

Демо: https://list-of-questions-chi.vercel.app/

Репозиторий: https://github.com/Kristina-K-G/ListOfQuestions

## Стек

- React + TypeScript + Vite
- Redux Toolkit / RTK Query
- React Router
- Feature-Sliced Design (FSD)
- API: https://api.yeatwork.ru

## Возможности

- Список вопросов с пагинацией
- Фильтры: специализация, навыки, сложность, рейтинг
- Поиск по названию
- Страница вопроса с навигацией «предыдущий / следующий»
- Сохранение фильтров в URL

## CORS и прокси

Браузер блокирует прямые запросы с домена Vercel (и иногда в других окружениях) к `https://api.yeatwork.ru` из‑за CORS.

Чтобы это обойти, настроены прокси:

- **локально** — proxy в `vite.config.ts` (запросы на `/api` уходят на API)
- **на Vercel** — rewrite в `vercel.json` (то же самое на продакшене)

В коде `baseUrl` указывает на `/api`, а не напрямую на `api.yeatwork.ru`. Браузер видит запрос «на свой же сайт», CORS не ругается.

## Запуск локально

Нужны Node.js и npm.

```bash
npm install
npm run dev
```

Приложение откроется на http://localhost:3000

### Другие команды

```bash
npm run build    # сборка в папку dist
npm run preview  # просмотр собранной версии
npm run lint     # проверка ESLint
```

## Структура `src`

- `app` — провайдеры, роутер, store
- `pages` — страницы (список вопросов, вопрос)
- `widgets` — хедер, сайдбар, список, карточка гуру
- `features` — фильтры
- `entities` — вопрос, навык, специализация
- `shared` — API, конфиг, утилиты, общие типы

## Деплой

Проект задеплоен на Vercel. После пуша в GitHub Vercel автоматически пересобирает сайт.
