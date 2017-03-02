class ProjectsController < ApplicationController
  before_action :authenticate_publisher!, except: [:index,:show]
  before_action :set_publisher
  before_action :getprojects, only: [:index]
  before_action :getproject , only: [:show,:edit,:destroy]
  def index
  end

  def new
    @project=Project.new
  end

  def create
    @project=Project.new(project_params)
    @project.publisher=@publisher
    if(@project.save)
      redirect_to project_path(@project)
    else
      render :new
    end
  end

  def show
  end

  def edit
  end

  def update
    @project.update_attributes(project_params)
    if(@project.save)
      redirect_to project_path(@project)
    else
      redirect_to action: :edit
    end
  end

  def destroy
    @project.delete
    redirect_to action: :index
  end
  protected
  def getprojects
    if((@publisher.present?)&&(params[:show_mine]))
      @projects=@publisher.projects
    else
      @projects=Project.all
    end
    @projects=@projects.page(params[:page]).per(10)
  end
  def getproject
    if(@publisher.present?)
      @project=@publisher.projects.find(params[:id])
    else
      @project=Project.find(params[:id])
    end
  end
  def set_publisher
    @publisher=current_publisher
  end
  private
  def project_params
    params.require(:project).permit(:title,:description,:prerequisites=>[],:programmingContext_ids => [])
  end
end
