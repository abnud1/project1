class Publishers::SessionsController < Devise::SessionsController
  respond_to :json
  before_action :configure_sign_in_params, only: [:create,:destroy]

  # GET /resource/sign_in
  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    respond_with(resource, serialize_options(resource), :layout => false)
  end
  # POST /resource/sign_up
  def create
    super
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  protected
  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in,keys: [:username])
  end
end
