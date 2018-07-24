class SessionsController < ApplicationController

  def new
    return redirect_to user_path(session[:user_id]), alert: "You are already logged in" if session[:user_id]
  end

  def create
    @user = User.find_by(username: params[:user][:username].downcase)
    @user = @user.try(:authenticate, params[:user][:password])

    return redirect_to login_path, alert: "Unable to sign in" unless @user

    session[:user_id] = @user.id
    redirect_to user_path(@user), alert: "Welcome #{@user.name}"
  end

  def destroy
    session.delete :user_id
    return redirect_to login_path
  end

  private

  def login_params_empty?
    !params[:user][:username] || params[:user][:username].empty?
  end
  
end