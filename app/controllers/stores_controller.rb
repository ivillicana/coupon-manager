class StoresController < ApplicationController
  before_action :find_store, only: [:show, :edit, :update, :destroy]

  def index
    @stores = Store.all
  end

  def show
    
  end
end
