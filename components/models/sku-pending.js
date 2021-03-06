import { Cell } from "./cell";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = [];
    size;

    constructor(size) {
        this.size = size;
    }

    init(sku) {
        this.size = sku.specs.length;
        for(let i = 0; i< sku.specs.length; ++i) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }
    }

    getCurrentSpecValue() {
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null;
        });
        return values;
    }

    getMissingSpecKeysIndex() {
        const keysIndex = [];
        for (let i = 0; i < this.size; ++i) {
            if(!this.pending[i]) {
                keysIndex.push(i);
            }
        }
        return keysIndex;
    }

    getSkuCode() {
        const joiner = new Joiner('#');
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode();
            joiner.join(cellCode);

        });
        return joiner.getStr();
    }

    isIntact() {
       // if(this.size !== this.pending.length) {
       //     return false;
       // }
       for(let i = 0; i < this.size; ++i) {
            if(this._isEmptyPart(i)) {
                return false;
            }
            // sku 规格选择出错是因为在此处return true;
       }
       // 应该在循化外return true;
       return true;
    }

    _isEmptyPart(index) {
        return !this.pending[index];
    }

    insertCell(cell, x) {
        this.pending[x] = cell;
    }

    removeCell(x) {
        this.pending[x] = null;
    }

    findSelectedCellByX(x) {
        return this.pending[x];
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x];
        if(!pendingCell) {
            return false;
        }
        return cell.id === pendingCell.id;

    }
}

export { SkuPending };