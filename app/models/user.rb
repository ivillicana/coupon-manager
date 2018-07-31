class User < ApplicationRecord
  has_many :user_coupons, dependent: :destroy
  has_many :coupons, through: :user_coupons
  has_many :stores, through: :coupons

  before_save :stylize_user_attributes
  validates :name, :email, :password, presence: true
  validates :email, uniqueness: true

  has_secure_password

  def stylize_user_attributes
    self.name = self.name.split.each {|w| w.capitalize!}.join(" ")
    self.email = self.email.downcase!
  end
end
