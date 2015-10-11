'use strict';

var Vue = require('vue');
var $ = require('jQuery');

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
    components: {
        transaction: require('./components/transaction'),
        itemList: require('./components/item-list')
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