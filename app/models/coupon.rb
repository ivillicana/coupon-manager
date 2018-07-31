class Coupon < ApplicationRecord
  belongs_to :store
  has_many :user_coupons, dependent: :destroy
  has_many :users, through: :user_coupons
  
  before_save :stylize_attributes
  validates :item, :coupon_code, :offer_description, :expiration_date, :store_id, presence: true
  validates :coupon_code, format: {with: /\A[^\s]+\z/, message: "must not have spaces"}

  def store_name=(args)
    self.store = Store.find_or_create_by(name: args.split.each {|w| w.capitalize!}.join(" "))
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

  def self.by_item_alphabetically
    order(:item)
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

  def stylize_attributes
    self.item = self.item.split.each {|w| w.capitalize!}.join(" ")
    self.coupon_code = self.coupon_code.upcase
  end
  
end
