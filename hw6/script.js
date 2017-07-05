$(document).ready(function () {
    function effectBounce($elem) {
        $elem.effect('bounce');
    }

    function showError(text) {
        var error = $('<div />', {
            title: 'error',
            text: text
        });
        error.dialog();
    }

    $('#btn-send').on('click', function () {
        var name = $('#name');
        var phone = $('#phone');
        var email = $('#email');
        var town = $('#town');
        var text = $('#text');

        if (/^[a-zа-яё]+$/i.test(name.val())) {
            name.attr('class', 'true-validate');
        } else {
            name.attr('class', 'false-validate');
            showError('Имя может содержать только буквы');
            effectBounce(name);
        }
        if (/^\+7\(\d{3}\)\d{3}-\d{4}$/.test(phone.val())) {
            phone.attr('class', 'true-validate');
        } else {
            phone.attr('class', 'false-validate');
            var error = $('<div />', {
                title: 'error',
                text: 'Телефон должен соответсвовать шаблону +7(000)000-0000'
            });
            error.dialog();
            effectBounce(phone);
        }
        if (/^([a-zа-я0-9_-]+\.)*[a-zа-я0-9_-]+@[a-zа-я0-9_-]+(\.[a-zа-я0-9_-]+)*\.[a-zа-я]{2,6}$/i.test(email.val())){
            email.attr('class', 'true-validate');
        } else {
            email.attr('class', 'false-validate');
            showError('Неверный адрес email');
            error.dialog();
            effectBounce(email);
        }
        if (/^\s*/i.test(text.val())) {
            if (text.val().length < 5) {
                text.attr('class', 'false-validate');
                showError('Не заполнили поле текст');
                effectBounce(text);
            } else {
                text.attr('class', 'true-validate');
            }
        }
        if (/^[a-zа-яё]+$/i.test(town.val())) {
            town.attr('class', 'true-validate');
        } else {
            town.attr('class', 'false-validate');
            showError('Не заполнили поле город');
            effectBounce(town);
        }

    });


//autocomplete для города
    var inputTown = $('#town');
    var $list = $('.list-towns');


    var ul = document.createElement('ul');

    var towns = [];

    function setTowns(data) {
        for (var i in data) {
            towns.push(data[i]);
        }
    }

    $.ajax({
        url: "./towns.json",
        type: "GET",
        dataType: 'json',
        success: function (data) {
            data.sort();
            setTowns(data);
        }
    });

    inputTown.on('input', function () {
        if (inputTown.val().length > 2) {
            var temp = [];
            for (var i in towns) {
                var regExpTown = new RegExp('^' + inputTown.val(), 'i');
                if (regExpTown.test(towns[i])) {
                    temp.push(towns[i]);
                }
            }
            ul.innerHTML = '';

            if (temp.length > 0) {
                for (var town in temp) {
                    var li = document.createElement('li');
                    li.innerHTML = temp[town];
                    ul.appendChild(li);
                }
                $list.empty();
                $list.html(ul);

                $('.list-towns ul li').on('click', function () {
                    inputTown.val(this.innerText);
                    $list.hide();
                });

                $list.css({
                    'left': inputTown.position().left,
                    'top': inputTown.outerHeight()
                });



                $list.show();
            }
        } else {
            if ($list.css('display') === 'block') {
                $list.hide();
            }
        }
    });

});