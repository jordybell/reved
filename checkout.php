<!doctype html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Reverb Quote Proccessing</title>
  <link rel="stylesheet" type="text/css" href="css/bootstrap2.css"/>
  <link rel="stylesheet" type="text/css" href="css/preset2.css"/>
    <!--Validator (optional)-->
	<script src="js-assets/jquery-1.11.2.min.js"></script>
    <script src="js-assets/simple_validate.js"></script>

    <script>
    $(document).ready(function() {
        simple_form_validator (
        'This field is required.', 					//Standard input message (.validate)
        'Your email address is required.',  		//Email input message (.validate_email)
        'Your phone number is required.', 			//Phone number message (.validate_phone)
        'Please select an answer.', 				//Radio box message (.validate_radio)
        'Please accept the terms and condtions.',   //Checkbox message (.validate_checkbox)
        '10', 										//Minimum amount of digitals required for phone number
        '12' 										//Maximum amount of digitals required for phone number

        //Please note, to style the required messages, just add your CSS to the class "validate_form_message".
        );
    });
    </script>
    <!--/Validator-->

	<link href='default-styles.css' type="text/css" rel="stylesheet">

</head>
<body>

<?php
    //Price
    $full_cost = $_POST['cost_calc_price'];

    //Build breakdown
    $breakdown = $_POST['cost_calc_cost_data'];
    $breakdown = str_replace('d1','<li class="cost_calc_item_name">',$breakdown);
    $breakdown = str_replace('d2','</li>',$breakdown);
    $breakdown = str_replace('d3','<li class="cost_calc_item_price">&#36;',$breakdown);
    $breakdown = str_replace('d4','</li>',$breakdown);

    //Build description
    $description = $_POST['cost_calc_cost_data'];
    $description = str_replace('d1','',$description);
    $description = str_replace('d2','',$description);
    $description = str_replace('d3','- ',$description);
    $description = str_replace('d4',' | ',$description);
?>

<div class='cost_calc_quote_summary clearfix'>
    <h2 style="text-align:center;padding-bottom:30px;">Cost Breakdown</h2>
    <div class="lineThree"></div>
    <div class="firsOderList" style=:padding-left:35px;">
      <?php echo $breakdown; ?>
    </div>
    <div class='cost_calc_breakdown_total'><h3 style="color:#616dd7;">Total: &#36;<?php echo $full_cost; ?></h3></div>
</div>

<div class='cost_calc_checkout_form clearfix'>
    <h2 style="text-align:center;padding-bottom:30px;">Information</h2>
    <div class="lineOne" style="padding-bottom:10px;"></div>

    <!--Start Form-->
    <form ACTION="https://www.paypal.com/cgi-bin/webscr" METHOD="POST" target="_parent" id='cost_calc_paypal_form'>

        <!--Hidden fields-->
        <input TYPE="hidden" NAME="business" VALUE="jordan@reverbdesigns.com"> <!--Paypal business email-->
        <input TYPE="hidden" NAME="undefined_quantity" VALUE="1">  <!--Quantity-->
        <input TYPE="hidden" NAME="item_name" VALUE="<?php echo $description; ?>"> <!--Item Name (default php will give a description of the quote)-->
        <input TYPE="hidden" NAME="item_number" VALUE="0000CustomQuote"> <!--The items number-->

        <input TYPE="hidden" NAME="amount" VALUE="<?php echo $full_cost; ?>"> <!--Price (leave the php to pull in the calculated price)-->
        <input TYPE="hidden" NAME="currency_code" VALUE="USD"> <!--Currently (currently USD)-->

        <input TYPE="hidden" NAME="custom" VALUE="">

        <!--Paypal return URL and the message for the user to click once payment is completed-->
        <input type="hidden" value="https://reverbdesigns.com/order-complete.html" name="return">
        <input type="hidden" value="Click here to return back to the store" name="cbt">

        <input TYPE="hidden" NAME="cmd" VALUE="_xclick"> <!--Dont change unless you know what you're doing-->

        <!--Clients Information. Use the class 'validate' to make the field required-->
        <div class="cost_calc_form_information clearfix checkoutcon">
           <div class="pricingInner">
            <label>
                Email Address
                <input class="SV_validate_email" type="text" NAME="email" placeholder="Email Address">
            </label>

            <label>
                First Name
                <input class="SV_validate" type="text" NAME="first_name" placeholder="First Name">
            </label>

            <label>
                Last Name
                <input class="SV_validate" type="text" NAME="last_name" placeholder="Last Name">
            </label>

            <label>
                Phone Number
                <input class="SV_validate_phone" NAME="night_phone_a" type="text" placeholder="Phone Number">
            </label>

            <label>
                Address Line 1
                <input class="SV_validate" NAME="address1" type="text" placeholder="Address Line 1">
            </label>

            <label>
                Address Line 2
                <input class="SV_validate" NAME="address2" type="text" placeholder="Address Line 2">
            </label>

            <label>
                City
                <input class="SV_validate" NAME="city" type="text" placeholder="City">
            </label>

            <label>
                State
                <input class="SV_validate" NAME="state" type="text" placeholder="State">
            </label>

            <label>
                Zip (Postcode)
                <input class="SV_validate" NAME="zip" type="text" placeholder="Zip or Postcode">
            </label>

        </div>
      </div>
        <!--Summary-->
        <div class="cost_calc_summary clearfix">
            <label class="cost_calc_terms_checkbox">
                <input class="SV_validate_checkbox" type="checkbox">
                <p class="cost_calc_terms" style="padding-left:40px;margin-top:-7px;">
                By checking this box you agree to our <a href='https://reverbdesigns.com/terms.html'>Terms &amp; Conditions</a>
                </p>
            </label>
            <div class="cost_calc_total_cost_container" style="float:right;padding-left:40px;padding=top:15px;">
                <h4><span class="cost_calc_total_cost">Total&#x3a;&nbsp;</span>&dollar;<?php echo $full_cost; ?></h4>
            </div>
          <div class="lineFive"></div>
            <!--Submit Payment-->
            <input type="submit" NAME="submit" class="submit_form cost_calc_button" style="float:right;" value="PURCHASE">
        </div>
    </form>
    <!--End Form-->
</div>
  <div class="lineThree"></div>
</body>
</html>
