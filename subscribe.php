<?php
/*
 *  Subscription Email by Reverb Designs
 */

$from = $_POST['email'];
$to = 'jordybell@gmail.com';

$subject = 'Subscribetion Mail TopBiz';

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

$message = "<b>Subscriber:</b> ".$from;

$headers .= 'From: <'.$from.'>' . "\r\n";

mail($to,$subject,$message,$headers);
echo 1;
