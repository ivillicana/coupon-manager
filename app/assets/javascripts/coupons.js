var couponsJSONObjects = [];
var userObject;

$(document).on('turbolinks:load', function() {
  attachEventListeners();
  $.get('/coupons').done((data) => {
    data.forEach( (coupon) => { 
      let newCoupon = new Coupon(coupon); 
      couponsJSONObjects.push(newCoupon); 
    })
  })
});

class Coupon {
  constructor(data) {
    this.id = data.id;
    this.couponCode = data.coupon_code;
    this.offerDescription = data.offer_description;
    this.item = data.item;
    this.expirationDate = data.expiration_date;
    this.storeName = data.store_name;
    this.expiresIn = data.expires_in;
    this.store = data.store;
  }

  formatCouponWithHandlebars() {
    return HandlebarsTemplates['coupon_template'](this)
  }

  displayCouponInWindow() {
    $('#display').html(this.formatCouponWithHandlebars())
  }

}

class Store {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.coupons = data.coupons;
  }

  formatStoreWithHandlebars() {
    return HandlebarsTemplates['store_templtate'](this)
  }

  displayStoreInWindow() {
    $('#display').html(this.formatStoreWithHandlebars())
  }

}

function loadCoupons(data = null) {
  //the data argument can include form data from the sort/filter options that are rendered
  if (data){
    var form = data;
  } else {
    var form = $(this).serialize();
  }
  $.get($('#profile-nav-button')[0].href).done((data) => {userObject = data})
  //get unsorted json representation of coupons
  $.get('/coupons', form)
    .done(function(coupons){
      couponsJSONObjects.length = 0;
      coupons.forEach( (coupon) => { 
        let newCoupon = new Coupon(coupon); 
        couponsJSONObjects.push(newCoupon); 
      })
      var couponsListHTML = HandlebarsTemplates['coupons_template'](couponsJSONObjects)
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

function loadCouponFromLink(couponLink) {
  $.get(`/coupons/${couponLink.dataset.couponid}`, (data) => {
    let couponObject = new Coupon(data);
    loadCoupon(couponObject);
  })
}

function loadCoupon(coupon) {
    coupon.displayCouponInWindow();
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
        loadCoupon(couponsJSONObjects[idx+1]);
      } else {
        $('#next-coupon').remove();
        alert("No other coupons")
      }
    })
    $('#previous-coupon').on('click', function(e){
      var currentCouponId = parseInt(this.dataset.couponid);
      var foundCoupon = couponsJSONObjects.find(function(element) {
        return element.id === currentCouponId;
      });
      var idx = couponsJSONObjects.indexOf(foundCoupon)
      if (idx > 0) { 
        loadCoupon(couponsJSONObjects[idx-1]);
      } else {
        $('#previous-coupon').remove();
        alert("No other coupons")
      }
    })

    $('#delete-from-profile').on('click', function(){
      deleteFromProfile(this);
    })

    $('#save-to-profile').on('click', function () {
      saveToProfile(this);
    })
}

function deleteFromProfile(couponButton) {
  $.ajax({
    url: `/coupons/${couponButton.dataset.couponid}/delete_from_profile`,
    type: 'POST'
  })
  .done(function(data) {
    $.get($('#profile-nav-button')[0].href).done((user) => {
      userObject = user
      loadCouponFromLink(couponButton);
    })
  })
}

function saveToProfile(couponButton) {
  $.ajax({
    url: `/coupons/${couponButton.dataset.couponid}/save_to_profile`,
    type: 'POST'
  })
  .done(function(data) {
    $.get($('#profile-nav-button')[0].href).done((user) => {
      userObject = user
      loadCouponFromLink(couponButton);
    })
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
        loadCouponFromLink(form);
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

function newStoreCoupon(storeButton) {
  $.get(`/stores/${storeButton.dataset.storeid}/coupons/new`, function(form){
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
      let couponObject = new Coupon(response);
      loadCoupon(couponObject);
    })
}

function loadStores() {
  $.get($('#profile-nav-button')[0].href).done((user) => {
    userObject = user
  })
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
    $('#new-store-coupon').on('click', function(){
      newStoreCoupon(this);
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
    userObject = user
    var userHTML = HandlebarsTemplates['user_template'](user)
    $('#display').html(userHTML)
    addCouponLinkListener();
    $.get('/coupons').done((data) => {couponsJSONObjects = data})
  })
}

function addCouponLinkListener() {
  $('.coupon-link').on('click', function(e){
    e.preventDefault();
    loadCouponFromLink(this);
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
