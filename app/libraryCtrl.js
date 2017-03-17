app.controller('libraryCtrl', function ($scope, $uibModal, $filter, Data) {
    $scope.library = {};
    Data.get('libraryItems').then(function(data){
        $scope.libraryItems = data.data;
    });
});


app.controller('libraryEditCtrl', function ($scope, $modalInstance, item, Data) {


});
