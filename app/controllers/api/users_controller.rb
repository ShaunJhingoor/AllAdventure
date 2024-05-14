class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
#   def show 
#     @user = User.find_by(id: params[:id])
#     if @user
#       @reviews = @user.reviews
#       render :show
#     else
#       render json: { errors: "User not found" }, status: :not_found
#     end
#   end
# end

def show 
  @user = User.find_by(id: params[:id])
  render :show
end

  def create
    @user = User.create(user_params)
    if @user.save
      login!(@user)
      render :show
    else 
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update 
    @user = User.find_by(id: params[:id])
    if @user.authenticate(params[:user][:old_password]) 
      if @user.update(user_params)
        render :show 
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["Old password is incorrect"] }, status: :unprocessable_entity
    end
  end

  private

  def user_params
      params.require(:user).permit(:email, :username, :password, :fname, :lname)
    end
  end

