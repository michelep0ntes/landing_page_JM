window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem', window.scrollY > 350)
})

function toggleMobileMenu() {
    var menu = document.querySelector('.mobile-menu');
    menu.classList.toggle('mobile-menu-open'); // Adiciona ou remove a classe 'mobile-menu-open'
}

/* slide 1 */

const carousels = document.querySelectorAll(".slides");

carousels.forEach(carousel => {
    const carouselWrapper = carousel.querySelector(".wrapper");
    const carouselContent = carousel.querySelector(".carousel");
    const firstImg = carouselContent.querySelectorAll("img")[0];
    const arrowIcons = carouselWrapper.querySelectorAll("i");

    let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft;

    const showHideIcons = () => {
        const scrollWidth = carouselContent.scrollWidth - carouselContent.clientWidth;
        arrowIcons[0].style.display = carouselContent.scrollLeft === 0 ? "none" : "block";
        arrowIcons[1].style.display =
            carouselContent.scrollLeft === scrollWidth ||
            carouselContent.scrollLeft + carouselContent.clientWidth >= carouselContent.scrollWidth
                ? "none"
                : "block";
    };

    arrowIcons.forEach(icon => {
        icon.addEventListener("click", () => {
            const firstImgWidth = firstImg.clientWidth + 14;
            let scrollPosition = carouselContent.scrollLeft;

            if (icon.classList.contains("left") && scrollPosition === 0) return;
            if (icon.classList.contains("right") && scrollPosition + carouselContent.clientWidth >= carouselContent.scrollWidth) return;

            carouselContent.style.transition = "scroll-left 0.3s ease-in-out";
            carouselContent.scrollLeft = icon.classList.contains("left") ? scrollPosition - firstImgWidth : scrollPosition + firstImgWidth;
            setTimeout(showHideIcons, 60);

            setTimeout(() => (carouselContent.style.transition = ""), 300);
        });
    });

    const dragStart = (e) => {
        isDragStart = true;
        prevPageX = e.pageX || e.touches[0].pageX;
        prevScrollLeft = carouselContent.scrollLeft;
    };

    const dragging = (e) => {
        if (!isDragStart) return;
        e.preventDefault();
        isDragging = true;
        carouselContent.classList.add("dragging");
        positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
        carouselContent.scrollLeft = prevScrollLeft - positionDiff;
        showHideIcons();
    };

    const dragStop = () => {
        isDragStart = false;
        carouselContent.classList.remove("dragging");
        if (!isDragging) return;
        isDragging = false;
    };

    carouselContent.addEventListener("mousedown", dragStart);
    carouselContent.addEventListener("touchstart", dragStart);

    document.addEventListener("mousemove", dragging);
    carouselContent.addEventListener("touchmove", dragging);

    document.addEventListener("mouseup", dragStop);
    carouselContent.addEventListener("touchend", dragStop);

    showHideIcons();
});
