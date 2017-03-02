class StudentsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :authenticate_student!, except: [:new,:create]
  respond_to :json

  def new
    build_resource({})
    yield resource if block_given?
    respond_with resource, layout: false
  end

  def create
    build_resource(sign_up_params)

    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_to do |format|
         format.json{render json: resource.errors.full_messages, status: 401}
      end
    end
  end

  def show
    @student=Student.find params[:id]
    unless @student == current_student
      redirect_to :back, :alert => "تم رفض الوصول."
    end
  end

  def edit
    super
  end

  def update
    update_resource(resource, publisher_params)
		redirect_to action: 'show'
  end

  def destroy
    super
  end
  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up) {|u| u.permit(:email,:username,:password,:password_confirmation)}
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  def after_sign_up_path_for(resource)
    root_path # Or :prefix_to_your_route
  end

  private
  def publisher_params
    params.require(:publisher).permit(:general_info, :phone, :address, :birthdate, :avatar, :websiteurl)
  end
end
