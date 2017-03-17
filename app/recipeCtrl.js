app.controller('recipeCtrl', function ($scope, $uibModal, $filter, Data, recipeSvc) {
    $scope.recipe = {};
    Data.get('recipes').then(function(data){
        $scope.recipes = data.data;
    });

    $scope.slider = {
      value: '3',
      options: {
        stepsArray: ['1', '2', '3', '4', '5']
      }
    };

    $scope.setAlign = function (columnName) {
		if(columnName == "Rating") {
			return "text-align: center;";
		}
	};

    $scope.deleteRecipe = function(recipe){
        if(confirm("Are you sure you want to remove the recipe")){
            Data.delete("recipe/"+recipe.id).then(function(result){
                $scope.recipes = _.without($scope.recipes, _.findWhere($scope.recipes, {id:recipe.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $uibModal.open({
          templateUrl: 'partials/recipeEdit.html',
          controller: 'recipeEditCtrl',
          windowClass: 'app-modal-window',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.recipes.push(selectedObject);
                $scope.recipes = $filter('orderBy')($scope.recipes, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.name = selectedObject.name;
                p.description = selectedObject.description;
                p.image = selectedObject.image;
                p.rating = selectedObject.rating;
                p.glass = selectedObject.glass;
                p.instructions = selectedObject.instructions;
                p.ing1 = selectedObject.ing1;
                p.ing2 = selectedObject.ing2;
                p.ing3 = selectedObject.ing3;
                p.ing4 = selectedObject.ing4;
                p.ing5 = selectedObject.ing5;
                p.ing6 = selectedObject.ing6;
                p.ing7 = selectedObject.ing7;
                p.ing8 = selectedObject.ing8;
                p.ing9 = selectedObject.ing9;
                p.ing10 = selectedObject.ing10;
                p.ing11 = selectedObject.ing11;
                p.ing12 = selectedObject.ing12;
                p.ing13 = selectedObject.ing13;
                p.ing14 = selectedObject.ing14;
                p.ing15 = selectedObject.ing15;
            }
        });
    };
    
    $scope.columns = [
        {text:"ID",predicate:"id",sortable:true,dataType:"number"},
        {text:"Name",predicate:"name",sortable:true},
        {text:"Image",predicate:"image",sortable:true},
        {text:"Description",predicate:"description",sortable:true},
        {text:"Rating",predicate:"rating",sortable:true},
        {text:"Glass",predicate:"glass",sortable:true},
        {text:"Action",predicate:"action",sortable:true}
    ];

    $scope.glassList = [
        {value:"1",text:"images/beermug.jpg"},
        {value:"2",text:"images/brandysnifter.jpg"},
        {value:"3",text:"images/cocktail.jpg"},
        {value:"4",text:"images/cooler_faceted.jpg"},
        {value:"5",text:"images/cooler_tumbler.jpg"},
        {value:"6",text:"images/cordial_footed.jpg"},
        {value:"7",text:"images/cordial.jpg"},
        {value:"8",text:"images/cosmo.jpg"},
        {value:"9",text:"images/coupe.jpg"},
        {value:"10",text:"images/flute.jpg"},
        {value:"11",text:"images/goblet_banquet.jpg"},
        {value:"12",text:"images/goblet_teardrop.jpg"},
        {value:"13",text:"images/goblet.jpg"},
        {value:"14",text:"images/highball_footed.jpg"},
        {value:"15",text:"images/highball_tumbler.jpg"},
        {value:"16",text:"images/hurricane.jpg"},
        {value:"17",text:"images/icetea_double.jpg"},
        {value:"18",text:"images/icetea_footed.jpg"},
        {value:"19",text:"images/icetea_tumbler.jpg"},
        {value:"20",text:"images/irishcoffee_footed.jpg"},
        {value:"21",text:"images/irishcoffee.jpg"},
        {value:"22",text:"images/margarita.jpg"},
        {value:"23",text:"images/pilsner_footed.jpg"},
        {value:"24",text:"images/pilsner_weisen.jpg"},
        {value:"25",text:"images/pilsner.jpg"},
        {value:"26",text:"images/pint_mixing.jpg"},
        {value:"27",text:"images/pint_pub.jpg"},
        {value:"28",text:"images/pitcher.jpg"},
        {value:"29",text:"images/pocogrande.jpg"},
        {value:"30",text:"images/rocks_double.jpg"},
        {value:"31",text:"images/rocks_footed.jpg"},
        {value:"32",text:"images/rocks.jpg"},
        {value:"33",text:"images/sherry.jpg"},
        {value:"34",text:"images/shooters_double.jpg"},
        {value:"35",text:"images/shooters.jpg"},
        {value:"36",text:"images/shot_marked.jpg"},
        {value:"37",text:"images/shot.jpg"},
        {value:"38",text:"images/tumbler.jpg"},
        {value:"39",text:"images/wine_grande.jpg"},
        {value:"40",text:"images/wine_red.jpg"},
        {value:"41",text:"images/wine_standard.jpg"},
        {value:"42",text:"images/wine_white.jpg"},
        {value:"43",text:"images/zombie.jpg"}
    ];

    $scope.findGlass = function(c) {
        document.getElementById("glass_" + c.id).src = $scope.glassList.find(x => x.value === c.glass.toString()).text;        
    };
});

app.controller('recipeEditCtrl', function ($scope, $uibModal, $uibModalInstance, item, Data, recipeSvc, ingredientSvc, Upload) {

    recipeSvc.setRecipe(item);
    $scope.recipe = recipeSvc.getRecipe();

    ingredientSvc.setIngredients($scope.showIngredients);
        
    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };
    $scope.title = (item.id > 0) ? 'Edit Recipe' : 'Add Recipe';
    $scope.buttonText = (item.id > 0) ? 'Update Recipe' : 'Add New Recipe';

    $scope.showIngredients = [
        {value:"1",show : true},
        {value:"2",show : true},
        {value:"3",show : false},
        {value:"4",show : false},
        {value:"5",show : false},
        {value:"6",show : false},
        {value:"7",show : false},
        {value:"8",show : false},
        {value:"9",show : false},
        {value:"10",show : false},
        {value:"11",show : false},
        {value:"12",show : false},
        {value:"13",show : false},
        {value:"14",show : false},
        {value:"15",show : false}
        
    ];

    $scope.updateShowIngredients = function(index, data) {
        $scope.showIngredients[index - 1].show = data;
        ingredientSvc.setIngredients($scope.showIngredients);
        $scope.showIngredients = ingredientSvc.getIngredients();
    };

    $scope.listIngredients = function(addingOne) {
        $scope.IngredientCount = 0;
        // a cocktail is always 2 ingredients
        if ($scope.recipe.ing1 != null) { $scope.IngredientCount += 1;}
        if ($scope.recipe.ing2 != null) { $scope.IngredientCount += 1;}
        // add more if they exist
        if ($scope.recipe.ing3 != null) { $scope.updateShowIngredients(3,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing4 != null) { $scope.updateShowIngredients(4,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing5 != null) { $scope.updateShowIngredients(5,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing6 != null) { $scope.updateShowIngredients(6,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing7 != null) { $scope.updateShowIngredients(7,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing8 != null) { $scope.updateShowIngredients(8,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing9 != null) { $scope.updateShowIngredients(9,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing10 != null) { $scope.updateShowIngredients(10,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing11 != null) { $scope.updateShowIngredients(11,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing12 != null) { $scope.updateShowIngredients(12,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing13 != null) { $scope.updateShowIngredients(13,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing14 != null) { $scope.updateShowIngredients(14,true); $scope.IngredientCount += 1;}
        if ($scope.recipe.ing15 != null) { $scope.updateShowIngredients(15,true); $scope.IngredientCount += 1;}
        if (addingOne == true) {
            $scope.IngredientCount += 1;
            // To enable the current list of, and the next new ingredient
            if ($scope.IngredientCount == 3) {$scope.updateShowIngredients(3,true);}
            if ($scope.IngredientCount == 4) {$scope.updateShowIngredients(4,true);}
            if ($scope.IngredientCount == 5) {$scope.updateShowIngredients(5,true);}
            if ($scope.IngredientCount == 6) {$scope.updateShowIngredients(6,true);}
            if ($scope.IngredientCount == 7) {$scope.updateShowIngredients(7,true);}
            if ($scope.IngredientCount == 8) {$scope.updateShowIngredients(8,true);}
            if ($scope.IngredientCount == 9) {$scope.updateShowIngredients(9,true);}
            if ($scope.IngredientCount == 10) {$scope.updateShowIngredients(10,true);}
            if ($scope.IngredientCount == 11) {$scope.updateShowIngredients(11,true);}
            if ($scope.IngredientCount == 12) {$scope.updateShowIngredients(12,true);}
            if ($scope.IngredientCount == 13) {$scope.updateShowIngredients(13,true);}
            if ($scope.IngredientCount == 14) {$scope.updateShowIngredients(14,true);}
            if ($scope.IngredientCount == 15) {$scope.updateShowIngredients(15,true);}
        }
    };

    $scope.listIngredients(false);

    $scope.hideIngredient = function(index) {
        $scope.updateShowIngredients(index, false);
        $scope.ingredientCount -= 1;  // ing_ + index
        document.getElementByName("ing" + index).text = null;
    };

    $scope.shouldIngredientBeShown = function(index) {
        var show = $scope.showIngredients.find(x => x.value === index.toString()).show;
        return show;
    }

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.recipe);
    }

    $scope.slider = {
      value: '3',
      options: {
        showTicksValues: true,
        stepsArray: [
            {value: '1'},
            {value: '2'},
            {value: '3'},
            {value: '4'},
            {value: '5'}
        ]
      }
    };

    $scope.glassList = [
        {value:"1",text:"images/beermug.jpg"},
        {value:"2",text:"images/brandysnifter.jpg"},
        {value:"3",text:"images/cocktail.jpg"},
        {value:"4",text:"images/cooler_faceted.jpg"},
        {value:"5",text:"images/cooler_tumbler.jpg"},
        {value:"6",text:"images/cordial_footed.jpg"},
        {value:"7",text:"images/cordial.jpg"},
        {value:"8",text:"images/cosmo.jpg"},
        {value:"9",text:"images/coupe.jpg"},
        {value:"10",text:"images/flute.jpg"},
        {value:"11",text:"images/goblet_banquet.jpg"},
        {value:"12",text:"images/goblet_teardrop.jpg"},
        {value:"13",text:"images/goblet.jpg"},
        {value:"14",text:"images/highball_footed.jpg"},
        {value:"15",text:"images/highball_tumbler.jpg"},
        {value:"16",text:"images/hurricane.jpg"},
        {value:"17",text:"images/icetea_double.jpg"},
        {value:"18",text:"images/icetea_footed.jpg"},
        {value:"19",text:"images/icetea_tumbler.jpg"},
        {value:"20",text:"images/irishcoffee_footed.jpg"},
        {value:"21",text:"images/irishcoffee.jpg"},
        {value:"22",text:"images/margarita.jpg"},
        {value:"23",text:"images/pilsner_footed.jpg"},
        {value:"24",text:"images/pilsner_weisen.jpg"},
        {value:"25",text:"images/pilsner.jpg"},
        {value:"26",text:"images/pint_mixing.jpg"},
        {value:"27",text:"images/pint_pub.jpg"},
        {value:"28",text:"images/pitcher.jpg"},
        {value:"29",text:"images/pocogrande.jpg"},
        {value:"30",text:"images/rocks_double.jpg"},
        {value:"31",text:"images/rocks_footed.jpg"},
        {value:"32",text:"images/rocks.jpg"},
        {value:"33",text:"images/sherry.jpg"},
        {value:"34",text:"images/shooters_double.jpg"},
        {value:"35",text:"images/shooters.jpg"},
        {value:"36",text:"images/shot_marked.jpg"},
        {value:"37",text:"images/shot.jpg"},
        {value:"38",text:"images/tumbler.jpg"},
        {value:"39",text:"images/wine_grande.jpg"},
        {value:"40",text:"images/wine_red.jpg"},
        {value:"41",text:"images/wine_standard.jpg"},
        {value:"42",text:"images/wine_white.jpg"},
        {value:"43",text:"images/zombie.jpg"}
    ];

    $scope.findGlass = function(c) {
        var srcLink = $scope.glassList.find(x => x.value === c.glass.toString()).text;
        document.getElementById("glass_" + c.id).src = srcLink;
    };

    $scope.saveRecipe = function (recipe) {
        if ($scope.recipe_form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
        }
        recipe.uid = $scope.uid;
        if(recipe.id > 0){
            Data.put('recipe/'+recipe.id, recipe).then(function (result) {
                if(result.status != 'error'){
                    var x = angular.copy(recipe);
                    x.save = 'update';
                    $uibModalInstance.close(x);
                }else{
                    console.log(result);
                }
            });
        }else{
            Data.post('recipe/', recipe).then(function (result) {
                if(result.status != 'error'){
                    var x = angular.copy(recipe);
                    x.save = 'insert';
                    x.id = result.data;
                    $uibModalInstance.close(x);
                }else{
                    console.log(result);
                }
            });
        }
    };

    $scope.openGlass = function (p,size) {
        var newModalInstance = $uibModal.open({
          templateUrl: 'partials/glassEdit.html',
          controller: 'glassEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        }).closed.then(function() {
            $scope.recipe = recipeSvc.getRecipe();
            $scope.findGlass($scope.recipe);
        });
    };

    // $scope.upload = function (file) {
    //     Upload.upload({
    //         url: 'images/drinks',
    //         data: {file: file}
    //     }).then(function (resp) {
    //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    //     }, function (resp) {
    //         console.log('Error status: ' + resp.status);
    //     }, function (evt) {
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //     });
    // };

});

app.controller('glassEditCtrl', function ($scope, $uibModalInstance, item, Data, recipeSvc) {

    $scope.glass = angular.copy(item);

    var original = item;
    $scope.isClean = function() {
        return angular.equals(original, $scope.glass);
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('Close');
    };

    $scope.select = function (id) {
        $scope.recipe = recipeSvc.getRecipe();
        $scope.recipe.glass = id;
        recipeSvc.setRecipe($scope.recipe);
        $uibModalInstance.dismiss('Close');
    };

});