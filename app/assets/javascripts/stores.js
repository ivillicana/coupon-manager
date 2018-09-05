class Store {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.coupons = data.coupons;
  }

  formatStoreWithHandlebars(template = 'store_template') {
    return HandlebarsTemplates[template](this)
  }

  displayStoreInWindow() {
    $('#display').html(this.formatStoreWithHandlebars())
  }

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
    let newStore = new Store(data)
    newStore.displayStoreInWindow();
    addCouponLinkListener();
    $('#new-store-coupon').on('click', function(){
      newStoreCoupon(this);
    })
  })
}

function previewStoreCoupons(store) {
  $.get(`/stores/${store.dataset.storeid}`, (storeData) => {
    var newStore = new Store(storeData)
    $(`#store-coupons-${store.dataset.storeid}`).html(newStore.formatStoreWithHandlebars('store_coupons_template'))
    addCouponLinkListener();
  })
}