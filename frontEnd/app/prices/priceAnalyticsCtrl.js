/**
 * Created by Ryan on 03/06/2015.
 */

(function () {
    'use strict';

    function PriceAnalyticsCtrl($scope, products, productService, $filter) {

        $scope.title = 'Price Analytics';
        var i, l;
        for (i = 0, l = products.length; i < l; i += 1) {
            products[i].marginPercent = productService.calculateMarginPercent(products[i].price, products[i].cost);
            products[i].marginAmount = productService.calculateMarginAmount(products[i].price, products[i].cost);
        }
        var orderedProductsAmount = $filter('orderBy')(products, 'marginAmount');
        var filteredProductsAmount = $filter('limitTo')(orderedProductsAmount, 5);

        var orderedProductsPercent = $filter('orderBy')(products, 'marginPercent');
        var filteredProductsPercent = $filter('limitTo')(orderedProductsPercent, 5);

        var chartDataAmount = [];
        for (i = 0, l = filteredProductsAmount.length; i < l; i += 1) {
            chartDataAmount.push({
                x: filteredProductsAmount[i].productName,
                y: [
                    filteredProductsAmount[i].cost,
                    filteredProductsAmount[i].price,
                    filteredProductsAmount[i].marginAmount
                ]
            });
        }

       $scope.dataAmount = {
           series: ['Cost', 'Price', 'Margin Amount'],
           data: chartDataAmount
       };

        $scope.configAmount = {
            title: 'Top £ Margin Products',
            tooltips: false,
            labels: false,
            mouseover: function () {},
            mouseout: function () {},
            click: function () {},
            legend: {
                display: true,
                position: 'right'
            }
        };

        var chartDataPercent = [];
        for (i = 0, l = filteredProductsPercent.length; i < l; i += 1) {
            chartDataPercent.push({
                x: filteredProductsAmount[i].productName,
                y: [filteredProductsAmount[i].marginPercent]
            });
        }

        $scope.dataPercent = {
            series: ['Margin %'],
            data: chartDataPercent
        };

        $scope.configPercent = {
            title: 'Top % Margin Products',
            tooltips: false,
            labels: false,
            mouseover: function () {},
            mouseout: function () {},
            click: function () {},
            legend: {
                display: true,
                position: 'right'
            }
        };

    }

    angular.module('productManagement').controller('PriceAnalyticsCtrl', ['$scope', 'products', 'productService', '$filter', PriceAnalyticsCtrl]);
}());