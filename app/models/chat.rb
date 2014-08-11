class Chat < ActiveRecord::Base
  validates :message, presence: true
end

