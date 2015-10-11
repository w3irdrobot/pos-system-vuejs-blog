module.exports = {
    template: require('./template.html'),
    props: ['items', 'add'],
    methods: {
        itemClicked: function(item) {
            this.add(item);
        }
    }
};