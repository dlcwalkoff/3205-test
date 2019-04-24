# Тестовое задание для 3205.today

## Особые требования

Технологии:
    - HTML + JavaScript + CSS
    - jQuery

Поддержка браузеров:
- IE 11+;
- последние версии Google Chrome, Mozilla Firefox, Opera, Yandex Browser;
- последние версии мобильного Google Chrome и Safari.

## Таймтрекинг

- старт работ: 09:30 Мск
- закончен (минимальный) статичный макет: 12:40

- старт работ: 14:00 Мск
- частично закончен JS функционал 16:30

- старт работ: 21:00
- закончен JS функционал, рефакторинг, дебаг: 22:30

В общей сложности 8:10 грязными (с отвлечением, перерывами, вопросами по работе и тд).

## Ход работ

1) Примерная структура приложения после чтения ТЗ (разбиение чисто логическое)
    - root
        - VideoIDsInput
            - input#text для ввода списка VIDEO_ID
            - button - запускает валидацию списка -> загрузку видео + очистку input#text
        - VideoGrid - непосредственно таблица с видео
            - VideoCell - просто обертка
                - VideoPreview - картинка-превью и название видео
                - VideoPlayer - плеер с автозапуском воспроизведения

2) Реализация статической вёрстки HTML/CSS
    - проверка доступности [flexbox](https://caniuse.com/#feat=flexbox) - можно писать grid без мозолей
    - много вопросов по 16:9 и адекватному поведению изображений, так как ранее такого опыта не имел
    - попытка использовать grid (ушло много времени), но flexbox всё же оказался более подходящим для потока контента
    
3) Реализация базового JS функционала
    - валидация списка ID
    - обработка списка ID
        - разбиваем и сохраняем отдельные ID
        - создаёи и сохраняем запросы для превью и видео
        - получаем заголовки видео
    - генерация и вставка компонентов вёрстки на основе списка видео (вспоминаем, как работа XMLRequest и ко)
    - запуск/остановка видео с учетом уже запущенного

## Проблемы

- отсутсвие активного опыта каждодневного использования нативного Web API (съело много времени)
- отсутствие большого опыта вёрстки, связанно с изображениями (съело много времени)
- осталась проблема с производительностью (iframe'ы прожорливые, способ ленивой их подгрузки явно есть, но в одинадцатом часу в гробу я его видел)
- отсутсвие тестов (классы достаточно легко допилить до тестируемого состояния тем же Jest'ом; e2e можно реализовать Cypress)
- некоторые UX трудности (на данный момент явно нехватает прелоадеров)
