function Container(id) {
    this.id = id;
    this.className = '';
    this.htmlCode = '';
}

Container.prototype.render = function () {
    return this.htmlCode;
};

function Basket(root) {
    Container.call(this, 'basket');

    this.countGoods = 0;
    this.amount = 0;

    this.basketItems = [];
    this.root = root;
    this.collectBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;

Basket.prototype.render = function (root) {
    var basketDiv = $('<div />', {
        id: this.id,
        text: 'Корзина (нажмите кнопку "Купить" или перетащите товар сюда)'
    });

    var basketItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    var basketData = $('<div />', {
        id: 'basket_data'
    });

    basketData.append('<p>Всего товаров: ' + this.countGoods + '</p>');
    basketData.append('<p>Сумма: ' + this.amount + '</p>');

    basketData.appendTo(basketItemsDiv);

    basketItemsDiv.appendTo(basketDiv);
    basketDiv.appendTo(root);

    var basketGoods = $('<div />', {
        class: 'basket-goods'
    });

    for (var i in this.basketItems){
        var basketGoodsItem = $('<div />', {
            class: 'basket-goods__item',
            text: this.basketItems[i].name + ' цена: ' + this.basketItems[i].price + ' руб. ' + 'кол-во: ' +
                this.basketItems[i].count + ' сумма: ' + (this.basketItems[i].price * this.basketItems[i].count)
        });
        var delme = $('<button />', {
            class: 'delme',
            text: 'Удалить',
            'data-product': this.basketItems[i].id_product
        });
        delme.appendTo(basketGoodsItem);
        basketGoodsItem.appendTo(basketGoods);
    }

    basketGoods.appendTo(root);
};

Basket.prototype.collectBasketItems = function () {
    $.get({
        url: 'basket.json',
        success: function (data) {
            this.countGoods = data.basket.length;
            this.amount = data.amount;

            for(var item in data.basket)
            {
                this.basketItems.push(data.basket[item]);
            }
            this.render(this.root);
        },
        context: this,
        dataType: 'json'
    });
};

Basket.prototype.add = function (idProduct, name, quantity, price) {
    var basketItem = {
        "id_product": idProduct,
        "name": name,
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
    var $root = $('#basket_wrapper');
    $root.empty();
    this.render('#' + $root.attr('id'));
};


//Удаление товара

Basket.prototype.removeItem = function (idProduct) {
    var price = 0;
    var isDel = false;
    for (var item in this.basketItems) {
        if (this.basketItems[item].id_product === idProduct) {
            price = this.basketItems[item].price;
            if (this.basketItems[item].count > 1) {
                --this.basketItems[item].count;
                isDel = true;
                break;
            } else {
                this.basketItems.splice(item, 1);
                isDel = true;
                break;
            }
        }
    }

    //TODO: Передать на сервер удаление товара

    if (this.countGoods > 0) {
        if (isDel){
            this.countGoods--;
            this.amount -= price;
        }

    }
    this.refresh();
};