import { FenceGroup } from "../models/fence-group";
import { Judger } from "../models/judger";
import { Spu } from "../../model/Spu";
import { Cell } from "../models/cell";
import { Cart } from "../../model/cart";

Component({
    properties: {
        spu: Object,
        orderWay: String
    },
    data: {
        judger: Object,
        previewImage: String,
        currentSkuCount: Cart.SKU_MIN_COUNT // 绑定服务端返回的最小购买数量
    },
    methods: {
        processNoSpec(spu) {
            this.setData({
                noSpec: true,
                // isSkuIntact: false
            });
            this.bindSkuData(spu.sku_list[0]);
            this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount);
        },

        processHasSpec(spu) {
            const fenceGroup = new FenceGroup(spu);
            fenceGroup.initFences();
            const judger = new Judger(fenceGroup);
            this.data.judger = judger;

            const defaultSku = fenceGroup.getDefaultSku();
            if (defaultSku) {
                this.bindSkuData(defaultSku);
                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount);
            } else {
                this.bindSpuData();
            }
            this.bindTipData();
            this.bindingInitData(fenceGroup);
        },

        bindingInitData(fenceGroup) {
            this.setData({
                fences:fenceGroup.fences
            });
        },

        bindSpuData() {
            const spu = this.properties.spu;
            this.setData({
                previewImage: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice:spu.discount_price
            })
        },

        bindSkuData(sku) {
            this.setData({
                previewImage: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice:sku.discount_price,
                stock: sku.stock
            });
        },

        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntcat(),
                currentValues: this.data.judger.getCurrentValues(),
                missingKeys: this.data.judger.getMissingKeys()
            })
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        },

        setStockStatus(stock, currentCount) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentCount)
            });
        },

        isOutOfStock(stock, currentCount) {
            return stock < currentCount;
        },

        onSelectCount(event) {
            const currentCount = event.detail.count;
            this.data.currentSkuCount = currentCount;

            if(this.data.judger.isSkuIntcat()) {
                const sku = this.data.judger.getDeterminateSku();
                this.setStockStatus(sku.stock, currentCount);
            }
        },

        onCellTap(event) {
            const data = event.detail.cell;
            const { x, y } = event.detail;

            const cell = new Cell(data.spec);
            cell.status = data.status;
            const { judger } = this.data;
            judger.judge(cell, x, y);
            const skuIntact = judger.isSkuIntcat();
            if(skuIntact) {
                const currentSku = judger.getDeterminateSku();
                this.bindSkuData(currentSku);
                this.setStockStatus(currentSku.stock, this.data.currentSkuCount);
                console.log(this.outStock);
            }
            this.bindTipData();
            this.bindFenceGroupData(judger.fenceGroup);
        }
    },
    observers: {
        'spu': function (spu) {
            if(!spu) {
                return;
            }
            // 无规格商品处理
            // sku_list = 1 && specs = 0 判定为无规则商品
            if(Spu.isNoSpec(spu)) {
                this.processNoSpec(spu);
                return;
            }
            this.processHasSpec(spu);
        }
    }
});
