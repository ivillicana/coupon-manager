class CouponsController < ApplicationController

  def index
    @coupons = Coupon.all    
  end

  def new
    @coupon = Coupon.new
  end

  def create
    
  end

  private

  def coupon_params
    params.require(:coupon).permit(:coupon_code, :expiration_date, :offer_description )
  end

  def upcase_coupon_code
    coupon_params[:coupon_code].upcase!
  end

  def all_coupon_params_filled?
    coupon_params.to_h.all? { |k, v| !v.empty?}
  end
end
