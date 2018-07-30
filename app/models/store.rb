class Store < ApplicationRecord
  has_many :coupons
  has_many :users, through: :coupons
  validates :name, presence: true

  validates :name, uniqueness: true

  def self.most_coupons
    Store.joins(:coupons).group(:name).order('COUNT(coupons.store_id) DESC')
  end
end
