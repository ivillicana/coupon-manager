$(function(){
  attachEventListeners();
})

function requestCoupons() {
  
}
function loadCouponsTemplate() {
  $.get('/coupons', (coupons) => {
    $('#saved-coupons').empty();
    var couponsHTML = HandlebarsTemplates['coupons_template'](coupons)
    $('#coupons-list').html(couponsHTML)
  })
  
}

function attachEventListeners() {
  $('#coupons-nav-button').on('click', function (e){
    e.preventDefault();
    loadCouponsTemplate();
  })
}