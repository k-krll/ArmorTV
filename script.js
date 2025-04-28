document.addEventListener('DOMContentLoaded', function() {
    const banners = document.querySelectorAll('.banner');
    const bannerContainer = document.querySelector('.banner-container');
    const rotateLeftBtn = document.getElementById('rotateLeft');
    const rotateRightBtn = document.getElementById('rotateRight');
    const bordersVideo = document.getElementById('bordersVideo');
    let currentBanner = 0;
    let currentRotation = 90; // Starting at 90 degrees
    const rotationTime = 5000; // 5 seconds per banner

    // Show first banner initially
    banners[0].classList.add('active');

    // Video control
    function handleBannerChange(newBanner) {
        if (newBanner === 1) { // Borders banner
            bordersVideo.play();
        } else {
            bordersVideo.pause();
        }
    }

    // Rotation controls
    function updateRotation() {
        bannerContainer.classList.remove('rotate-0', 'rotate-90', 'rotate-180', 'rotate-270');
        bannerContainer.classList.add(`rotate-${currentRotation}`);
    }

    rotateLeftBtn.addEventListener('click', () => {
        currentRotation = (currentRotation - 90 + 360) % 360;
        updateRotation();
    });

    rotateRightBtn.addEventListener('click', () => {
        currentRotation = (currentRotation + 90) % 360;
        updateRotation();
    });

    // Rotate banners
    setInterval(() => {
        banners[currentBanner].classList.remove('active');
        currentBanner = (currentBanner + 1) % banners.length;
        banners[currentBanner].classList.add('active');
        handleBannerChange(currentBanner);
    }, rotationTime);

    // Initial video state
    handleBannerChange(currentBanner);

    // Prevent screen sleep
    function keepAwake() {
        if (navigator.wakeLock) {
            navigator.wakeLock.request('screen')
                .catch(err => console.log(`${err.name}, ${err.message}`));
        }
    }
    
    keepAwake();
    // Reapply wake lock if page visibility changes
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            keepAwake();
            handleBannerChange(currentBanner);
        }
    });
}); 