$(function(){

  attachEventListeners();

})



function attachEventListeners() {
  $('#coupons-nav-button').on('click', function (e){
    e.preventDefault();
    requestCoupons();
  })
}