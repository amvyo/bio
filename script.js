document.addEventListener('DOMContentLoaded', () => {
    const enterScreen = document.getElementById('enter-screen');
    const mainContent = document.getElementById('main-content');
    const bgAudio = document.getElementById('bg-audio');
    const volumeBtn = document.getElementById('volume-ctrl');
    const volumeIcon = volumeBtn.querySelector('i');
    const progressBar = document.querySelector('.progress-bar::after');
    const progressContainer = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time');
    const progressFill = document.createElement('div');
    progressFill.style.height = '100%';
    progressFill.style.backgroundColor = '#fff';
    progressFill.style.width = '0%';
    progressFill.style.borderRadius = '2px';
    progressContainer.innerHTML = '';
    progressContainer.appendChild(progressFill);

    let isPlaying = false;
    const lyricsData = [
        { time: 0.14, text: "Aye" },
        { time: 11.10, text: "Born to die, world's a fuck" },
        { time: 17.28, text: "100 million dead cops" },
        { time: 21.18, text: "Fuck the law, kill them all" },
        { time: 24.80, text: "Homie, we don't give no fucks" },
        { time: 28.52, text: "Born to die, world's a fuck" },
        { time: 30.85, text: "100 million dead cops" },
        { time: 35.94, text: "Fuck the world, kill them all" },
        { time: 39.66, text: "We don't never fuck with opps" },
        { time: 43.36, text: "1989" },
        { time: 47.12, text: "Haunted Mound, they'll see us in the night" },
        { time: 50.80, text: "Graveyard lullaby" },
        { time: 54.50, text: "Trash manga in the comics, skin your hide" },
        { time: 58.34, text: "Redrum valentine" },
        { time: 61.06, text: "Crimson dripping down, pouring wine" },
        { time: 64.80, text: "Sworn storm, cupid wings in the sky" },
        { time: 68.46, text: "Ludacousе with the match blowing fire" },
        { time: 71.76, text: "Paul Deen, stick with my fireflies" },
        { time: 75.98, text: "Pull up in thе Death Wagon" },
        { time: 78.76, text: "Kill 'em all, this the ballad of the dead" },
        { time: 82.50, text: "Cemetery rocking with Ghost Mountain" },
        { time: 86.32, text: "Fire walk with me, brothers till the end" },
        { time: 90.80, text: "When you see me in the night, better make your way back down" },
        { time: 98.22, text: "100 million graves on top Ghost Mountain" },
        { time: 102.92, text: "Born to die, world's a fuck" },
        { time: 105.42, text: "100 million dead cops" },
        { time: 110.56, text: "Fuck the law, kill them all" },
        { time: 114.10, text: "Homie, we don't give no fucks" },
        { time: 117.84, text: "Born to die, world's a fuck" },
        { time: 121.48, text: "100 million dead cops" },
        { time: 125.26, text: "Fuck the world, kill them all" },
        { time: 128.96, text: "We don't never fuck with opps" },
        { time: 132.70, text: "Ahh" },
        { time: 141.42, text: "Fuck the world" },
        { time: 144.06, text: "Never fuck with us" },
        { time: 168.59, text: "100 million dead cops" },
        { time: 169.47, text: "100 million dead cops" },
        { time: 178.69, text: "Aye" },
        { time: 178.70, text: "Ha" }
    ];

    const lyricsScroll = document.getElementById('lyrics-scroll');
    if (lyricsScroll) {
        lyricsData.forEach((lyric, index) => {
            const tempDiv = document.createElement('div');
            tempDiv.className = 'lyric-line';
            tempDiv.id = `lyric-${index}`;
            tempDiv.textContent = lyric.text;
            lyricsScroll.appendChild(tempDiv);
        });
    }
    let currentLyricIndex = -1;
    enterScreen.addEventListener('click', () => {
        const clickText = enterScreen.querySelector('.click-text');
        clickText.textContent = "";
        clickText.style.animation = 'none';
        clickText.style.opacity = '1';

        const introText = "We don't never fuck with opps";
        let introIdx = 0;
        const introLoop = () => {
            if (introIdx < introText.length) {
                clickText.textContent += introText.charAt(introIdx);
                introIdx++;
                setTimeout(introLoop, 35);
            }
        };
        introLoop();
        bgAudio.currentTime = 39.66;
        bgAudio.volume = 0.5;
        bgAudio.play().then(() => {
            isPlaying = true;
        }).catch(err => {
            console.log("Audio play failed:", err);
        });
        setTimeout(() => {
            enterScreen.classList.add('fade-out');
            mainContent.classList.remove('hidden');
            const typeTexts = [
                "i love larping",
                'you suck',
                'hxrrvr on insta',
                "ig bro",
                "blur blur"
            ];
            const typeEl = document.getElementById('typewriter-text');
            if (typeEl) {
                let textIdx = 0;
                let charIdx = 0;
                let isDeleting = false;

                const typeLoop = () => {
                    const currentText = typeTexts[textIdx];

                    if (isDeleting) {
                        typeEl.textContent = currentText.substring(0, charIdx - 1);
                        charIdx--;
                    } else {
                        typeEl.textContent = currentText.substring(0, charIdx + 1);
                        charIdx++;
                    }

                    let typeSpeed = isDeleting ? 40 : 80;

                    if (!isDeleting && charIdx === currentText.length) {
                        typeSpeed = 2000;
                        isDeleting = true;
                    } else if (isDeleting && charIdx === 0) {
                        isDeleting = false;
                        textIdx = (textIdx + 1) % typeTexts.length;
                        typeSpeed = 600;
                    }

                    setTimeout(typeLoop, typeSpeed);
                };
                setTimeout(typeLoop, 500);
            }
            setTimeout(() => {
                enterScreen.style.display = 'none';
            }, 1500);
        }, 1200);
    });
    volumeBtn.addEventListener('click', () => {
        if (bgAudio.muted) {
            bgAudio.muted = false;
            volumeIcon.className = 'fa-solid fa-volume-high';
        } else {
            bgAudio.muted = true;
            volumeIcon.className = 'fa-solid fa-volume-xmark';
        }
    });
    bgAudio.addEventListener('timeupdate', () => {
        const duration = isNaN(bgAudio.duration) ? 0 : bgAudio.duration;
        const current = isNaN(bgAudio.currentTime) ? 0 : bgAudio.currentTime;

        if (duration > 0) {
            const progressPercent = (current / duration) * 100;
            progressFill.style.width = `${progressPercent}%`;
            const currentMins = Math.floor(current / 60);
            const currentSecs = Math.floor(current % 60).toString().padStart(2, '0');
            const totalMins = Math.floor(duration / 60);
            const totalSecs = Math.floor(duration % 60).toString().padStart(2, '0');

            timeDisplay.textContent = `${currentMins}:${currentSecs} / ${totalMins}:${totalSecs}`;
        } else {
            timeDisplay.textContent = `0:00 / 0:00`;
            progressFill.style.width = `0%`;
        }
        if (lyricsScroll) {
            let newIndex = -1;
            for (let i = 0; i < lyricsData.length; i++) {
                if (current >= lyricsData[i].time) {
                    newIndex = i;
                } else {
                    break;
                }
            }

            if (newIndex !== currentLyricIndex && newIndex !== -1) {
                if (currentLyricIndex !== -1) {
                    const oldEl = document.getElementById(`lyric-${currentLyricIndex}`);
                    if (oldEl) oldEl.classList.remove('active');
                }

                const newEl = document.getElementById(`lyric-${newIndex}`);
                if (newEl) {
                    newEl.classList.add('active');
                    const offset = newEl.offsetTop + (newEl.offsetHeight / 2);
                    lyricsScroll.style.transform = `translateY(-${offset}px)`;
                }
                currentLyricIndex = newIndex;
            }
        }
    });
    const card = document.getElementById('card');

    document.addEventListener('mousemove', (e) => {
        if (!enterScreen.classList.contains('fade-out')) return;

        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        card.style.transform = `rotateY(${xAxis}deg) rotateX(${-yAxis}deg)`;
    });
    document.addEventListener('mouseleave', () => {
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        card.style.transition = 'transform 0.5s ease';
    });

    document.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease-out';
    });
    const badgesContainer = document.getElementById('badges-container');
    if (badgesContainer) {
        const trophyBadge = document.createElement('div');
        trophyBadge.className = 'custom-badge badge-trophy';
        trophyBadge.setAttribute('data-tooltip', 'number one larper');
        trophyBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M400 0H176c-26.5 0-48.1 21.8-47.1 48.2c.2 5.3 .4 10.6 .7 15.8H24C10.7 64 0 74.7 0 88c0 92.6 33.5 157 78.5 200.7c44.3 43.1 98.3 64.8 138.1 75.8A155.8 155.8 0 0 0 288 384c1.2 0 2.3-.2 3.5-.2V448H224c-17.7 0-32 14.3-32 32s14.3 32 32 32h128c17.7 0 32-14.3 32-32s-14.3-32-32-32h-67.5v-64.2c1.2 .1 2.3 .2 3.5 .2a155.8 155.8 0 0 0 71.4-19.5c39.8-11 93.8-32.7 138.1-75.8C542.5 245 576 180.6 576 88c0-13.3-10.7-24-24-24H446.4c.3-5.2 .5-10.4 .7-15.8C448.1 21.8 426.5 0 400 0zM73.9 239.5C40.6 195.4 32.5 140 32 96h98.8l1 32c5.9 187 36 244 55 264c-28.7-18-62.8-59-112.9-152.5zM502.1 239.5c-50.1 93.5-84.3 134.5-112.9 152.5c19-20 49.1-77 55-264l1-32h98.8c-.5 44-8.6 99.4-41.9 143.5z"/></svg>`;
        badgesContainer.appendChild(trophyBadge);
        const devBadge = document.createElement('div');
        devBadge.className = 'custom-badge badge-dev';
        devBadge.setAttribute('data-tooltip', 'Developer');
        devBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>`;
        badgesContainer.appendChild(devBadge);
        const verifiedBadge = document.createElement('div');
        verifiedBadge.className = 'custom-badge badge-verified';
        verifiedBadge.setAttribute('data-tooltip', 'Verified');
        verifiedBadge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c-45.7 0-82.5 35.5-85.3 80H80c-44.2 0-80 35.8-80 80v90.7C0 296.5 35.5 333.3 80 336v96c0 44.2 35.8 80 80 80h90.7c45.5 5.5 87.2-22.1 110.1-64h61.2c44.2 0 80-35.8 80-80v-90.7c27.9-10.4 46.2-37.4 46.2-67.3s-18.3-56.9-46.2-67.3V80c0-44.2-35.8-80-80-80H256zm-17 343.3l-84.7-84.7c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l67.7 67.7 131.7-131.7c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L239 343.3z"/></svg>`;
        badgesContainer.appendChild(verifiedBadge);
    }
    const viewCounterEl = document.getElementById('view-counter');
    if (viewCounterEl) {
        if (!localStorage.getItem('hasVisited')) {
            localStorage.setItem('hasVisited', 'true');
            fetch('https://api.counterapi.dev/v1/jacobs-bio-page/views/up')
                .then(res => res.json())
                .then(data => {
                    viewCounterEl.textContent = data.count || 0;
                })
                .catch(err => {
                    console.error("Counter API failed", err);
                    viewCounterEl.textContent = "0";
                });
        } else {
            fetch('https://api.counterapi.dev/v1/jacobs-bio-page/views/')
                .then(res => res.json())
                .then(data => {
                    viewCounterEl.textContent = data.count || 0;
                })
                .catch(err => {
                    console.error("Counter API failed", err);
                    viewCounterEl.textContent = "0";
                });
        }
    }
    const cursorDot = document.getElementById('cursor-dot');
    const cursorTrail = document.getElementById('cursor-trail');
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
        trailX += (mouseX - trailX) * 0.25;
        trailY += (mouseY - trailY) * 0.25;
        const diffX = mouseX - trailX;
        const diffY = mouseY - trailY;
        const speed = Math.sqrt(diffX * diffX + diffY * diffY);

        const blurAmount = Math.min(speed * 0.1, 8);

        cursorTrail.style.left = `${trailX}px`;
        cursorTrail.style.top = `${trailY}px`;
        cursorTrail.style.transform = `translate(-50%, -50%)`;
        cursorTrail.style.filter = `blur(${blurAmount}px)`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();
});
