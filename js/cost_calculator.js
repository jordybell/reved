$(document).ready(function(){

function Cost_Calculator(){
    //SETTINGS
    var Sale = 'off'; //Turn sales 'on' or 'off'
    var SalePercent = 30; //Percentage off the price off (30 = 30%)

    var Finance = 'off'; //Finance 'on' or 'off'
    var FinancePercent = 0.2; //Percentage of finance (0.2 = 20%, 1 = 100%)
    var FinanceMonths = 12; // Number of months to spread the finance
    var FinanceThreshold = 650; //The threshold that enables finance (650 = £650)

    var DayPrice = 'off'; //Show daily price instead of total (divided by 365 days)

    var Currency = '$' //The currency icon displayed before all costings

    //This text is shown when the calculation has a blank data-value. This is usually they need to contact you for a price.
    var messageHTML = '<a href="#"><span style="font-size: 18px;">Please contact us for a price.</span></a>';


    //If you want to run any kind of javascript before or after calculation, place your code within the following function:
    function RunBeforeCalculate(){

    }

    function RunAfterCalculate(){
        //Code away!
    }

    //You can manipulate the cost by putting your own javascript in the function below. the variable "e" is the cost.
    function CostFilter(e){

        //Code away!

        return e; //don't remove this return
    }


    //===============================================================================//
    //=======Don't modify below this line, unless you know what you're doing!========//
    //===============================================================================//

    //Get elements ready
    $('.cost_calc_hide, #cost_calc_custom-data, #cost_calc_breakdown_container').hide();

    //Calculate function
    function calculate(){

        //Blank!
        var CalSaveInfo = [];
        $('#cost_calc_custom-data, #cost_calc_breakdown').html('');

        //Calculate total
        var calCost = 0;
        var calculate_class = '.cost_calc_calculate';
        $('.cost_calc_active').each(function() {

            if($(this).attr('data-show')){
                //Show hidden row
                var showRow = $(this).data('show').toString();

                if(showRow !== undefined){

                    if(showRow.indexOf(",") > -1){
                        var showArray = showRow.replace(' ','').split(',');

                        console.time('cache')
                        for(var i=0;i<showArray.length;i++){
                            if($(this).hasClass('cost_calc_active')){
                                $(calculate_class+'[data-row="' + showArray[i] + '"]').show();
                            }
                        }
                        console.timeEnd('cache');

                    } else {
                        $(calculate_class+'[data-row="' + showRow + '"]').show();
                    }
                }
            }

            //Calculation
            calCost = calCost + parseFloat($(this).data('value'));

            if(DayPrice == 'on'){
                var dailyAppend = ' (Total)';
            } else {
                var dailyAppend = '';
            }

            //Add to list
            var optionName = $(this).attr('value');
            var appendName = '<p id="cost_calc_breakdown_item">'+optionName+'</p>';

            var optionCost = $(this).attr('data-value');
            var appendCost = '<p id="cost_calc_breakdown_price">'+Currency+optionCost+dailyAppend+'</p>';

            var appendItem = appendName + appendCost;

            //hidden data
            var appendPush = ' d1 ' + optionName + ' d2 d3 ' + optionCost + ' d4 ';

            $('#cost_calc_breakdown').append(appendItem);

            CalSaveInfo.push(appendPush);

        });

        //Limit to 2 decimal places
        calCost = calCost.toFixed(2);

        //Hook on the cost
        calCost = CostFilter(calCost);

        var CustomData = '#cost_calc_custom-data';
        $.each(CalSaveInfo,function(i,v){
            $(CustomData).append(v);
        });


        //Update price
        if(isNaN(calCost)){
            $('#cost_calc_total_cost').html(messageHTML).css({'margin-top':'-30px'});
            $('#cost_calc_breakdown').hide();
        }
        else{
            //Sale price
            if(Sale == 'on'){
                var originalCalCost = calCost;
                var NewPercent = 100 - SalePercent;
                calCost = NewPercent/100 * calCost;
                calCost = parseFloat(calCost).toFixed(2);
                calCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                $('#cost_calc_breakdown').append('<p id="cost_calc_breakdown_item">Offer</p><p id="cost_calc_breakdown_price">'+SalePercent + '% Off</p>');
            }

            //Monthly cost
            var monthCost = calCost / FinanceMonths;
            var monthCost = Math.round(monthCost); //Round up
            var interestCost = monthCost * FinancePercent;
            var interestCost = Math.round(interestCost); //Round up
            var totalMonthCost = monthCost + interestCost;

            //Form Inject
            $('#cost_calc_price').val(calCost);

            if(DayPrice == 'on'){ //Day price
                var calCostDay = calCost / 365;
                var calCostDay = Math.round(calCostDay) - 0.1;
                $('#cost_calc_total_cost').html(Currency+calCostDay+'9 <span id="cost_calc_day_cost">a day / '+Currency+calCost+' (Total)</span>');
                }
            else {
                $('#cost_calc_total_cost').html(Currency+calCost); //Simple calculation
            }

            if(Sale == 'on'){
                $('#cost_calc_total_cost').append('&nbsp;<span id="cost_calc_original_price">'+Currency+originalCalCost+'</span>'); //Sale
            }

            if(Finance == 'on'){
                if(calCost > FinanceThreshold){
                    $('#cost_calc_total_cost').append('<div id="cost_calc_monthly"> or <strong>'+Currency+totalMonthCost+'</strong> a month (for '+FinanceMonths+' months)</div>'); //Finance
                    }
            }
            $('#cost_calc_total_cost').css({'margin-top':'0px'});
            $('#Calcu-SubHeading, #cost_calc_breakdown').show();
        }

    }

    //Calculate on click
    $('.cost_calc_calculate').click(function(){

        RunBeforeCalculate();

        if($(this).hasClass('single')){
            //Add cost_calc_active class
            var row = $(this).data('row');
            //Add class to this only
            $('.cost_calc_calculate').filter(function(){
                return $(this).data('row') == row;
            }).removeClass('cost_calc_active');
            $(this).addClass('cost_calc_active');
        } else {
            // Remove class if clicked
            if($(this).hasClass('cost_calc_active')){
                $(this).removeClass('cost_calc_active');
            } else {
               $(this).addClass('cost_calc_active');
            }
        }

        //Select item
        var selectItem = $(this).data('select');
        var currentItem = $('.cost_calc_calculate[data-id="' + selectItem + '"]');
        var currentRow = currentItem.data('row');

        if(selectItem !== undefined){
            if(!$('.cost_calc_calculate[data-row="' + currentRow + '"]').hasClass('cost_calc_active'))
            currentItem.addClass('cost_calc_active');
        }

        //Bring in totals & information
        $('#cost_calc_breakdown_container, #cost_calc_clear_calculation').fadeIn();
        $('.cost_calc_hide').hide();
        $('.cost_calc_calculate').each(function(){
            if($(this).is(':hidden')){
                $(this).removeClass('cost_calc_active');
            }
        calculate();
        });

        RunAfterCalculate();
        return true;
    });

    $('#cost_calc_clear_calculation').click(function(){
        $('.cost_calc_active').removeClass('cost_calc_active');
        RunBeforeCalculate();
        calculate();
        RunAfterCalculate();
        $('#cost_calc_breakdown').html('<p id="empty-breakdown">Nothing selected</p>');
        return true;
    });
}

//Run cost calculator
Cost_Calculator();
}); //end document ready.
