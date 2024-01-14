class TrailsController < ApplicationController
    def index 
        @trail = Trail.all 
        render :index
    end
    
    def show 
        @trail = Trail.find_by(id: params[:id])
        render :show
    end
end
