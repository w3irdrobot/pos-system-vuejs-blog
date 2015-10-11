(function($, Vue) {
    'use strict';

    new Vue({
        el: '#pos',
        data: {
            items: [],
            lineItems: []
        },
        created: function() {
            $.get('/items.json', function(items) {
                this.items = items;
            }.bind(this), 'json');
        },
        computed: {
            subtotal: function() {
                var subtotal = 0;

                this.lineItems.forEach(function(item) {
                    subtotal += item.item.price * item.numberOfItems;
                });

                return subtotal;
            },
            tax: function() {
                return this.subtotal * 0.065;
            },
            total: function() {
                return this.subtotal + this.tax;
            }
        },
        methods: {
            onItemClick: function(item) {
                var found = false;

                for (var i = 0; i < this.lineItems.length; i++) {
                    if (this.lineItems[i].item === item) {
                        this.lineItems[i].numberOfItems++;
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    this.lineItems.push({ item: item, numberOfItems: 1, editing: false });
                }
            },
            toggleEdit: function(lineItem) {
                lineItem.editing = !lineItem.editing;
            },
            removeItem: function(lineItem) {
                for (var i = 0; i < this.lineItems.length; i++) {
                    if (this.lineItems[i] === lineItem) {
                        this.lineItems.splice(i, 1);
                        break;
                    }
                }
            }
        }
    });
})(jQuery, Vue);