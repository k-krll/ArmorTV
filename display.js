document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const banners = document.querySelectorAll('.banner');
    const bannerContainer = document.querySelector('.banner-container');
    const rotateLeftBtn = document.getElementById('rotateLeft');
    const rotateRightBtn = document.getElementById('rotateRight');
    const exitFullscreenBtn = document.getElementById('exitFullscreen');
    const videoOverlay = document.querySelector('.video-overlay');
    const serviceGrid = document.getElementById('serviceGrid');

    // Map banner IDs to their indices
    const bannerMap = {
        'combo': 'banner1',
        'screen': 'bannerScreen',
        'borders': 'banner2',
        'back': 'bannerBack',
        'poly': 'bannerPoly',
        'tech': 'bannerTech',
        'testdrive': 'banner3'
    };

    let activeBanners;
    let videoDuration = 0;

    // Функция для предзагрузки одного видео
    function preloadSingleVideo(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';

            xhr.onload = function() {
                if (xhr.status === 200) {
                    const videoBlob = xhr.response;
                    const videoUrl = URL.createObjectURL(videoBlob);
                    resolve(videoUrl);
                } else {
                    reject(new Error('Failed to load video'));
                }
            };

            xhr.onerror = function() {
                reject(new Error('Network error'));
            };

            xhr.onprogress = function(event) {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100 / 3;
                    const totalProgress = percentComplete + (33.33 * loadedVideos);
                    progressBar.style.width = totalProgress + '%';
                    progressText.textContent = Math.round(totalProgress) + '%';
                }
            };

            xhr.send();
        });
    }

    // Функция для предзагрузки всех видео
    let loadedVideos = 0;
    async function preloadVideo() {
        try {
            const videos = {
                borders: document.getElementById('bordersVideo'),
                screen: document.getElementById('screenVideo'),
                back: document.getElementById('backVideo')
            };

            // Загружаем borders.mp4
            const bordersUrl = await preloadSingleVideo('borders.mp4');
            if (videos.borders) {
                videos.borders.addEventListener('loadedmetadata', () => {
                    videoDuration = videos.borders.duration * 1000;
                });
                const source = document.createElement('source');
                source.src = bordersUrl;
                source.type = 'video/mp4';
                videos.borders.innerHTML = '';
                videos.borders.appendChild(source);
                videos.borders.load();
            }
            loadedVideos++;

            // Загружаем front.mp4
            const frontUrl = await preloadSingleVideo('front.mp4');
            if (videos.screen) {
                const source = document.createElement('source');
                source.src = frontUrl;
                source.type = 'video/mp4';
                videos.screen.innerHTML = '';
                videos.screen.appendChild(source);
                videos.screen.load();
            }
            loadedVideos++;

            // Загружаем back_and_borders.mp4
            const backUrl = await preloadSingleVideo('back_and_borders.mp4');
            if (videos.back) {
                const source = document.createElement('source');
                source.src = backUrl;
                source.type = 'video/mp4';
                videos.back.innerHTML = '';
                videos.back.appendChild(source);
                videos.back.load();
            }
            loadedVideos++;

            return Promise.resolve();
        } catch (error) {
            console.error('Error loading videos:', error);
            return Promise.reject(error);
        }
    }

    // Анимация списка устройств
    function animateDevices() {
        const deviceElements = document.querySelectorAll('.device');
        deviceElements.forEach(deviceEl => {
            const devices = ['iPhone', 'Samsung', 'Xiaomi', 'Huawei'];
            deviceEl.textContent = '';
            
            devices.forEach((device, index) => {
                const span = document.createElement('span');
                span.textContent = device;
                if (index < devices.length - 1) {
                    span.textContent += ', ';
                }
                span.style.animationDelay = `${index * 1}s`;
                deviceEl.appendChild(span);
            });
        });
    }

    // Rotation controls
    function updateRotation(currentRotation) {
        bannerContainer.classList.remove('rotate-0', 'rotate-90', 'rotate-180', 'rotate-270');
        bannerContainer.classList.add(`rotate-${currentRotation}`);
    }

    function animatePrice(priceElement) {
        const text = priceElement.textContent;
        priceElement.textContent = '';
        priceElement.classList.add('active');
        
        // Создаем спаны для каждого символа
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.animationDelay = `${index * 0.1}s`; // 100ms задержка между символами
            priceElement.appendChild(span);
        });
    }

    // Анимация подсветки услуг
    function animateServices() {
        const services = document.querySelectorAll('.service-item .service-overlay');
        const packages = document.querySelectorAll('.package-item .package-overlay');
        let currentIndex = 0;

        // Сначала анимируем базовые услуги
        function highlightService() {
            // Сбрасываем все подсветки
            services.forEach(overlay => overlay.style.opacity = '0.2');
            
            if (currentIndex < services.length) {
                // Подсвечиваем текущую услугу
                services[currentIndex].style.opacity = '0.8';
                currentIndex++;
                setTimeout(highlightService, 4000); // 4 секунды на каждую услугу
            } else {
                // После базовых услуг анимируем комплексные решения
                packages.forEach(overlay => {
                    overlay.style.opacity = '0.8';
                });
            }
        }

        // Запускаем анимацию
        highlightService();
    }

    // Handle banner change
    function handleBannerChange(currentBanner, nextBanner) {
        if (currentBanner) {
            currentBanner.style.opacity = '0';
            setTimeout(() => {
                currentBanner.style.display = 'none';
                
                // Полностью останавливаем видео в текущем баннере
                const videos = currentBanner.getElementsByTagName('video');
                Array.from(videos).forEach(video => {
                    video.pause();
                    video.currentTime = 0;
                    // Удаляем все обработчики событий
                    video.replaceWith(video.cloneNode(true));
                });
            }, 500);
        }

        if (nextBanner) {
            setTimeout(() => {
                nextBanner.style.display = 'flex';
                setTimeout(() => {
                    nextBanner.style.opacity = '1';
                    
                    // Animate devices
                    animateDevices();
                    
                    // Запускаем видео в следующем баннере
                    const videos = nextBanner.getElementsByTagName('video');
                    Array.from(videos).forEach(video => {
                        // Полностью сбрасываем видео
                        video.pause();
                        video.currentTime = 0;
                        video.loop = true;
                        video.muted = true;
                        
                        // Создаем новый источник для видео
                        const currentSrc = video.querySelector('source').src;
                        const source = document.createElement('source');
                        source.src = currentSrc;
                        source.type = 'video/mp4';
                        
                        // Очищаем и пересоздаем видео
                        video.innerHTML = '';
                        video.appendChild(source);
                        
                        // Загружаем и воспроизводим
                        video.load();
                        const playPromise = video.play();
                        
                        if (playPromise !== undefined) {
                            playPromise.catch(error => {
                                console.log("Video play error:", error);
                                // Повторная попытка через небольшую задержку
                                setTimeout(() => {
                                    video.play().catch(err => console.log("Retry error:", err));
                                }, 100);
                            });
                        }
                    });

                    // Анимация цены после появления всех брендов
                    const priceElement = nextBanner.querySelector('.animate-price');
                    if (priceElement) {
                        setTimeout(() => {
                            animatePrice(priceElement);
                        }, 3500);
                    }
                }, 50);
            }, 500);
        }
    }

    // Основной функционал отображения баннеров
    function startBannerDisplay() {
        let currentBanner = 0;
        const currentRotation = parseInt(localStorage.getItem('rotationAngle')) || 90;
        const selectedBanners = JSON.parse(localStorage.getItem('selectedBanners')) || ['screen', 'back', 'poly', 'testdrive'];
        const fontSizeMultiplier = (parseInt(localStorage.getItem('fontSizeMultiplier')) || 125) / 100;
        
        // Apply font size multiplier
        document.documentElement.style.setProperty('--font-multiplier', fontSizeMultiplier);
        
        // Apply overlay opacity
        const overlayOpacity = parseInt(localStorage.getItem('overlayOpacity')) || 50;
        const videoOverlays = document.querySelectorAll('.video-overlay');
        videoOverlays.forEach(overlay => {
            overlay.style.background = `rgba(0, 0, 0, ${overlayOpacity / 100})`;
        });

        // Hide unselected banners
        Array.from(banners).forEach((banner) => {
            const bannerId = banner.id;
            const isSelected = selectedBanners.some(key => bannerMap[key] === bannerId);
            if (!isSelected) {
                banner.remove();
            }
        });

        // Get actual banners after removal
        activeBanners = document.querySelectorAll('.banner');

        // Initial rotation
        updateRotation(currentRotation);

        // Show first banner and start animations
        if (activeBanners.length > 0) {
            handleBannerChange(null, activeBanners[0]);
            // Запускаем анимацию услуг только когда показывается прайс-лист
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.target.id === 'banner3' && mutation.target.style.opacity === '1') {
                        animateServices();
                    }
                });
            });

            const priceList = document.getElementById('banner3');
            if (priceList) {
                observer.observe(priceList, { attributes: true, attributeFilter: ['style'] });
            }
        }

        // Функция для получения времени показа баннера
        function getBannerTime(banner) {
            // Получаем ключ баннера из bannerMap
            const bannerKey = Object.keys(bannerMap).find(key => bannerMap[key] === banner.id);
            if (!bannerKey) return 25000; // Значение по умолчанию, если ключ не найден

            // Получаем сохраненное время для этого баннера
            const savedTime = localStorage.getItem(`${bannerKey}Time`);
            return savedTime ? parseInt(savedTime) * 1000 : 25000;
        }

        // Rotate banners
        function rotateBanners() {
            const currentBannerElement = activeBanners[currentBanner];
            currentBanner = (currentBanner + 1) % activeBanners.length;
            const nextBannerElement = activeBanners[currentBanner];
            
            handleBannerChange(currentBannerElement, nextBannerElement);

            // Get timing for next banner
            const nextTimeout = getBannerTime(nextBannerElement);
            setTimeout(rotateBanners, nextTimeout);
        }

        // Start rotation after initial banner time
        if (activeBanners.length > 1) {
            const initialTimeout = getBannerTime(activeBanners[0]);
            setTimeout(rotateBanners, initialTimeout);
        }

        // Request fullscreen if enabled
        const fullscreenMode = localStorage.getItem('fullscreenMode') === 'true';
        if (fullscreenMode) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        }
    }

    // Инициализация приложения после загрузки видео
    async function initializeApp() {
        try {
            await preloadVideo();
            
            // Скрываем прелоадер
            setTimeout(() => {
                preloader.classList.add('hidden');
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);

            // Запускаем основной функционал
            startBannerDisplay();
        } catch (error) {
            console.error('Error loading video:', error);
            progressText.textContent = 'Ошибка загрузки';
        }
    }

    // Event listeners for rotation buttons
    rotateLeftBtn.addEventListener('click', () => {
        const currentRotation = parseInt(localStorage.getItem('rotationAngle')) || 90;
        const newRotation = (currentRotation - 90 + 360) % 360;
        localStorage.setItem('rotationAngle', newRotation.toString());
        updateRotation(newRotation);
    });

    rotateRightBtn.addEventListener('click', () => {
        const currentRotation = parseInt(localStorage.getItem('rotationAngle')) || 90;
        const newRotation = (currentRotation + 90) % 360;
        localStorage.setItem('rotationAngle', newRotation.toString());
        updateRotation(newRotation);
    });

    exitFullscreenBtn.addEventListener('click', () => {
        if (document.fullscreenElement) {
            document.exitFullscreen().then(() => {
                window.location.href = 'index.html';
            }).catch(err => {
                console.log(`Error exiting fullscreen: ${err.message}`);
                window.location.href = 'index.html';
            });
        } else {
            window.location.href = 'index.html';
        }
    });

    // Prevent screen sleep
    function keepAwake() {
        if (navigator.wakeLock) {
            navigator.wakeLock.request('screen')
                .catch(err => console.log(`${err.name}, ${err.message}`));
        }
    }
    
    keepAwake();
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            keepAwake();
        }
    });

    // Добавляем обработчик клавиши Escape для выхода
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });

    // Запускаем инициализацию
    initializeApp();
}); 