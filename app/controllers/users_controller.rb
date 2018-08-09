class UsersController < ApplicationController
  before_action :redirect_if_not_logged_in, only: [:show]
  before_action :redirect_if_logged_in, only: [:new, :create]
  before_action :current_user, only: [:show, :destroy]

  def index
    @users = User.most_coupons
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      return redirect_to user_path(@user), notice: "User successfully created!"
    else
      render :new
    end
  end

  def show
    if !@user
      return redirect_to user_path(session[:user_id]), alert: "No such user"
    elsif @user.id != session[:user_id]
      return redirect_to user_path(session[:user_id]), alert: "You do not have access that user's profile"
    end
    
  end

  def destroy
    if current_user == @user
      @user.destroy
      session.delete :user_id
      return redirect_to root_path, notice: "Account successfully deleted"
    else
      redirect_to root_path, alert: "You are not authorized to delete this account"
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
