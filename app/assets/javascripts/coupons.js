$(function(){
  attachEventListeners();
})


function loadCoupons() {
  $.get('/coupons', (coupons) => {
    var couponsHTML = HandlebarsTemplates['coupons_template'](coupons)
    $('#display').html(couponsHTML)
    $('.coupon-link').on('click', function(){
      loadCoupon(this)
    })
  })
}

function loadCoupon(coupon) {
  
}

function loadStores() {
  $.get('/stores', (stores) => {
    var storesHTML = HandlebarsTemplates['stores_template'](stores)
    $('#display').html(couponsHTML)
    $('.store-link').on('click', function(){
      loadStore(this)
    })
  })
}

function loadStore(store) {
  
}

function attachEventListeners() {
  $('#coupons-nav-button').on('click', function (e){
    e.preventDefault();
    loadCoupons();
  })
  $('#stores-nav-button').on('click', function (e){
    e.preventDefault();
    loadStores();
  })
}
