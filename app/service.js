app.service('recipeSvc', function () {

  var _recipe = {};

  return {
      getRecipe: function () {
          return _recipe;
      },
      setRecipe: function (value) {
          _recipe = value;
      }
  };
});

app.service('ingredientSvc', function () {

  var _ingredients = {};

  return {
      getIngredients: function () {
          return _ingredients;
      },
      setIngredients: function (value) {
          _ingredients = value;
      }
  };
});