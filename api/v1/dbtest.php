<?php
# Fill our vars and run on cli
# $ php -f db-connect-test.php
$dbname = 'barinventory';
$dbuser = 'root';
$dbpass = 'R@1ders#1';
$dbhost = 'localhost';

$connect = mysqli_connect($dbhost, $dbuser, $dbpass) or die("Unable to Connect to '$dbhost'");
mysqli_select_db($connect, $dbname) or die("Could not open the db '$dbname'");
$test_query = "SHOW TABLES FROM $dbname";
$result = mysqli_query($connect, $test_query);

if (!$result) { // add this check.
    die('Invalid query: ' . mysql_error());
}

$tblCnt = 0;
while($tbl = mysqli_fetch_array($result)) {
  $tblCnt++;
  #echo $tbl[0]."<br />\n";
}
if (!$tblCnt) {
  echo "There are no tables<br />\n";
} else {
  echo "There are $tblCnt tables<br />\n";
}
?>