class ProgrammingContext
  include Mongoid::Document
  belongs_to :projectcontext , polymorphic: true
  validates_associated :projectcontext
  def to_s
    projectcontext.to_s
  end
end
