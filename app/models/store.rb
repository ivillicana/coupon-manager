class Store < ApplicationRecord
  has_many :coupons
  has_many :users, through: :coupons
  validates :name, presence: true

  validates :name, uniqueness: true
end
