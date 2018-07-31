class ApplicationController < ActionController::Base

  def home
    
  end

  def logged_in?
    !!session[:user_id]
  end

  def redirect_if_not_logged_in
    return redirect_to login_path, alert: "You must be logged in" if !logged_in?
  end

  def redirect_if_logged_in
    return redirect_to user_path(session[:user_id]), alert: "You are already logged in" if logged_in?
  end

  def current_user
    @user = User.find_by(id: session[:user_id]) if logged_in?
  end
  
end
