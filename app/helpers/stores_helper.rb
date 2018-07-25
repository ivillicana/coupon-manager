module StoresHelper
  def store_coupons(store)
    store.coupons
  end

  def store_coupon_count(store)
    "#{store.coupons.count} #{"coupon".pluralize(store.coupons.count)}"
  end

  def all_stores
    @stores = Store.all
  end
end
