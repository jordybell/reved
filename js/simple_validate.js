//Simple Validate
//Copyright 2014©

//==============Form Validator============//
function simple_form_validator(message, email_message, phone_message, radio_message, checkbox_message, min_phone, max_phone){
	
//OPTIONS
	//If you don't like using the classes given to enable validation on a form item, feel free to change the classes below.	
	//=============================================================================						
		//message_class
			var validate_message_class = 'SV_validate_form_message';
				
		//submit_button_class
			var validate_submit_class = 'SV_submit_form';
			
		//input_class
			var validate_item_class = 'SV_validate';
	
		//email_class
			var validate_email = 'SV_validate_email';
				
		//phone_class
			var validate_phone = 'SV_validate_phone';
		
		//radio_button
			var validate_radio = 'SV_validate_radio';
			
		//radio_button
			var validate_checkbox = 'SV_validate_checkbox';
	//=============================================================================		
	//WARNING: Editing anything below this line may break Simple Validate from working.
//END OPTIONS
	
	
	
//The Variables.
	//message
	if(message == '' || message == null){
			var validatation_message = 'This field is required';
		} else {
			var validatation_message = message;
			}
			
	//Email message
	if(email_message == '' || email_message == null){
			var email_validatation_message = 'Please enter a valid email address';
		} else {
			var email_validatation_message = email_message;
			}
			
	//Phone message
	if(phone_message == '' || phone_message == null){
			var email_validatation_message = 'Please enter a valid phone number';
		} else {
			var phone_validatation_message = phone_message;
			}	
			
	//Radio message
	if(radio_message == '' || radio_message == null){
			var radio_validatation_message = 'Please select an option';
		} else {
			var radio_validatation_message = radio_message;
			}	
			
	//Select message
	if(checkbox_message == '' || checkbox_message == null){
			var checkbox_validatation_message = 'Please check an option';
		} else {
			var checkbox_validatation_message = checkbox_message;
			}
			
	//Min Phone
	if(min_phone == '' || min_phone == null){
			var min_phone_value = '7';
		} else {
			var min_phone_value = min_phone;
			}

//RegEx
	var email_filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var phone_filter = new RegExp("^\\d{"+min_phone+","+max_phone+"}$", "gi");
	
//Validation Counters
	var radio_validation_counter = 0;
	var checkbox_validation_counter = 0;
	
//Run validation on click.	
	$('.'+validate_submit_class).click(function () {
		var validation_counter = 0;
	
		//Remove any messages on click.
		$('.'+validate_message_class).remove();
		
//For each loops, input items
		//Standard input
		$('.'+validate_item_class).each(function(){
			if($(this).val() == "" || $(this).val() == null){
				$(this).after('<div class="'+validate_message_class+'">'+validatation_message+'</div>');
				validation_counter++
				} else {
					$(this).remove('.'+validate_message_class);
					}
		})
		
		//Email
		$('.'+validate_email).each(function(){
			if(email_filter.test($(this).val()) == false){
				$(this).after('<div class="'+validate_message_class+'">'+email_validatation_message+'</div>');
				validation_counter++
				} else {
					$(this).remove('.'+validate_message_class);
					}
		})
		
		//Phone
		$('.'+validate_phone).each(function(){
			if(phone_filter.test($(this).val()) == false){
				$(this).after('<div class="'+validate_message_class+'">'+phone_validatation_message+'</div>');
				validation_counter++
				} else {
					$(this).remove('.'+validate_message_class);
					}
		})
		
		//Radio
		$('.'+validate_radio).each(function(){
			if($(this).is(':checked')){
				radio_validation_counter++
				}
		})
		
		if(radio_validation_counter == 0){
				$('.'+validate_radio).last().after('<div class="'+validate_message_class+'">'+radio_validatation_message+'</div>');
				if($('.'+validate_radio).length > 0){ // only count if the element is actually set.
					validation_counter++
					}
		} else {
			$(this).remove('.'+validate_message_class);
			}
					
		//Checkbox
		$('.'+validate_checkbox).each(function(){
			if($(this).is(':checked')){
				checkbox_validation_counter++
				}
		})
		
		if(checkbox_validation_counter == 0){
				$('.'+validate_checkbox).last().after('<div class="'+validate_message_class+'">'+checkbox_validatation_message+'</div>');
				if($('.'+validate_checkbox).length > 0){ // only count if the element is actually set.
					validation_counter++
				}
		} else {
			$(this).remove('.'+validate_message_class);
			}
		
//Return false if all required field are not complete.
		if(validation_counter > 0){
			return false;
			};
	})
}