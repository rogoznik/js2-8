(function ($){
    $.fn.carousel = function (options) {
        //настройки по умолчанию
        var settings = {
            countVisible: 3, //количество видимых элементов
            rotateCount: 1, //сколько элементов перематывается за раз
            speed: 700, //скорость перемотки в миллисекундах
            btnNext: null, //кнопка "Следующий"
            btnPrev: null, //кнопка "Предыдущий"
            auto: null, //задержка при автоматической перемотке в миллисекундах
            autoDirection: false //напрвление автоматической перемотки
        };

        return this.each(function () {
            if (options) {
                $.extend(settings, options)
            }

            var $this = $(this); //сохранение контекста
            var $carousel = $this.children(':first'); //первый потомок в контейнере
            var itemWidth = $carousel.children().outerWidth(); //ширина элемента карусели
            var itemsCount = $carousel.children().length; //количество элементов карусели
            var isAnimating = false; //проигрывается ли анимация в данный момент
            var intervalId = null; //ID интервала

            //стили для карусели, чтоб пользователь не думал об этом
            //контейнер
            $this.css({
                'position': 'relative',
                'overflow': 'hidden',
                'width': settings.countVisible * itemWidth
            });
            //сама карусель
            $carousel.css({
                'position': 'relative',
                'width': 9999, //ширина побольше чтоб точно вместились все элементы
                'left': 0 //сдвиг влево изначально нулевой
            });

            function slide(dir) {
                var direction = !dir ? -1 : 1; //выбор направления куда мотать
                var leftCarusel = 0; //смещение влево для $carousel

                if (!isAnimating) {
                    isAnimating = true; //анимация началась

                    if (intervalId) {
                        window.clearInterval(intervalId) //если нитервал запущен - очищаем
                    }

                    if (!dir) {
                        /*
                        * если мотаем к следующему элементу
                        * всавляем столько клонов в конец сколько указано в rotateCount
                        */
                        $carousel.children(':last').after($carousel.children().slice(0, settings.rotateCount).clone(true))
                    } else {
                        /*
                         * если мотаем к предыдущему элементу
                         * всавляем столько клонов в начало сколько указано в rotateCount
                         */
                        $carousel.children(':first').before($carousel.children().slice(itemsCount - settings.rotateCount, itemsCount).clone(true));
                        //сдвигаем карусель влево на количество из rotateCount
                        $carousel.css('left', -itemWidth * settings.rotateCount);
                    }

                    leftCarusel = parseInt($carousel.css('left')) + (itemWidth * settings.rotateCount * direction);

                    //запуск анимации
                    $carousel.animate({'left': leftCarusel}, {queue: false, duration: settings.speed, complete: function () {
                        //после окончания анимации
                        if (!dir) {
                            /*
                            * если мотаем к следующему
                            * удаляем столько первых сколько указано в rotateCount
                            */
                            $carousel.children().slice(0, settings.rotateCount).remove();
                            $carousel.css('left', 0);
                        } else {
                            /*
                             * если мотаем к предыдущему
                             * удаляем столько последних сколько указано в rotateCount
                             */
                            $carousel.children().slice(itemsCount, itemsCount + settings.rotateCount).remove();
                        }

                        if (settings.auto) {
                            /*
                            * если карусель должна проматываться автоматически
                            * вызов функции через интервал settings.auto*/
                            intervalId = window.setInterval(function () {slide(settings.autoDirection)}, settings.auto);
                        }

                        isAnimating = false; //анимация завершена
                    }});
                }
                return false; //чтоб не было перехода по ссылке
            }

            $(settings.btnNext, this).on('click', function () {
                return slide(false);
            });

            $(settings.btnPrev, this).on('click', function () {
                return slide(true);
            });

            if (settings.auto) {
                /*
                 * если карусель должна проматываться автоматически
                 * вызов функции через интервал settings.auto
                 */
                intervalId = window.setInterval(function () {slide(settings.autoDirection)}, settings.auto);
            }
        });
    }
})(jQuery);