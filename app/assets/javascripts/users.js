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
