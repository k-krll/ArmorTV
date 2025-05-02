# ArmorTV

Система отображения рекламных баннеров для ARMOR Protection

## Описание

Веб-приложение для отображения рекламных баннеров защитных покрытий ARMOR на телевизорах и мониторах. Система поддерживает автоматическую ротацию баннеров с видеофоном и анимированным контентом.

## Функциональность

- Автоматическая ротация баннеров с настраиваемым временем показа
- Поддержка видеофона с плавными переходами
- Анимация текста и цен
- Настройка прозрачности фона видео
- Регулировка размера шрифта
- Поворот экрана (0°, 90°, 180°, 270°)
- Полноэкранный режим
- Предзагрузка видео с индикатором прогресса

## Баннеры

- Защита экрана
- Защита боковых граней
- Защита задней крышки
- Прайс-лист с услугами и комплексными решениями

## Технологии

- HTML5
- CSS3 (анимации, трансформации)
- JavaScript (ES6+)
- Node.js + Express (сервер)

## Установка и запуск

1. Установите Node.js
2. Клонируйте репозиторий
3. Установите зависимости: `npm install`
4. Запустите сервер: `npm start`
5. Откройте в браузере: `http://localhost:3000`

## Управление

- Настройка баннеров и параметров отображения через панель управления
- Выход из полноэкранного режима: кнопка ✕ или клавиша Escape
- Поворот экрана: кнопки ↺ и ↻

## Docker Installation

### Quick Start
```bash
# Запуск с портом по умолчанию (3000)
docker run -d -p 3000:3000 --restart unless-stopped --name armortv krll/armortv

# Запуск с указанием порта
docker run -d -p 80:80 -e PORT=80 --restart unless-stopped --name armortv krll/armortv
```

### Using Docker Compose
```bash
# Запуск с портом по умолчанию
docker-compose up -d

# Запуск с указанием порта
PORT=8080 docker-compose up -d
```

### Building from Source
```bash
# Клонирование репозитория
git clone https://github.com/your-username/armortv.git
cd armortv

# Сборка Docker образа
docker build -t your-dockerhub-username/armortv .

# Запуск контейнера
docker run -d -p 3000:3000 --name armortv your-dockerhub-username/armortv
```

### Publishing to Docker Hub
```bash
# Логин в Docker Hub
docker login

# Сборка образа
docker build -t your-dockerhub-username/armortv .

# Публикация образа
docker push your-dockerhub-username/armortv
```

## Доступ к приложению
После запуска приложение будет доступно по адресу:
- `http://localhost:3000` (при использовании порта по умолчанию)
- `http://localhost:PORT` (при указании другого порта)

## Переменные окружения
- `PORT` - порт для HTTP сервера (по умолчанию: 3000)

## Volumes
- `/app/backups_videos` - директория для хранения резервных копий видео 