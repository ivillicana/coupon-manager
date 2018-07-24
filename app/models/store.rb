class Store < ApplicationRecord
  has_many :coupons
  has_many :users, through: :coupons

  validates :name, uniqueness: true
end
