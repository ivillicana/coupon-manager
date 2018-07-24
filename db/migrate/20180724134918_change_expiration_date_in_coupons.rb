class ChangeExpirationDateInCoupons < ActiveRecord::Migration[5.2]
  def change
    change_column :coupons, :expiration_date, :date, null: false
  end
end
