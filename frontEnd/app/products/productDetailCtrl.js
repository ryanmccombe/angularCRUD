/**
 * Created by Ryan on 01/06/2015.
 */
(function () {
    'use strict';
    function ProductDetailCtrl(product, productService) {
        var vm = this;
        vm.product = product;
        vm.title = 'Product Detail: ' + vm.product.productName;
        vm.marginPercent = productService.calculateMarginPercent(vm.product.price, vm.product.cost);

        if (vm.product.tags) {
            vm.product.tagList = vm.product.tags.toString();
        }
    }

    angular.module('productManagement').controller('ProductDetailCtrl', ['product', 'productService', ProductDetailCtrl]);
}());