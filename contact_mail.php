<?php
$allData = $_POST['allData'];
parse_str($allData, $unCon);

$to = 'jordybell@gmail.com';
$subject = $unCon['subject'];

$message = '<strong>Name : </strong>'.$unCon['Name'].'<br/><br/>';
$message = '<strong>Email : </strong>'.$unCon['email'].'<br/><br/>';
$message .= $unCon['textArea'].'<br/>';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= 'From: <'.$unCon['email'].'>' . "\r\n";

mail($to,$subject,$message,$headers);
echo 1;
