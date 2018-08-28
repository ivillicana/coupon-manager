$(function(){
  attachEventListeners();
})


function loadCoupons() {
  $.get('/coupons', (coupons) => {
    var couponsHTML = HandlebarsTemplates['coupons_template'](coupons)
    $('#display').html(couponsHTML)
    $('a.coupon-link').on('click', () => {debugger; loadCoupon(this)})
  })
  
}

function attachEventListeners() {
  $('#coupons-nav-button').on('click', function (e){
    e.preventDefault();
    loadCoupons();
  })
}