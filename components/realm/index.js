import { FenceGroup } from "../models/fence-group";
import { Judger } from "../models/judger";

Component({
    properties: {
        spu: Object
    },
    data: {
        judger: Object
    },
    methods: {
        bindingInitData(fenceGroup) {
            this.setData({
                fences:fenceGroup.fences
            })
        },

        onCellTap(event) {
            const { cell, x, y } = event.detail;
            const { judger } = this.data;
            judger.judge(cell, x, y);
            this.setData({
                fences: judger.fenceGroup.fences
            });
        }
    },
    observers: {
        'spu': function (spu) {
            if(!spu) {
                return ;
            }
            const fenceGroup = new FenceGroup(spu);
            fenceGroup.initFencesTranspose();
            const judger = new Judger(fenceGroup);
            this.data.judger = judger;
            this.bindingInitData(fenceGroup);
        }
    }
});
