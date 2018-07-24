class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    if all_user_params_filled?
      downcase_username
      @user = User.new(user_params)
      return redirect_to coupons_path, notice: "User successfully created!" if @user.save
    end
    flash.now[:alert] = "Please correct errors"
    render :new
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :username)
  end

  def all_user_params_filled?
    user_params.to_h.all? { |k, v| !v.empty?}
  end

  def downcase_username
    user_params[:username].downcase!
  end


end
