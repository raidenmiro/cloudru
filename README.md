# Тестовое задание для поступления в FrontCloudCamp ⚡️

Требуется разработать форму отправки данных по готовому [макету](https://www.figma.com/file/rzIp6awR6dGFVrcxcCEwzD/Untitled?type=design&node-id=0-1&t=90NCIZwzg7SIsdMb-0).

## Оглавление

* [Требования](https://github.com/FrontCloudCamp/test-assignment)
* [Технологии](#технологии)
* [Запуск локально](#запуск)
* [Запуск тестов](#тестирование)
* [Дополнения](#дополнения)

## Технологии

* React, TypeScript
* react-hook-form, yup
* Postcss, radix-ui/select, eslint-kit, stylelint, lefthook
* @neodx/svg для генерации спрайта
* firebase hosting

## Запуск

### Запуск без docker

Для лучшего DX, советую использовать локально [asdf](https://asdf-vm.com) и `pnpm`.
Он автоматически подтянет нужные версии nodejs и pnpm с файла `.tool-versions`.

Для запуска данного демонстрационного приложения, установите зависимости.
С помощью ниже приведенной команды:

```sh
pnpm install
```

После установки запустите приложение в development режиме, командой:

```sh
pnpm dev
```

Дальше перейдите по данному url <http://localhost:5173>, чтобы посмотреть результаты.

### Запуск с docker

Для этого варианта установки, необходим docker. Придерживайтесь ниже перечисленных команд.

```sh
docker-compose up -d
```

* Подождите м посмотрите результат команды

```sh
docker ps
```

Результат должен выглядеть так:

```bash
$ docker ps

CONTAINER ID   IMAGE              COMMAND                   CREATED              STATUS              PORTS                               NAMES
7e34d10fef75   cloudru_frontend   "nginx -g 'daemon of…"    About a minute ago   Up About a minute   0.0.0.0:80->80/tcp, :::80->80/tcp   frontend
```

Перейдем по адресу <http://localhost>  и увидим запущенное приложение.

Чтобы остановить запущенный контейнер выполните команду:

```sh
docker-compose down
```

## Тестирование

Для тестирования используется `@testing-library/react`, `vitest`, `jest-dom`.

Чтобы запустить тесты:

```sh
pnpm test
```

## Дополнения

1. Статья про [oklch](https://web-standards.ru/articles/oklch-in-css-why-quit-rgb-hsl/)
2. Структура - <https://feature-sliced.design>
