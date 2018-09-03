$(document).on('turbolinks:load', function() {
  attachEventListeners();
  var couponsJSONObjects;
  $.get('/coupons').done((data) => {couponsJSONObjects = data})
});


function loadCoupons(data = null) {
  //the data argument can include form data from the sort/filter options that are rendered
  if (data){
    var form = data;
  } else {
    var form = $(this).serialize();
  }

  //get unsorted json representation of coupons
  $.get('/coupons', form)
    .done(function(coupons){
      couponsJSONObjects = coupons;
      var couponsListHTML = HandlebarsTemplates['coupons_template'](coupons)
      //get sort coupons form
      $.get('/coupons/sort_form', function(formHTML) {
        $('#display').html(formHTML + couponsListHTML);
        $('#sort-coupons').on('submit', function (e){
          e.preventDefault();
          loadCoupons($(this).serialize());
        })
        addCouponLinkListener();
        $('#new-coupon-link').on('click', function(e){
          e.preventDefault();
          newCouponForm();
        })
      })
    })
}

function loadCoupon(coupon) {
  $.get(`/coupons/${coupon.dataset.couponid}`, (data) => {
    var couponHTML = HandlebarsTemplates['coupon_template'](data)
    $('#display').html(couponHTML);
    addStoreLinkListener();
    $('#update-coupon').on('click', function(e){
      e.preventDefault();
      updateCouponForm(this);
    })
    $('#next-coupon').on('click', function(e){
      var currentCouponId = parseInt(this.dataset.couponid);
      var foundCoupon = couponsJSONObjects.find(function(element) {
        return element.id === currentCouponId;
      });
      var idx = couponsJSONObjects.indexOf(foundCoupon)
      if (idx < couponsJSONObjects.length - 1) { 
        loadNextCoupon(couponsJSONObjects[idx+1]);
      } else {
        alert("No other coupons")
      }
    })
  })
}

function loadNextCoupon(coupon) {
    var couponHTML = HandlebarsTemplates['coupon_template'](coupon)
    $('#display').html(couponHTML);
    addStoreLinkListener();
    $('#update-coupon').on('click', function(e){
      e.preventDefault();
      updateCouponForm(this);
    })
    $('#next-coupon').on('click', function(e){
      var currentCouponId = parseInt(this.dataset.couponid);
      var foundCoupon = couponsJSONObjects.find(function(element) {
        return element.id === currentCouponId;
      });
      var idx = couponsJSONObjects.indexOf(foundCoupon)
      if (idx < couponsJSONObjects.length - 1) { 
        loadNextCoupon(couponsJSONObjects[idx+1]);
      }
    })
}

function updateCouponForm(form) {
  $.get(`/coupons/${form.dataset.couponid}/edit`, function(response){
    $('#display').html(response);
    $(`#edit_coupon_${form.dataset.couponid}`).on('submit', function(e){
      e.preventDefault();
      $.ajax({
        url: this.action,
        data: $(this).serialize(),
        type: ($(`#edit_coupon_${form.dataset.couponid} input[name='_method']`).val() || this.method)
      })
      .done(function(data){
        var couponHTML = HandlebarsTemplates['coupon_template'](data)
        $('#display').html(couponHTML);
        addStoreLinkListener();
        $('#update-coupon').on('click', function(e){
          e.preventDefault();
          updateCouponForm(this);
        })
      })
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
    addStoreLinkListener();
}

function loadStores() {
  $.get('/stores', (stores) => {
    var storesHTML = HandlebarsTemplates['stores_template'](stores)
    $('#display').html(storesHTML)
    addStoreLinkListener();
    $('.store-coupons-link').on('click', function(e){
      previewStoreCoupons(this);
    })
  })
}

function loadStore(store) {
  $.get(`/stores/${store.dataset.storeid}`, (data) => {
    var storeHTML = HandlebarsTemplates['store_template'](data)
    $('#display').html(storeHTML);
    addCouponLinkListener();
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

function addStoreLinkListener(){
  $('.store-link').on('click', function(e){
    e.preventDefault();
    loadStore(this);
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
