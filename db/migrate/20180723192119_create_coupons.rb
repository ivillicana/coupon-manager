class CreateCoupons < ActiveRecord::Migration[5.2]
  def change
    create_table :coupons do |t|
      t.string :coupon_code
      t.datetime :expiration_date
      t.text :offer_description
      t.references :store, foreign_key: true

      t.timestamps
    end
  end
end
