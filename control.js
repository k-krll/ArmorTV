document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById('startDisplay');
    const defaultTimeInput = document.getElementById('defaultTime');
    const overlayOpacityInput = document.getElementById('overlayOpacity');
    const rotationAngleInput = document.getElementById('rotationAngle');
    const fontSizeMultiplierInput = document.getElementById('fontSizeMultiplier');
    const bannerCheckboxes = document.querySelectorAll('input[name="banners"]');

    startButton.addEventListener('click', function() {
        // Get selected banners
        const selectedBanners = Array.from(bannerCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        if (selectedBanners.length === 0) {
            alert('Выберите хотя бы один баннер для показа');
            return;
        }

        // Get timing, opacity, rotation and font size settings
        const defaultTime = parseInt(defaultTimeInput.value) || 5;
        const overlayOpacity = parseInt(overlayOpacityInput.value) || 50;
        const rotationAngle = parseInt(rotationAngleInput.value) || 90;
        const fontSizeMultiplier = parseInt(fontSizeMultiplierInput.value) || 100;

        // Store settings in localStorage
        localStorage.setItem('selectedBanners', JSON.stringify(selectedBanners));
        localStorage.setItem('defaultTime', defaultTime.toString());
        localStorage.setItem('overlayOpacity', overlayOpacity.toString());
        localStorage.setItem('rotationAngle', rotationAngle.toString());
        localStorage.setItem('fontSizeMultiplier', fontSizeMultiplier.toString());

        // Open display page in fullscreen
        window.location.href = 'banners.html';
    });
}); 