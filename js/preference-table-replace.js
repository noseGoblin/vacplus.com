//vp-cart.js
$(document).ready(function(){
  var itemsInCart = $('table.cart-table tr').length;
  var products = {
    image:[],
    name:[],
    qty:[],
    sku:[],
    remove:[],
    removecoupon:[],
    price:[],
    total:[],
    pulldown:[]
  }

  for(i = 0; i < itemsInCart; i++){//grab the info of the products in cart
    var loc=i+2;
    var productImage = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_image > a').parent().html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_image > a').parent().remove();
    var productName = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_name > a').parent().html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_name > a').parent().remove();
    var productQty = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_quantity > input').parent().html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_quantity > input').parent().remove();
    var productSku = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_sku').html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_sku').remove();
    var productPrice = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_price').html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_price').remove();
    var productTotal = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_total').html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_total').remove();
    var productRemove = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td > span.icon-bin').html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td > span.icon-bin').parent().remove();
    loc++;
    var productPulldown = $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_op').parent().html();
    $('#cart-table-wrpr > div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_op').remove();

    if(productPulldown !== undefined){
      products.pulldown.push(productPulldown);
    }else{
      products.pulldown.push('none');
    }

    if(productName !== undefined){
      products.image[i] = productImage;
      products.name[i] = productName;
      products.qty[i] = productQty;
      products.sku[i] = productSku;
      products.price[i] = productPrice;
      products.total[i] = productTotal;
      products.remove[i] = productRemove;
    }else{
      products.removecoupon[i] = productRemove;
    }
  }

  for(i = 0; i < itemsInCart; i++){ //spit back out products in cart
    spewimg = products.image[i];
    spewname = products.name[i];
    spewqty = products.qty[i];
    spewsku = products.sku[i];
    spewpriceea = products.price[i];
    spewpricetotal = products.total[i];
    spewremove = products.remove[i];
    spewpulldown = products.pulldown[i];

    if(spewname !== undefined){
      $('.loop-items-wrap').append('</span><div class="cart-product clearfix" style="border:1px solid #adadad; position:relative;padding:10px; margin-bottom:10px;"><span class="icon-remove" style="position:absolute; top:3px; right:3px;">'+spewremove+'</span><div class="cart-item-img col-lg-3 col-md-3 col-sm-3 col-xs-12">'+spewimg+'</div><div class="cart-item-mid col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="cart-item-name col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding:10px 0; font-weight:bold;">'+spewname+'</div><div class="cart-item-qty-sku col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="cart-item-qty col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding:10px 0;">Qty: '+spewqty+' <a href="#" onclick="Recalc()" class="update-cart-btn" style="color:#148eff; text-decoration:underline;">Update</a></div><div class="cart-item-sku col-lg-6 col-md-6 col-sm-6 col-xs-12">SKU: '+spewsku+'</div></div></div><div class="cart-item-totals col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-bottom:10px;"><div class="cart-item-each col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding:10px 0;">Each: <span>'+spewpriceea+'</span></div><div class="cart-item-sum col-lg-12 col-md-12 col-sm-12 col-xs-12">Total: <span style="color:#148eff; font-weight:bold;">'+spewpricetotal+'</span></div></div><div id="pulldown-'+i+'" style="clear:both; padding:10px 0 0 0; border-top:1px solid #adadad;"></div></div>');
      if(spewpulldown !== 'none'){
        $('#pulldown-'+i).append(spewpulldown);
      }else{}
    }else{
    }
  }
  //remove product functionality
  $('td.cart_op, div.apply-coupon-btn').before('<br>');

  //grab applied coupon
  if($('td.cart_cp_image').length>0){
    var cpName = $('td.cart_cp_name').html();
    var cpApplied = $('td.cart_cp_quantity').html();
    var cpTotal = $('td.cart_cp_total').html();
    var cpRemoveLoc = products.remove.length;
    var cpRemove = products.removecoupon;

    $('td.cart_cp_image').parent().remove();
    $('div.coupons-message > div.coupon-name').append(cpName);
    $('div.coupons-message > div.coupon-applied').append(cpApplied);
    $('div.coupons-message > div.coupon-total').append(cpTotal);
    $('div.coupons-message > div.coupon-remove').append(cpRemove);
    $('div.coupons-message').css('display','block');
  }
  //$('div.coupon-remove input').attr({src:"",value:"Remove coupon",id:"remove-cp-btn"});
})

function Recalc(){
  $('#Recalculate').click();
}










//vp-cart-shipping.js
$(document).ready(function(){
  var itemsInCart = $('div.nein table.cart tr').length;
  var products = {
    image:[],
    name:[],
    qty:[],
    sku:[],
    remove:[],
    price:[],
    total:[],
    pulldown:[]
  }

  for(i = 0; i < itemsInCart; i++){//grab the info of the products in cart
    var loc=i+2;
    var productImage = $('div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_image').html();
    //$('div.nein > table > tbody > tr:nth-child('+i+') > td.cart_image > a').parent().remove();
    var productName = $('div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_name').html();
    //$('div.nein > table > tbody > tr:nth-child('+i+') > td.cart_name > a').parent().remove();
    var productQty = $('div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_quantity').html();
    //$('div.nein > table > tbody > tr:nth-child('+i+') > td.cart_quantity > input').parent().remove();
    var productSku = $('div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_sku').html();
    //$('div.nein > table > tbody > tr:nth-child('+i+') > td.cart_sku').remove();
    var productPrice = $('div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_price').html();
    //$('div.nein > table > tbody > tr:nth-child('+i+') > td.cart_price').remove();
    var productTotal = $('div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_total').html();
    //$('div.nein > table > tbody > tr:nth-child('+i+') > td.cart_total').remove();
    loc++;
    var productPulldown = $('div.nein > table > tbody > tr:nth-child('+loc+') > td.cart_op').parent().html();
    //$('div.nein > table > tbody > tr:nth-child('+i+') > td.cart_op').remove();

    if(productPulldown !== undefined){
      products.pulldown.push(productPulldown);
    }else{
      products.pulldown.push('none');
    }

    if(productName !== undefined){
      products.image[i] = productImage;
      products.name[i] = productName;
      products.qty[i] = productQty;
      products.sku[i] = productSku;
      products.price[i] = productPrice;
      products.total[i] = productTotal;
    }else{
    }
  }

  for(i = 0; i < itemsInCart; i++){ //spit back out products in cart
    spewimg = products.image[i];
    spewname = products.name[i];
    spewqty = products.qty[i];
    spewsku = products.sku[i];
    spewpriceea = products.price[i];
    spewpricetotal = products.total[i];
    spewpulldown = products.pulldown[i];

    if(spewname !== undefined){
      $('.loop-items-wrap').append('</span><div class="cart-product clearfix" style="border:1px solid #adadad; position:relative;padding:10px; margin-bottom:10px;"><div class="cart-item-img col-lg-3 col-md-3 col-sm-3 col-xs-12">'+spewimg+'</div><div class="cart-item-mid col-lg-6 col-md-6 col-sm-6 col-xs-12"><div class="cart-item-name col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding:10px 0; font-weight:bold;">'+spewname+'</div><div class="cart-item-qty-sku col-lg-12 col-md-12 col-sm-12 col-xs-12"><div class="cart-item-qty col-lg-6 col-md-6 col-sm-6 col-xs-12" style="padding:10px 0;">Qty: '+spewqty+'</div><div class="cart-item-sku col-lg-6 col-md-6 col-sm-6 col-xs-12">SKU: '+spewsku+'</div></div></div><div class="cart-item-totals col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-bottom:10px;"><div class="cart-item-each col-lg-12 col-md-12 col-sm-12 col-xs-12" style="padding:10px 0;">Each: <span>'+spewpriceea+'</span></div><div class="cart-item-sum col-lg-12 col-md-12 col-sm-12 col-xs-12">Total: <span style="color:#148eff; font-weight:bold;">'+spewpricetotal+'</span></div></div><div id="pulldown-'+i+'" style="clear:both; padding:10px 0 0 0; border-top:1px solid #adadad;"></div></div>');
      if(spewpulldown !== 'none'){
        $('#pulldown-'+i).append(spewpulldown);
      }else{}
    }else{
    }
  }
  //remove product functionality
  $('td.cart_op').before('<br>');
  //thank you page table remover
  if($('span#thankyoupage').length!==0){
    billItems=$('table.bill_addr').detach();
    shipItems=$('table.ship_addr').detach();
    $('#bill-attch').append(billItems);
    $('#ship-attch').append(shipItems);
  }
  //grab billing/shipping info from table
  var billemail = $('table.bill_addr input[name="Email"]').detach();
  var billemail2 = $('table.bill_addr input[name="email_again"]').detach();
  var billfirst = $('table.bill_addr input[name="First"]').detach();
  var billlast = $('table.bill_addr input[name="Last"]').detach();
  var billcompany = $('table.bill_addr input[name="Company"]').detach();
  var billaddr1 = $('table.bill_addr input[name="Address"]').detach();
  var billaddr2 = $('table.bill_addr input[name="Address2"]').detach();
  var billcity = $('table.bill_addr input[name="City"]').detach();
  var billstate = $('table.bill_addr select[name="State"]').detach();
  var billzip = $('table.bill_addr input[name="Zip"]').detach();
  var billcountry = $('table.bill_addr select[name="Country"]').detach();
  var billphone = $('table.bill_addr input[name="Phone"]').detach();

  $('.bill-email').append(billemail);
  $('.bill-email-again').append(billemail2);
  $('.bill-first-name').append(billfirst);
  $('.bill-last-name').append(billlast);
  $('.bill-company').append(billcompany);
  $('.bill-addr1').append(billaddr1);
  $('.bill-addr2').append(billaddr2);
  $('.bill-city').append(billcity);
  $('.bill-state').append(billstate);
  $('.bill-zip').append(billzip);
  $('.bill-country').append(billcountry);
  $('.bill-phone').append(billphone);

  var shipfirst = $('table.ship_addr input[name="ShipFirst"]').detach();
  var shiplast = $('table.ship_addr input[name="ShipLast"]').detach();
  var shipcompany = $('table.ship_addr input[name="ShipCompany"]').detach();
  var shipaddr1 = $('table.ship_addr input[name="ShipAddress"]').detach();
  var shipaddr2 = $('table.ship_addr input[name="ShipAddress2"]').detach();
  var shipcity = $('table.ship_addr input[name="ShipCity"]').detach();
  var shipstate = $('table.ship_addr select[name="ShipState"]').detach();
  var shipzip = $('table.ship_addr input[name="ShipZip"]').detach();
  var shipcountry = $('table.ship_addr select[name="ShipCountry"]').detach();
  var shipphone = $('table.ship_addr input[name="ShipPhone"]').detach();
  var sameinfochck = $('td.ship_check').detach();

  $('.ship-first-name').append(shipfirst);
  $('.ship-last-name').append(shiplast);
  $('.ship-company').append(shipcompany);
  $('.ship-addr1').append(shipaddr1);
  $('.ship-addr2').append(shipaddr2);
  $('.ship-city').append(shipcity);
  $('.ship-state').append(shipstate);
  $('.ship-zip').append(shipzip);
  $('.ship-country').append(shipcountry);
  $('.ship-phone').append(shipphone);
  $('.ship-bill-chckbx').append(sameinfochck);
})