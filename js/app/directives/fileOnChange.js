/*
 * bind event for file input change 
 */

angular.module("booksApp").directive('fileOnChange', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs, ngModel) {
            var attrHandler = $parse(attrs['fileOnChange']);
            var handler = function (e) {
                $scope.$apply(function () {
                    attrHandler($scope, { $event: e, files: e.target.files });
                });
            };

            // Attach the handler to the HTML change event 
            element[0].addEventListener('change', handler, false);
        }
    };
}]);