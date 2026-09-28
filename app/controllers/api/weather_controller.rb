class Api::WeatherController < ApplicationController
    require "net/http"
    require "uri"
    require "json"
  
    def show
      lat = params[:lat]
      lon = params[:lon]
  
      if lat.blank? || lon.blank?
        return render json: { error: "Missing coordinates" },
                      status: :bad_request
      end
  
      api_key = ENV["WEATHER_API_KEY"]
  
      if api_key.blank?
        return render json: { error: "Weather API key not configured" },
                      status: :internal_server_error
      end
  
      uri = URI("https://api.openweathermap.org/data/3.0/onecall")
  
      uri.query = URI.encode_www_form(
        lat: lat,
        lon: lon,
        units: "imperial",
        appid: api_key
      )
  
      response = Net::HTTP.get_response(uri)
  
      render json: JSON.parse(response.body),
             status: response.code.to_i
    rescue => e
      Rails.logger.error("Weather API error: #{e.message}")
  
      render json: { error: "Weather unavailable" },
             status: :internal_server_error
    end
  end