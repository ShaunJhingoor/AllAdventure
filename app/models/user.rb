# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class User < ApplicationRecord
  has_secure_password
  has_secure_password
  before_validation :ensure_session_token 
  # validates :username, length: {minimum:3, maximum:40} , format: { without:  URI::MailTo::EMAIL_REGEXP message: "can't be an email" }, uniqueness: true, presence: true
  # validates :username, length: {minimum:3, maximum:100}, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true, presence: true
  # validates :session_token, presence: true, uniqueness: true
  # validates :password, length: {minimum:6, maximum:40}, allow_nil: true
  validates :username, 
    uniqueness: {case_sensitive: false} ,
    length: { in: 3..40 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness:  {case_sensitive: false}, 
    length: { in: 3..100 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..40 }, allow_nil: true
  validates :fname, :lname, presence: true

  has_many :reviews, 
    dependent: :destroy

  def self.find_by_credentials(credential,password)
   
    if (credential =~ URI::MailTo::EMAIL_REGEXP) == 0
  
      user = User.find_by(email: credential)

    else

      user = User.find_by(username: credential)

    end

    if user && user.authenticate(password)

      return user
    else

      nil
    end
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private 

  def generate_unique_session_token 
    while true 
      token = SecureRandom.urlsafe_base64
      return token unless User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
 
end

