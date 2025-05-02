document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startDisplay');
    const bannerCheckboxes = document.querySelectorAll('input[name="banners"]');
    const overlayOpacityInput = document.getElementById('overlayOpacity');
    const rotationAngleInput = document.getElementById('rotationAngle');
    const fontSizeMultiplierInput = document.getElementById('fontSizeMultiplier');
    const fullscreenModeInput = document.getElementById('fullscreenMode');
    const bannerTimings = document.querySelectorAll('.banner-time');
    const pricePresetSelect = document.getElementById('pricePreset');
    const screenPriceInput = document.getElementById('screenPrice');
    const backPriceInput = document.getElementById('backPrice');
    const armor360PriceInput = document.getElementById('armor360Price');
    const ultimatePriceInput = document.getElementById('ultimatePrice');
    const cleaningPriceInput = document.getElementById('cleaningPrice');
    const hideUltimateInput = document.getElementById('hideUltimate');

    // Пресеты цен
    const pricePresets = {
        nn: {
            screen: 1800,
            back: 2500,
            armor360: 3500,
            ultimate: 4500,
            cleaning: 0
        },
        msk: {
            screen: 2100,
            back: 2500,
            armor360: 3800,
            ultimate: 4990,
            cleaning: 0
        }
    };

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

        // Загрузка настроек цен
        screenPriceInput.value = localStorage.getItem('screenPrice') || 1800;
        backPriceInput.value = localStorage.getItem('backPrice') || 2500;
        armor360PriceInput.value = localStorage.getItem('armor360Price') || 3500;
        ultimatePriceInput.value = localStorage.getItem('ultimatePrice') || 4500;
        cleaningPriceInput.value = localStorage.getItem('cleaningPrice') || 0;
        hideUltimateInput.checked = localStorage.getItem('hideUltimate') === 'true';
        pricePresetSelect.value = localStorage.getItem('pricePreset') || 'custom';
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

        // Сохранение настроек цен
        localStorage.setItem('screenPrice', screenPriceInput.value);
        localStorage.setItem('backPrice', backPriceInput.value);
        localStorage.setItem('armor360Price', armor360PriceInput.value);
        localStorage.setItem('ultimatePrice', ultimatePriceInput.value);
        localStorage.setItem('cleaningPrice', cleaningPriceInput.value);
        localStorage.setItem('hideUltimate', hideUltimateInput.checked);
        localStorage.setItem('pricePreset', pricePresetSelect.value);

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

    // Обработчик изменения пресета цен
    pricePresetSelect.addEventListener('change', function() {
        const preset = this.value;
        if (preset !== 'custom' && pricePresets[preset]) {
            screenPriceInput.value = pricePresets[preset].screen;
            backPriceInput.value = pricePresets[preset].back;
            armor360PriceInput.value = pricePresets[preset].armor360;
            ultimatePriceInput.value = pricePresets[preset].ultimate;
            cleaningPriceInput.value = pricePresets[preset].cleaning;
            saveSettings();
        }
    });

    // Обработчики изменений для цен
    [screenPriceInput, backPriceInput, armor360PriceInput, ultimatePriceInput, cleaningPriceInput].forEach(input => {
        input.addEventListener('change', function() {
            pricePresetSelect.value = 'custom';
            saveSettings();
        });
    });

    hideUltimateInput.addEventListener('change', saveSettings);

    // Запуск показа
    startButton.addEventListener('click', function() {
        if (saveSettings()) {
            window.location.href = 'banners.html';
        }
    });
}); 