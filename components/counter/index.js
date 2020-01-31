import { Cart } from "../../model/cart";

Component({
    properties: {
        count: {
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        min: {
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        max: {
            type: Number,
            value: Cart.SKU_MAX_COUNT
        }
    },
    data: {},
    methods: {
        onOverStep(event) {
            const minOrMax = event.detail.type;
            if(minOrMax == 'overflow_max') {
                wx.showToast({
                    title: `超出最大购买量 ${Cart.SKU_MAX_COUNT}`,
                    icon: 'none',
                    duration: 3000,
                });
            }
            if(minOrMax == 'overflow_min') {
                wx.showToast({
                    title: `最少需要购买 ${Cart.SKU_MIN_COUNT} 件噢`,
                    icon: 'none',
                    duration: 3000,
                });
            }
        }
    }
});
