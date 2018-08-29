$(document).on('turbolinks:load', function() {
  attachEventListeners();
});


function loadCoupons() {
  $.get('/coupons', (coupons) => {
    var couponsHTML = HandlebarsTemplates['coupons_template'](coupons)
    $('#display').html(couponsHTML)
    $('.coupon-link').on('click', function(e){
      e.preventDefault();
      loadCoupon(this);
    })
  })
}

function loadCoupon(coupon) {
  $.get(`/coupons/${coupon.dataset.couponid}`, (data) => {
    var couponHTML = HandlebarsTemplates['coupon_template'](data)
    $('#display').html(couponHTML);
    $('.store-link').on('click', function(e){
      e.preventDefault();
      loadStore(this);
    })
  })
}

function loadStores() {
  $.get('/stores', (stores) => {
    var storesHTML = HandlebarsTemplates['stores_template'](stores)
    $('#display').html(storesHTML)
    $('.store-link').on('click', function(e){
      e.preventDefault();
      loadStore(this);
    })
  })
}

function loadStore(store) {
  $.get(`/stores/${store.dataset.storeid}`, (data) => {
    var storeHTML = HandlebarsTemplates['store_template'](data)
    $('#display').html(storeHTML);
    $('.coupon-link').on('click', function(e){
      e.preventDefault();
      loadCoupon(this);
    })
  })
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
