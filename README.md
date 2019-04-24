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
