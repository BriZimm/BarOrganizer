app.controller('productsCtrl', function ($scope, $uibModal, $filter, Data) {
    $scope.product = {};
    Data.get('products').then(function(data){
        $scope.products = data.data;
    });

    $scope.slider = {
      value: 'Good',
      options: {
        stepsArray: ['No Need', 'Out', 'Low', 'Good', 'New']
      }
    };

    $scope.deleteProduct = function(product){
        if(confirm("Are you sure you want to remove the product")){
            Data.delete("product/"+product.id).then(function(result){
                $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'partials/productEdit.html',
          controller: 'productEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.products.push(selectedObject);
                $scope.products = $filter('orderBy')($scope.products, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.name = selectedObject.name;
                p.description = selectedObject.description;
                p.price = selectedObject.price;
                p.made_in = selectedObject.made_in;
                p.distillery = selectedObject.distillery;
                p.category = selectedObject.category;
                p.location = selectedObject.location;
                p.size = selectedObject.size;
                p.status = selectedObject.status;
            }
        });
    };
    
    $scope.columns = [
        {text:"ID",predicate:"id",sortable:true,dataType:"number"},
        {text:"Name",predicate:"name",sortable:true},
        {text:"Category",predicate:"category",sortable:true},
        {text:"Size",predicate:"size",sortable:true},
        {text:"Price",predicate:"price",sortable:true, datatype:"number"},
        {text:"Location",predicate:"location",sortable:true},
        {text:"Made In",predicate:"made_in",reverse:true,sortable:true},
        {text:"Distillery",predicate:"distillery",reverse:true,sortable:true},
        {text:"Description",predicate:"description",sortable:true},
        {text:"Status",predicate:"status",sortable:true},
        {text:"Action",predicate:"",sortable:false}
    ];
});


app.controller('productEditCtrl', function ($scope, $uibModalInstance, item, Data) {

    if (item == 0) {
        item.id = 0;
    };
    $scope.product = angular.copy(item);
        
    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.id > 0) ? 'Edit Product' : 'Add Product';
    $scope.buttonText = (item.id > 0) ? 'Update Product' : 'Add New Product';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.product);
    }

    $scope.slider = {
      value: 'Good',
      options: {
        showTicksValues: true,
        stepsArray: [
            {value: 'No Need'},
            {value: 'Very Low'},
            {value: 'Refill'},
            {value: 'Good'},
            {value: 'New'}
        ]
      }
    };

    $scope.saveProduct = function (product) {
        product.uid = $scope.uid;
        if(product.id > 0){
            Data.put('product/'+product.id, product).then(function (result) {
                if(result.status != 'error'){
                    var x = angular.copy(product);
                    x.save = 'update';
                    $uibModalInstance.close(x);
                }else{
                    console.log(result);
                }
            });
        }else{
            Data.post('product/', product).then(function (result) {
                if(result.status != 'error'){
                    var x = angular.copy(product);
                    x.save = 'insert';
                    x.id = result.data;
                    $uibModalInstance.close(x);
                }else{
                    console.log(result);
                }
            });
        }
    };
});

