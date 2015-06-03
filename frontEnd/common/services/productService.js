/**
 * Created by Ryan on 02/06/2015.
 */

(function () {
    'use strict';
    function productService() {

        function calculateMarginAmount(price, cost) {
            var margin = 0;
            if (price && cost) {
                margin = price - cost;
            }
            return margin;
        }

        function calculateMarginPercent(price, cost) {
            var margin = 0;
            if (price && cost) {
                margin = (100 * (price - cost)) / price;
            }
            margin = Math.round(margin);
            return margin;
        }

        function calculatePriceFromAmount(cost, amount) {
            var price = cost;
            if (cost && amount) {
                price = cost + amount;
                price = (Math.round(price * 100)) / 100;
            }
            return price;
        }

        function calculatePriceFromPercent(cost, percent) {
            var price = cost;
            if (cost && percent) {
                price = cost + cost * percent / 100;
                price = (Math.round(price * 100)) / 100;
            }
            return price;
        }

        return {
            calculateMarginAmount: calculateMarginAmount,
            calculateMarginPercent: calculateMarginPercent,
            calculatePriceFromMarkupAmount: calculatePriceFromAmount,
            calculatePriceFromMarkupPercent: calculatePriceFromPercent
        };
    }

    angular.module('common.services').factory('productService', productService);
}());