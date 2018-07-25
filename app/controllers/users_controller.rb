class UsersController < ApplicationController
  before_action :redirect_if_not_logged_in, only: [:show]
  before_action :redirect_if_logged_in, only: [:new, :create]

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

  def show
    @user = User.find_by(id: params[:id])
    if !@user
      return redirect_to user_path(session[:user_id]), alert: "No such user"
    elsif @user.id != session[:user_id]
      return redirect_to user_path(session[:user_id]), alert: "You do not have access to user profile"
    end
    
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
