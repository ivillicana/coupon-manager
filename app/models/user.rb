class User < ApplicationRecord
  has_many :user_coupons
  has_many :coupons, through: :user_coupons
  has_many :stores, through: :coupons
  
  has_secure_password
end
