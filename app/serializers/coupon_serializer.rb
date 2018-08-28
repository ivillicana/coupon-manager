class CouponSerializer < ActiveModel::Serializer
  attributes :id, :coupon_code, :offer_description, :item, :expiration_date
  belongs_to :store
end
