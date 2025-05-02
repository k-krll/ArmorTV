document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startDisplay');
    const bannerCheckboxes = document.querySelectorAll('input[name="banners"]');
    const overlayOpacityInput = document.getElementById('overlayOpacity');
    const rotationAngleInput = document.getElementById('rotationAngle');
    const fontSizeMultiplierInput = document.getElementById('fontSizeMultiplier');
    const fullscreenModeInput = document.getElementById('fullscreenMode');
    const bannerTimings = document.querySelectorAll('.banner-time');

    // Загрузка сохраненных настроек
    function loadSavedSettings() {
        // Загрузка выбранных баннеров
        const selectedBanners = JSON.parse(localStorage.getItem('selectedBanners')) || ['screen', 'back', 'poly', 'testdrive'];
        bannerCheckboxes.forEach(checkbox => {
            checkbox.checked = selectedBanners.includes(checkbox.value);
        });

        // Загрузка времени показа для каждого баннера
        bannerTimings.forEach(input => {
            const banner = input.dataset.banner;
            const savedTime = localStorage.getItem(`${banner}Time`);
            if (savedTime) {
                input.value = savedTime;
            }
        });

        // Загрузка остальных настроек
        overlayOpacityInput.value = localStorage.getItem('overlayOpacity') || 50;
        rotationAngleInput.value = localStorage.getItem('rotationAngle') || 270;
        fontSizeMultiplierInput.value = localStorage.getItem('fontSizeMultiplier') || 80;
        fullscreenModeInput.checked = localStorage.getItem('fullscreenMode') === 'true';
    }

    // Сохранение настроек
    function saveSettings() {
        // Проверка на выбранные баннеры
        const selectedBanners = Array.from(bannerCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
            
        if (selectedBanners.length === 0) {
            alert('Выберите хотя бы один баннер для показа');
            return false;
        }

        // Сохранение выбранных баннеров
        localStorage.setItem('selectedBanners', JSON.stringify(selectedBanners));

        // Сохранение времени показа для каждого баннера
        bannerTimings.forEach(input => {
            const banner = input.dataset.banner;
            localStorage.setItem(`${banner}Time`, input.value);
        });

        // Сохранение остальных настроек
        localStorage.setItem('overlayOpacity', overlayOpacityInput.value);
        localStorage.setItem('rotationAngle', rotationAngleInput.value);
        localStorage.setItem('fontSizeMultiplier', fontSizeMultiplierInput.value);
        localStorage.setItem('fullscreenMode', fullscreenModeInput.checked);

        return true;
    }

    // Загрузка сохраненных настроек при инициализации
    loadSavedSettings();

    // Обработчики изменений
    bannerCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', saveSettings);
    });

    bannerTimings.forEach(input => {
        input.addEventListener('change', saveSettings);
    });

    overlayOpacityInput.addEventListener('change', saveSettings);
    rotationAngleInput.addEventListener('change', saveSettings);
    fontSizeMultiplierInput.addEventListener('change', saveSettings);
    fullscreenModeInput.addEventListener('change', saveSettings);

    // Запуск показа
    startButton.addEventListener('click', function() {
        if (saveSettings()) {
            window.location.href = 'banners.html';
        }
    });
}); 