const directionLink = document.querySelector("#direction-link");

directionLink.addEventListener("click", () => {
    document.querySelector(".directions").scrollIntoView({ behavior: "smooth" });
});

// SMOOTH SCROLL к конкретным точкам----------------------------------------------------------------------------
var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 1; // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener(
        "click",
        function (e) {
            //по клику на ссылку
            e.preventDefault(); //отменяем стандартное поведение
            var w = window.pageYOffset, // производим прокрутка прокрутка
                hash = this.href.replace(/[^#]*(.*)/, "$1"); // к id элемента, к которому нужно перейти
            (t = document.querySelector(hash).getBoundingClientRect().top), // отступ от окна браузера до id
                (start = null);
            requestAnimationFrame(step); // подробнее про функцию анимации [developer.mozilla.org]
            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
                window.scrollTo(0, r);
                if (r != w + t) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash; // URL с хэшем
                }
            }
        },
        false
    );
}
// SMOOTH SCROLL к конкретным точкам----------------------------------------------------------------------------

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

//Плавная прокрутка на сайте всего------------------------------------------------------------------
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
