class ApplicationController < ActionController::Base

  def home
    
  end

  def logged_in?
    !!session[:user_id]
  end

  def redirect_if_not_logged_in
    return redirect_to login_path, alert: "You must be logged in" if !logged_in?
  end
  
end
