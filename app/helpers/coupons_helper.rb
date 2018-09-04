module CouponsHelper

  def store_id_field(coupon, f)
    if coupon.store.nil?
      render partial: 'store_datalist', locals: {f: f}
    else
      return (label_tag 'coupon_store_id', coupon.store.name, class: "h5") + (hidden_field_tag "coupon[store_id]", coupon.store_id)
    end
  end

  def save_or_delete_from_profile(coupon)
    if current_user.coupons.include? (coupon) 
      form_tag delete_coupon_path(coupon), class: "form-signin login-2" do 
        submit_tag 'Delete from my Profile', class: "btn btn-sm btn-secondary btn-block" 
      end 
    else 
      form_tag save_coupon_path(coupon), class: "form-signin login-2" do 
        submit_tag 'Save to my Profile', class: "btn btn-sm btn-primary btn-block" 
      end 
    end 
  end

end
