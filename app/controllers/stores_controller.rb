class StoresController < ApplicationController
  before_action :redirect_if_not_logged_in
  before_action :find_store, only: [:show, :edit, :update, :destroy]

  def index
    @stores = Store.all
  end

  def show
    
  end

  private

  def find_store
    @store = Store.find_by(id: params[:id])
  end

end
