/**
 * Created by Ryan on 31/05/2015.
 */

(function () {
    'use strict';
    var app = angular.module('productResourceMock', ['ngMockE2E']);
    app.run(function ($httpBackend) {
        var products = [
            {
                productId: 1,
                productName: 'Leaf Rake',
                productCode: 'GDN-0011',
                releaseDate: 'March 19, 2009',
                description: 'Leaf rake with 40-inch handle',
                cost: 9.00,
                price: 19.95,
                category: 'garden',
                tags: ['leaf', 'tool'],
                imageUrl: 'http://openclipart.org/image/300px/svg_to_png/26215/'
            }, {
                productId: 2,
                productName: 'Hammer',
                productCode: 'TXN-0011',
                releaseDate: 'May 20, 2011',
                description: 'Curved claw hammer',
                cost: 1.00,
                price: 8.95,
                category: 'toolbox',
                tags: ['tool'],
                imageUrl: 'http://openclipart.org/image/300px/svg_to_png/73/'
            }, {
                productId: 3,
                productName: 'Saw',
                productCode: 'TXN-0011',
                releaseDate: 'May 20, 2011',
                description: 'Curved claw hammer',
                cost: 2.00,
                price: 8.95,
                category: 'toolbox',
                tags: ['tool'],
                imageUrl: 'http://openclipart.org/image/300px/svg_to_png/73/'
            }, {
                productId: 4,
                productName: 'Toolbox',
                productCode: 'TXN-0011',
                releaseDate: 'May 20, 2011',
                description: 'Curved claw hammer',
                cost: 3.00,
                price: 8.95,
                category: 'toolbox',
                tags: ['tool'],
                imageUrl: 'http://openclipart.org/image/300px/svg_to_png/73/'
            }, {
                productId: 5,
                productName: 'Screwdriver',
                productCode: 'TXN-0011',
                releaseDate: 'May 20, 2011',
                description: 'Curved claw hammer',
                cost: 7.00,
                price: 8.95,
                category: 'toolbox',
                tags: ['tool'],
                imageUrl: 'http://openclipart.org/image/300px/svg_to_png/73/'
            }
        ];

        var productUrl = '/api/products';
        var editingRegex = new RegExp(productUrl + '/[0-9][0-9]*', '');

        $httpBackend.whenGET(productUrl).respond(products);

        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var product = {productId: 0};
            var parameters = url.split('/');
            var length = parameters.length;
            var id = parameters[length - 1];
            if (id > 0) {
                for (var i = 0, l = products.length; i < l; i++) {
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                }
            }
            return [200, product, {}]
        });


        $httpBackend.whenPOST(productUrl).respond(function(method, url, data){
            var product = angular.fromJson(data);
            if(!product.productId){
                product.productId = products[products.length -1].productId + 1;
                products.push(product);
            } else {
                for (var i = 0, l = products.length; i < l; i++) {
                    if (products[i].productId == product.productId){
                        products[i] = product;
                        break;
                    }
                }
            }
            return [200, product, {}]
        });

        $httpBackend.whenGET(/app/).passThrough();
    });
}());