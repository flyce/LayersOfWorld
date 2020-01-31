Component({
    properties: {},
    data: {},
    methods: {
        onGoToHome(event) {
            this.triggerEvent('gotohome');
        },
        onGoToCart(event) {
            this.triggerEvent('gotocart');
        },
        onAddCart(event) {
            this.triggerEvent('addtocart');
        },
        onBuy(event) {
            this.triggerEvent('buy');
        },
    }
});
