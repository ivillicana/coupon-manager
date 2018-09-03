Handlebars.registerHelper('save_or_delete_from_profile', function() {
  var couponID = this.id;
  var foundUserCoupon = userObject.coupons.find( function (coupon) { return coupon.id === couponID})
  if (foundUserCoupon){
    return new Handlebars.SafeString(`<button class="form-signin login-2 btn btn-sm btn-secondary btn-block" data-couponId="${couponID}" id="delete-from-profile">Delete from my profile</button>`)
  } else {
    return new Handlebars.SafeString(`<button class="form-signin login-2 btn btn-sm btn-secondary btn-block" data-couponId="${couponID}" id="save-to-profile">Save to my profile</button>`)
  }
})