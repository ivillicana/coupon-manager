class CouponsController < ApplicationController
  before_action :redirect_if_not_logged_in
  before_action :find_coupon, only: [:show, :edit, :destroy, :update, :save_to_profile, :delete_from_profile]
  before_action :redirect_if_coupon_doesnt_exist, only: [:show, :edit, :update, :destroy]

  def index
    @stores = Store.all
    @coupons = Coupon.all
    
    if !params[:store_id].blank? && !params[:date].blank?
      sort_by_store
      sort_by_expiration
    elsif !params[:store_id].blank?
      sort_by_store
    elsif !params[:date].blank?
      sort_by_expiration
    end   
  end

  def new
    if params[:store_id] && !Store.exists?(params[:store_id])
      return redirect_to stores_path, alert: "Store not found"
    else
      @coupon = Coupon.new(store_id: params[:store_id])
    end
  end

  def create
    upcase_coupon_code
    capitalize_item
    @coupon = Coupon.new(coupon_params)
    if @coupon.save
      return redirect_to coupon_path(@coupon), notice: "Coupon succesfully created"
    end
    render :new
  end

  def show
  end

  def edit
    if params[:store_id]
      store = Store.find_by(id: params[:store_id])
      if store.nil?
          redirect_to stores_path, alert: "Store not found"
      else
        @coupon = store.coupons.find_by(id: params[:id])
        redirect_to store_coupons_path(store), alert: "Coupon not found" if @coupon.nil?
      end
    end
  end

  def update
    upcase_coupon_code
    capitalize_item
    if @coupon.update(coupon_params)
      redirect_to coupon_path(@coupon), notice: "Successfully updated coupon"
    else
      render :edit
    end
  end

  def destroy
    @coupon.destroy
    redirect_to coupons_path, notice: "Successfully deleted coupon"
  end

  def save_to_profile
    current_user.coupons << @coupon
    redirect_to coupon_path(@coupon), notice: "Saved coupon to your profile"
  end

  def delete_from_profile
    user_coupon = current_user.user_coupons.where(coupon_id: @coupon.id)
    UserCoupon.destroy(user_coupon.ids)
    redirect_to coupon_path(@coupon), notice: "Deleted coupon from your profile"
  end

  private

  def coupon_params
    params.require(:coupon).permit(:coupon_code, :expiration_date, :offer_description, :item,  :store_id, :store_name)
  end

  def upcase_coupon_code
    coupon_params[:coupon_code].try(:upcase!)
  end

  def capitalize_item
    coupon_params[:item].split.each {|w| w.capitalize!}.join(" ")
  end

  def capitalize_store
    coupon_params[:store_name].split.each {|w| w.capitalize!}.join(" ")
  end

  def all_coupon_params_filled?
    coupon_params.to_h.all? { |k, v| !v.empty?}
  end

  def find_coupon
    @coupon = Coupon.find_by(id: params[:id])
  end

  def redirect_if_coupon_doesnt_exist
    redirect_to coupons_path, alert: "No such coupon exists" if !@coupon
  end

  def sort_by_expiration
    if params[:date] == "Expiring Soon"
      @coupons = @coupons.expiring_soon
    else
      @coupons = @coupons.expiring_last
    end
  end

  def sort_by_store
    @coupons = @coupons.by_store(params[:store_id])
  end

end
