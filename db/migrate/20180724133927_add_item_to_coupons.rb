class AddItemToCoupons < ActiveRecord::Migration[5.2]
  def change
    add_column :coupons, :item, :string
  end
end
