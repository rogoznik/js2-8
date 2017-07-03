function Review() {
    Container.call(this, 'review');

    this.reviews = [];

    this.collectReviewItem();

}

Review.prototype = Object.create(Container.prototype);
Review.prototype.constructor = Review;

Review.prototype.render = function (root) {
    var reviewsDiv = $('<div />', {
        id: this.id
    });

    var reviewItemsDiv = $('<div />', {
        id: this.id + '_items'
    });

    for (var i = 0; i < this.reviews.length; i++) {
        if (this.reviews[i].status === 1){
            var reviewData = $('<div />', {
                className: 'review_data',
                text: this.reviews[i].text
            });
            var btnDel = $('<button />', {
                className: 'btnDel',
                "data-review": this.reviews[i].id_review,
                text: 'Удалить'
            });
            btnDel.appendTo(reviewData);
            reviewData.appendTo(reviewItemsDiv);
        }
    }

    reviewItemsDiv.appendTo(reviewsDiv);
    reviewsDiv.appendTo(root);

};

Review.prototype.collectReviewItem = function () {
    $.get({
        url: 'review.json',
        success: function (data) {

            for(var item in data.review)
            {
                this.reviews.push(data.review[item]);
            }

        },
        context: this,
        dataType: 'json'
    });
};

Review.prototype.add = function (idReview, text) {
    var addItem = {
        "id_review": idReview,
        "text": text,
        "status": 0
    };
    
    //TODO: Передача нового отзыва на сервер

    this.reviews.push(addItem);

    this.refreshModer();

    $('#text-review').val('');
    
};

Review.prototype.refreshModer = function () {
    var moder = $('#reviews-for-moder');
    moder.empty();

    for (var item in this.reviews) {
        if (this.reviews[item].status === 0) {
            var reviewData = $('<div />', {
                className: 'review_data',
                text: this.reviews[item].text
            });
            var btnDel = $('<button />', {
                className: 'btnDel',
                "data-review": this.reviews[item].id_review,
                text: 'Утвердить'
            });
            btnDel.appendTo(reviewData);
            reviewData.appendTo(moder);
        }
    }
};