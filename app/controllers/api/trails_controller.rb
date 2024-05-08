class Api::TrailsController < ApplicationController
    # before_action :require_logged_in, only: [:show]
    
    def index 
        @trails = Trail.all
        @reviews = Review.all
        render :index
    end
    
    def show 
        @trail = Trail.find_by(id: params[:id])
        @reviews = @trail.review
        render :show
    end
    
    def create 
        @trail = Trail.new(trail_params)
        if @trail.save 
            render :show 
        else
            render json: {errors: @trail.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def search
        @trails = Trail.search_difficulty(params[:query]) 
        @trails = Trail.search_names(params[:query]) if @trails.empty?
        render :search
    end

    # def add_photo
    #     @trail = Trail.find_by(id: params[:id])
      
    #     if @trail
    #       if params[:photo].present?
    #         @trail.photo.attach(params[:photo])
    #         render json: { message: "Photo uploaded successfully" }, status: :ok
    #       else
    #         render json: { error: "No photo provided" }, status: :unprocessable_entity
    #       end
    #     else
    #       render json: { error: "Trail not found" }, status: :not_found
    #     end
    #   end
      
    
      

    private

    def trail_params
        params.require(:trail).permit(:name,:description,:location,:difficulty,:length,:latitude,:longitude)
    end

end
