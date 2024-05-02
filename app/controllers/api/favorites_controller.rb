class Api::FavoritesController < ApplicationController

    def index
        user = User.find(params[:user_id]) 
        @favorites = user.favorites.includes(:trail)
        render :index
    end


    def create
      @trail = Trail.find(params[:trail_id])
      @favorite = current_user.favorites.new(trail: @trail)
      if @favorite.save
        render :show
      else
        render json: @favorite.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @favorite = current_user.favorites.find(params[:id])
      @favorite.destroy
      render json: { message: 'Trail removed from favorites' }, status: :ok
    end
  end
  