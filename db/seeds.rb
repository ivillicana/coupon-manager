User.create(name: "Donald Trump", email: "dtrump@gmail.com", password: "password")
User.create(name: "Barack Obama", email: "bobama@gmail.com", password: "password")

Coupon.create(
  "coupon_code"=>"2FOR5",
  "expiration_date"=>"Fri, 31 Aug 2018",
  "offer_description"=>"2 Kombucha drinks for $5",
  "store_name"=>"Target",
  "item"=>"Kombucha")
Coupon.create(
  "coupon_code"=>"5ABC54",
  "expiration_date"=>"Mon, 13 Aug 2018",
  "offer_description"=>"$8 per pound",
  "store_name"=>"Aldi",
  "item"=>"Steak")
Coupon.create(
  "coupon_code"=>"COUPON1123",
  "expiration_date"=>"Wed, 15 Aug 2018",
  "offer_description"=>"Buy 1 get one free",
  "store_name"=>"Aldi",
  "item"=>"Water")
Coupon.create(
  "coupon_code"=>"1OFFTOILETPAPER",
 "expiration_date"=>"Mon, 30 Jul 2018",
 "offer_description"=>"$1 off",
 "store_name"=>"Target",
 "item"=>"Toilet Paper"
)
Coupon.create(
  "coupon_code"=>"FREEBAG2018",
  "expiration_date"=>"Wed, 05 Sep 2018",
  "offer_description"=>"Free Starbucks coffee bag",
  "store_name"=>"Target",
  "item"=>"Starbucks")