class CouponsController < ApplicationController

  def index
    @coupons = Coupon.all    
  end

  def new
    @coupon = Coupon.new
  end

  def create
    if all_coupon_params_filled?
      upcase_coupon_code
      @coupon = Coupon.new(coupon_params)
      if @coupon.save
        return redirect_to coupon_path(@coupon), notice: "Coupon succesfully created"
      end
    end
    flash.now[:alert] = "Please correct errors"
    render :new
  end

  def show
    @coupon = Coupon.find_by(id: params[:id])
    redirect_to coupons_path if !@coupon
  end

  private

  def coupon_params
    params.require(:coupon).permit(:coupon_code, :expiration_date, :offer_description, :item, :store_name)
  end

  def upcase_coupon_code
    coupon_params[:coupon_code].upcase!
  end

  def all_coupon_params_filled?
    coupon_params.to_h.all? { |k, v| !v.empty?}
  end
end
