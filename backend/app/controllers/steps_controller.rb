class StepsController < ApplicationController
  before_action :set_project
  before_action :set_step,only: [:show,:edit,:update,:destroy]
  def index
    @steps=@project.steps
  end

  def create
    @step=@project.steps.new(step_params)
    byebug
    if(@project.save)
      redirect_to project_path(@project)
    else
      redirect_to action: :new
    end
  end

  def new
    @step=@project.steps.new
  end

  def edit
  end

  def show
    @step=@project.steps.find(params[:id])
  end

  def update
    @step.update_attributes(step_params)
    if(@project.save)
      redirect_to project_path(@project)
    else
      redirect_to action: :edit
    end
  end

  def destroy
    @step.delete
  end
  protected
  def set_project
    @project=Project.find(params[:project_id])
  end
  def set_step
    @step=@project.steps.find(params[:id])
  end
  private
  def step_params
    params.require(:step).permit(:name,:solution_policy,:constraints,:hints)
  end
end
