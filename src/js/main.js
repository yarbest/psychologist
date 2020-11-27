// Открытие меню----------------------------------------------------------------------------
let toggleSidebar = document.querySelector(".header__toggle-sidebar");
let sidebar = document.querySelector(".header__nav ");
let body = document.querySelector("body");

toggleSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("header__nav_active");
    // body.classList.toggle("lock-scroll");
});
// Открытие меню----------------------------------------------------------------------------

//Плавная прокрутка по ЯКОРЯМ ---------------------------------------------------------------
$("body").on("click", '[href*="#"]', function (e) {
    var fixed_offset = 62;

    if ($(window).width() < 991) {
        var fixed_offset = 100;
        //добавляем дополнительный отступ из-за шапки, которая появляется на < 991
    }
    if ($(window).width() < 575) {
        var fixed_offset = 120;
        //добавляем дополнительный отступ из-за шапки, которая появляется на < 991
    }
    $("html,body")
        .stop()
        .animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 500);
    e.preventDefault();
});
//Плавная прокрутка по ЯКОРЯМ ---------------------------------------------------------------

// Accordion------------------------------------------------------------------
$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        // more then one submenu open?
        this.multiple = multiple || false;

        var dropdownlink = this.el.find(".dropdownlink");
        dropdownlink.on("click", { el: this.el, multiple: this.multiple }, this.dropdown);
    };

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el,
            $this = $(this),
            //this is the ul.submenuItems
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass("open");

        if (!e.data.multiple) {
            //show only one menu at the same time
            $el.find(".submenuItems").not($next).slideUp().parent().removeClass("open");
        }
    };

    var accordion = new Accordion($(".accordion-menu"), false);
});
// Accordion------------------------------------------------------------------

//Плавная прокрутка на сайте всего (не трогай)------------------------------------------------------------------
SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 800,
    // Размер шага в пикселях
    stepSize: 75,

    // Дополнительные настройки:

    // Ускорение
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,

    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,

    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,

    // Поддержка тачпада
    touchpadSupport: true,
});
//Плавная прокрутка на сайте всего------------------------------------------------------------------

$(document).ready(function () {
    //preloader------------------------------------------------------------------
    $("#cube-loader").fadeOut();
    //preloader------------------------------------------------------------------

    //slider------------------------------------------------------------------
    $(".certificates-slider").slick({
        prevArrow: $(".slider-arrows__prev"), //назначаем кастомные стрелки на роль переключателей слайдера
        nextArrow: $(".slider-arrows__next"),
        infinite: false,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });
    //slider------------------------------------------------------------------
});
