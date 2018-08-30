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
    $('#new-coupon-link').on('click', function(e){
      e.preventDefault();
      newCouponForm();
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

function newCouponForm() {
  $.get('/coupons/new', function(form) {
    $('#display').html(form);
    $("#new_coupon").on('submit', function(e){
      e.preventDefault();
      createNewCoupon($(this).serialize());
    })
  })
}

function createNewCoupon(couponFormData){
  $.post('/coupons', couponFormData)
    .done(function (response){
      loadNewCoupon(response);
    })
}

function loadNewCoupon(coupon) {
  var couponHTML = HandlebarsTemplates['coupon_template'](coupon)
    $('#display').html(couponHTML);
    $('.store-link').on('click', function(e){
      e.preventDefault();
      loadStore(this);
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
    $('.store-coupons-link').on('click', function(e){
      previewStoreCoupons(this);
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

function previewStoreCoupons(store) {
  $.get(`/stores/${store.dataset.storeid}`, (storeData) => {
    var couponsHTML = HandlebarsTemplates['store_coupons_template'](storeData)
    $(`#store-coupons-${store.dataset.storeid}`).html(couponsHTML)
    addCouponLinkListener();
  })
}

function loadUserProfile(userLink) {
  $.get(`${userLink.href}`, function(user){
    var userHTML = HandlebarsTemplates['user_template'](user)
    $('#display').html(userHTML)
    addCouponLinkListener();
  })
}

function addCouponLinkListener() {
  $('.coupon-link').on('click', function(e){
    e.preventDefault();
    loadCoupon(this);
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
  $('#profile-nav-button').on('click', function(e){
    e.preventDefault();
    loadUserProfile(this);
  })
}
