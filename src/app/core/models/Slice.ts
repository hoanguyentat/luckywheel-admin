export class SliceModel {

    constructor (slice) {
        {
            this.label = slice.label || null;
            this.index = slice.index || null;
            this.probability = slice.probability || null;
            this.auto = slice.auto || null;
            this.discountCode = slice.discountCode || null;
        }
    }
    
    label;
    index;
    probability;
    discountCode;
    auto;

    toggleAuto() {
        this.auto = !this.auto;
    }
}