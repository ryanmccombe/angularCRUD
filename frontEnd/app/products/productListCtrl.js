/**
 * Created by Ryan on 30/05/2015.
 */
(function () {
    'use strict';
    function ProductListCtrl(productResource) {
        var vm = this;
        productResource.query(function (data) {
            vm.products = data;
        });

        vm.showImage = false;
        vm.toggleImage = function () {
            vm.showImage = !vm.showImage;
        };
    }

    angular.module('productManagement').controller('ProductListCtrl', ['productResource', ProductListCtrl]);
}());