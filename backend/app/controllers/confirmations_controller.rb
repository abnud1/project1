class Publishers::ConfirmationsController < Devise::ConfirmationsController
  def new
    super
  end

  # POST /resource/confirmation
  def create
    super
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  def show
   super
  end
end
