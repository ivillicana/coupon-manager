module CouponsHelper

  def store_id_field(coupon, f)
    if coupon.store.nil?
      render partial: 'store_datalist', locals: {f: f}
    else
      hidden_field_tag "coupon[store_id]", coupon.store_id
      label_tag 'coupon_store_id', coupon.store.name, class: "h5"
    end
  end
end
