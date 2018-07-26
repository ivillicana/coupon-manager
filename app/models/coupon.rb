class Coupon < ApplicationRecord
  belongs_to :store
  has_many :users, through: :user_coupons
  has_many :user_coupons

  validates :item, :coupon_code, :offer_description, :expiration_date, :store_id, presence: true

  def store_name=(args)
    self.store = Store.find_or_create_by(name: args)
  end

  def store_name
    self.store ? self.store.name : nil
  end

  def expires_on
    self.expiration_date.strftime("%m/%d/%Y")
  end

  def self.expiring_soon
    order('expiration_date ASC')
  end

  def self.expiring_last
    order('expiration_date DESC')
  end
end
