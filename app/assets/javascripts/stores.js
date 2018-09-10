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

let storeObjects = []

function loadStores() {
  $.get($('#profile-nav-button')[0].href).done((userData) => {
    userObject = new User(userData)
  })
  $.get('/stores', (stores) => {
    storeObjects.length = 0;
      stores.forEach( (store) => { 
        let newStore = new Store(store); 
        storeObjects.push(newStore); 
      })
      
      
      
    var storesHTML = HandlebarsTemplates['stores_template'](stores)
    $('#display').html(storesHTML)
    addStoreLinkListener();
    $('.store-coupons-link').on('click', function(e){
      previewStoreCoupons(this);
    })

    $('#reverse-sort').on('click', function() {
      storeObjects.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }
      
        // names must be equal
        return 0;
      });
      
      var storesHTML = HandlebarsTemplates['stores_template'](storeObjects)
      $('#display').html(storesHTML)
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