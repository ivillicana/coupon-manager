class UsersController < ApplicationController
  before_action :redirect_if_not_logged_in, only: [:show]
  before_action :redirect_if_logged_in, only: [:new, :create]

  def new
    @user = User.new
  end

  def create
    @user = User.new
    capitalize_name
    downcase_email
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      return redirect_to coupons_path, notice: "User successfully created!"
    else
      render :new
    end
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
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

  def downcase_email
    user_params[:email].downcase!
  end

  def capitalize_name
    user_params[:name].split.each {|w| w.capitalize!}.join(" ")
  end

end
