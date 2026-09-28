class Api::MapsController < ApplicationController
    def config
      api_key = ENV["GOOGLE_MAPS_API_KEY"]
  
      if api_key.blank?
        return render json: { error: "Google Maps API key not configured" },
                      status: :internal_server_error
      end
  
      render json: {
        apiKey: api_key
      }
    end
  end