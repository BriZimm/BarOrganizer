app.controller('ingredientCtrl', function ($scope, $uibModal, $filter, Data) {
    $scope.ingredient = {};
    Data.get('ingredients').then(function(data){
        $scope.ingredients = data.data;
    });
    $scope.deleteIngredient = function(ingredient){
        if(confirm("Are you sure you want to remove the ingredient")){
            Data.delete("ingredient/"+ingredient.id).then(function(result){
                $scope.ingredients = _.without($scope.ingredients, _.findWhere($scope.ingredients, {id:ingredient.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'partials/ingredientEdit.html',
          controller: 'ingredientEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.opened.then(
            $timeout(function() {
                console.log('OPENED!');
            }, delay));
            // var amountObj = document.getElementById('ingAmount');
            // amountObj.selected = $scop.amount;
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.ingredients.push(selectedObject);
                $scope.ingredients = $filter('orderBy')($scope.ingredients, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.amount = selectedObject.amount;
                p.name = selectedObject.name;
            }
        });
    };
    
    $scope.columns = [
        {text:"ID",predicate:"id",sortable:true,dataType:"number"},
        {text:"Amount",predicate:"amount",sortable:true},
        {text:"Ingredient Name",predicate:"name",sortable:true},
        {text:"Action",predicate:"action",sortable:false},
    ];
});


app.controller('ingredientEditCtrl', function ($scope, $uibModalInstance, item, Data) {

    $scope.ingredient = angular.copy(item);
        
    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.id > 0) ? 'Edit Ingredient' : 'Add Ingredient';
    $scope.buttonText = (item.id > 0) ? 'Update Ingredient' : 'Add New Ingredient';

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.ingredient);
    }

    $scope.ingredientSizes = [
        {id:"0", text:"Dash (1/32 oz)"},
        {id:"1", text:"Barspoon (1/8 oz)"},
        {id:"2", text:"Tablespoon (3/8 oz)"},
        {id:"3", text:"1/4 oz"},
        {id:"4", text:"1/2 oz"},
        {id:"5", text:"3/4 oz"},
        {id:"6", text:"1 oz (Pony)"},
        {id:"7", text:"1.5 oz (Jigger)"},
        {id:"8", text:"2.0 oz"},
        {id:"9", text:"Half"},
        {id:"10", text:"1/2 Cup"},
        {id:"11", text:"1 Cup"},
        {id:"12", text:"1"},
        {id:"13", text:"2"},
        {id:"14", text:"3"}
    ];

    $scope.saveIngredient = function (ingredient) {
        ingredient.uid = $scope.uid;
        if(ingredient.id > 0){
            Data.put('ingredient/'+ingredient.id, ingredient).then(function (result) {
                if(result.status != 'error'){
                    var x = angular.copy(ingredient);
                    x.save = 'update';
                    $uibModalInstance.close(x);
                }else{
                    console.log(result);
                }
            });
        }else{
            Data.post('ingredient/', ingredient).then(function (result) {
                if(result.status != 'error'){
                    var x = angular.copy(ingredient);
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