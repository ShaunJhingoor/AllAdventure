class Api:::ReviewsController < ApplicationController
    def create 
        @review = Review.new(trail_params)
        @user = User.find_by(id: @review.user_id)
        if @review.save 
            render :show 
        else
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update 
        @review = Review.find_by(id: params[:id])
        @user= User.find_by(id: @review.user_id)
        if @review.user_id == current_user.id && @review.update(review_params)
            render :show 
        else 
            render json: {errors: @review.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def delete
        @review = Review.find_by(id: params[:id])
        if @review.destroy 
            render jason: "removed"
        else
            render json: {errors: @review.errors.full_messages}
        end
    end

    private 
    def review_params 
        params.require(:review).permit(:user_id, :trail_id, :review, :rating,)
    end
end
