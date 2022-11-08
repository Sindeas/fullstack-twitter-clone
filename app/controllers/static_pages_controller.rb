class StaticPagesController < ApplicationController
  def home
  end

  def user_feed
    @user = User.find_by(username: params[:username])
    render :user_feed
  end
  
end
