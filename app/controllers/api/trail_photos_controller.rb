class Api::TrailPhotosController < ApplicationController
      
  def index
    @photos = TrailPhoto.all
    render :index
  end


   def create
    @trail = Trail.find_by(id: params[:trail_id])
    
    if @trail
      @photo = @trail.trail_photos.build
      @photo.image.attach(params[:image])
      @photo.user = current_user

      if @photo.save
        render :show, status: :created
      else
        render json: { error: @photo.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Trail not found" }, status: :not_found
    end
  end
  
  
  
  
  def destroy
    @photo = current_user.trail_photos.find(params[:id])
    @photo.destroy
    head :no_content
  end
  
  private
    def trail_photo_params
      params.require(:trail_photo).permit(:image)
  end
end

