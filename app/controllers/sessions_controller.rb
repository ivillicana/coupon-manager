class SessionsController < ApplicationController
  before_action :redirect_if_logged_in, only: [:new, :create]

  def new
  end

  def create
    @user = User.find_by(email: params[:user][:email].downcase)
    @user = @user.try(:authenticate, params[:user][:password])
    return redirect_to login_path, alert: "Unable to sign in" unless @user

    session[:user_id] = @user.id
    redirect_to user_path(@user), notice: "Welcome #{@user.name}"
  end

  def create_from_facebook
    @user = User.find_or_create_by(uid: auth['uid']) do |u|
      u.name = auth['info']['name']
      u.email = auth['info']['email']
      u.image = auth['info']['image']
      u.password = auth['uid']
    end
    return redirect_to login_path, alert: "A user already exists with Facebook email that was used to attempt log in. Please log in directly with email." unless @user.try(:save)
    session[:user_id] = @user.id
    redirect_to user_path(@user), notice: "Welcome #{@user.name}"
  end

  def destroy
    session.delete :user_id
    session.try(:delete, :coupon_folder)
    return redirect_to login_path
  end

  private

  def login_params_empty?
    !params[:user][:email] || params[:user][:email].empty?
  end

  def auth
    request.env['omniauth.auth']
  end
  
end