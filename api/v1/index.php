<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


// Products
$app->get('/products', function() { 
    global $db;
    $rows = $db->select("product","id,name,size,location,price,status,category,made_in,distillery,description",array());
    echoResponse(200, $rows);
});

$app->post('/product', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("product", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/product/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("product", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/product/:id', function($id) { 
    global $db;
    $rows = $db->delete("product", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});

// Ingredients
$app->get('/ingredients', function() { 
    global $db;
    $rows = $db->select("ingredient","id,amount,name",array());
    echoResponse(200, $rows);
});

$app->post('/ingredient', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("ingredient", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Ingredient added successfully.";
    echoResponse(200, $rows);
});

$app->put('/ingredient/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("ingredient", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Ingredient information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/ingredient/:id', function($id) { 
    global $db;
    $rows = $db->delete("ingredient", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Ingredient removed successfully.";
    echoResponse(200, $rows);
});

// Recipes
$app->get('/recipes', function() { 
    global $db;
    $rows = $db->select("recipe","id,name,description,image,rating,glass,ing1,ing2,ing3,
                        ing4,ing5,ing6,ing7,ing8,ing9,ing10,ing11,ing12,ing13,ing14,ing15",array());
    echoResponse(200, $rows);
});

$app->post('/recipe', function() use ($app) { 
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("recipe", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Recipe added successfully.";
    echoResponse(200, $rows);
});

$app->put('/recipe/:id', function($id) use ($app) { 
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("recipe", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Recipe information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/recipe/:id', function($id) { 
    global $db;
    $rows = $db->delete("ingredient", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Recipe removed successfully.";
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>