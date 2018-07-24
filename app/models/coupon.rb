class Coupon < ApplicationRecord
  belongs_to :store
  has_many :users, through: :user_coupons
  has_many :user_coupons

  def store_name=(args)
    self.store = Store.find_or_create_by(name: args)
  end

  def store_name
    self.store ? self.store.name : nil
  end
end
