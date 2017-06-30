$(document).ready(function () {

    //вкладки------------------------------------------------

    var text = [
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consequatur, distinctio earum ' +
        'enim eos, itaque nam nisi nobis obcaecati odio omnis porro quis saepe sed sit tempora, unde voluptates ' +
        'voluptatum.',
        'Adipisci aspernatur atque corporis cumque ducimus earum eius eligendi, fuga fugit impedit ' +
        'itaque iusto molestiae natus nisi obcaecati, odit porro praesentium quasi reiciendis sequi sit sunt totam, ' +
        'vel velit voluptatibus?',
        'Eaque odit optio praesentium quae repellat sit? Earum eos quibusdam ut velit veniam? Beatae ' +
        'corporis delectus earum exercitationem nam officiis, placeat, possimus provident quis reiciendis sunt ' +
        'tempore totam voluptatem! Pariatur.'
    ];

    var $tabs = $('.tabs .tab');
    var $text = $('.text');

    var ACTIVE = 'active-tab';
    var ACTIVE_DOT = '.' + ACTIVE;

    function showText(index) {
        $text.text(text[index]);
    }

    if ($tabs.filter(ACTIVE_DOT).hasClass('tab')) {
        showText($tabs.filter(ACTIVE_DOT).attr('data-index'));
    }

    $tabs.on('click', function () {
        var $tab = $('#'+this.id);

        $tabs.removeClass(ACTIVE);
        $tab.addClass(ACTIVE);

        showText($tab.attr('data-index'));
    });


    //список городов------------------------------------------

    var $list = $('.list-towns');
    var inputTown = $('#town');

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
                $list.html('');
                $list.html(ul);

                $('.list-towns ul li').on('click', function () {
                    inputTown.val(this.innerText);
                    $list.hide(400);
                });

                $list.show(400);
            }
        } else {
            if ($list.css('display') === 'block') {
                $list.hide(400);
            }
        }
    });


});