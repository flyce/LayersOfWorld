Component({
    properties: {
        cell: Object,
        x: Number,
        y: Number
    },
    data: {},
    methods: {
        onTap(event) {
            const { cell, x, y } = this.properties;
            this.triggerEvent('celltap', {
                cell,
                x,
                y
            }, {
                bubbles: true,
                composed: true
            });
        }
    }
});
