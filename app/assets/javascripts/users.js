var userObject;

class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.image = data.image;
    this.coupons = data.coupons;
  }

  formatUserWithHandlebars() {
    return HandlebarsTemplates['user_template'](this)
  }

  displayUserProfile() {
    $('#display').html(this.formatUserWithHandlebars())
  }

}

function loadUserProfile(userLink) {
  $.get(`${userLink.href}`, function(userData){
    userObject = new User(userData)
    userObject.displayUserProfile();
    addCouponLinkListener();
    getCoupons();
  })
}
