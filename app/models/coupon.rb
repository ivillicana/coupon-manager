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

  def self.by_store(store_id)
    where(store: store_id)
  end

  def expiration_countdown
    if self.expiration_date == Date.today
      "Expires today!"
    elsif self.expiration_date < Date.today
      "Sorry... this coupon has expired"
    else
      difference_days = (self.expiration_date - Date.today).to_i
      "Expires in #{difference_days} #{"day".pluralize(difference_days)}"
    end
  end
end
