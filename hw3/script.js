var str = "'asdasdsad 'asdsadasd' asdsad sad'a sdasdsa'";
function replacer(str) {
    var res = '';
    if (/^'/.test(str)) {
        res = '"';
    }
    if (/'$/.test(str)) {
        res = '"';
    }
    if (/\s'\w/.test(str)) {
        res = ' "'+str[2];
    }
    if (/\w'\s/.test(str)) {
        res = str[0]+'" ';
    }
    return res;
}
console.log(str.replace(/(^')|('$)|(\s'\w)|(\w'\s)/gm, replacer));



window.onload = function () {
    document.getElementById('btn-send').addEventListener('click', function () {
        var name = document.getElementById('name');
        var phone = document.getElementById('phone');
        var email = document.getElementById('email');

        var be = document.getElementById('block-errors');
        be.innerHTML = '';

        if (/^[a-zа-яё]+$/i.test(name.value)) {
            name.className = 'true-validate';
        } else {
            name.className = 'false-validate';
            var error = document.createElement('div');
            error.className = 'error';
            error.innerHTML = 'Имя может содержать только буквы';
            be.appendChild(error);
        }
        if (/^\+7\(\d{3}\)\d{3}-\d{4}$/.test(phone.value)) {
            phone.className = 'true-validate';
        } else {
            phone.className = 'false-validate';
            var error = document.createElement('div');
            error.className = 'error';
            error.innerHTML = 'Телефон должен соответсвовать шаблону +7(000)000-0000';
            be.appendChild(error);
        }
        if (/^([a-zа-я0-9_-]+\.)*[a-zа-я0-9_-]+@[a-zа-я0-9_-]+(\.[a-zа-я0-9_-]+)*\.[a-zа-я]{2,6}$/i.test(email.value)){
            email.className = 'true-validate';
        } else {
            email.className = 'false-validate';
            var error = document.createElement('div');
            error.className = 'error';
            error.innerHTML = 'Неверный адрес email';
            be.appendChild(error);
        }
    });
};