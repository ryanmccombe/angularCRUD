/**
 * Created by Ryan on 31/05/2015.
 */

(function () {
    'use strict';
    function productResource($resource) {
        return $resource('/api/products/:productId');
    }

    angular.module('common.services').factory('productResource', ['$resource', productResource]);
}());