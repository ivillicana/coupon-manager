class CouponsController < ApplicationController
  before_action :find_coupon, only: [:show, :edit, :destroy, :update]
  before_action :redirect_if_coupon_doesnt_exist, only: [:show, :edit]

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
    redirect_if_coupon_doesnt_exist
  end

  def edit
    redirect_if_coupon_doesnt_exist
  end

  def update
   
    if @coupon
      upcase_coupon_code
      if @coupon.update(coupon_params)
        redirect_to coupon_path(@coupon), alert: "Successfully updated coupon"
      else
        render :edit, alert: "Unable to update coupon. Please check errors"
      end
    else
      redirect_to coupons_path, alert: "Unable to find coupon"
    end
  end

  def destroy
    @coupon.destroy
    redirect_to coupons_path, alert: "Successfully deleted coupon"
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

  def find_coupon
    @coupon = Coupon.find_by(id: params[:id])
  end

  def redirect_if_coupon_doesnt_exist
    redirect_to coupons_path, alert: "No such coupon exists" if !@coupon
  end

end
