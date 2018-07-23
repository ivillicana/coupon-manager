class Coupon < ApplicationRecord
  belongs_to :store
  has_many :users, through: :user_coupons
  has_many :user_coupons
end
