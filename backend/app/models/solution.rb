class Solution
  include Mongoid::Document
  has_and_belongs_to_many :students
  belongs_to :step
end
