function Container(id) {
    this.id = id;
    this.className = '';
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

function Basket() {
    Container.call(this, 'basket');

    this.countGoods = 0;
    this.amount = 0;

    this.basketItems = [];
    this.collectBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function (root) {
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root);
};

Basket.prototype.collectBasketItems = function () {
    var appendId = '#' + this.id + '_items';
    //var self = this;
    $.get({
        url: 'basket.json',
        success: function (data) {
            var basketData = $('<div />', {
                id: 'basket_data'
            });

            this.countGoods = data.basket.length;
            this.amount = data.amount;

            basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
            basketData.append('<p>Сумма: ' + this.amount + '</p>');

            basketData.appendTo(appendId);

            for(var item in data.basket)
            {
                this.basketItems.push(data.basket[item]);
            }
        },
        context: this,
        dataType: 'json'
    });
};

Basket.prototype.add = function (idProduct, quantity, price) {
    var basketItem = {
        "id_product": idProduct,
        "price": price,
        "count": quantity
    };
    var isAdd = false;

    //TODO: Передача нового товара на сервер

    for (var i = 1; i <= quantity; i++)
    {
        this.countGoods++;
    }

    this.amount += price * quantity;

    for (var item in this.basketItems) {
        if (this.basketItems[item].id_product === idProduct) {
            this.basketItems[item].count++;
            isAdd = true;
            break;
        }
    }

    if (!isAdd) {
        this.basketItems.push(basketItem);
    }

    this.refresh();
};

Basket.prototype.refresh = function () {
    var basketDataDiv = $('#basket_data');
    basketDataDiv.empty();
    basketDataDiv.append('<p>Всего товаров: ' + this.countGoods + ' </p>');
    basketDataDiv.append('<p>Сумма: ' + this.amount + ' </p>');
};


//Удаление товара

Basket.prototype.removeItem = function (idProduct) {
    var price = 0;
    for (var item in this.basketItems) {
        if (this.basketItems[item].id_product === idProduct) {
            price = this.basketItems[item].price;
            if (this.basketItems[item].count > 1) {
                --this.basketItems[item].count;
                break;
            } else {
                this.basketItems.splice(item, 1);
                break;
            }
        }
    }

    //TODO: Передать на сервер удаление товара

    if (this.countGoods > 0) {
        this.countGoods--;
        this.amount -= price;
    }
    this.refresh();
};