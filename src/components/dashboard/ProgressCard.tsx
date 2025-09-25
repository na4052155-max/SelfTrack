import React from 'react';
import { CheckCircle, Circle, Book, Clock } from 'lucide-react';
import { LearningPlan } from '../../types';
import { useLearning } from '../../context/LearningContext';

interface ProgressCardProps {
  plan: LearningPlan;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ plan }) => {
  const { updatePlanProgress } = useLearning();

  const handleTaskToggle = (milestoneId: string, taskId: string) => {
    updatePlanProgress(plan.id, milestoneId, taskId);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{plan.title}</h2>
            <p className="text-gray-600 mt-1">{plan.description}</p>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                {plan.estimatedDuration}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Book className="h-4 w-4" />
                {plan.difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-8">
          {plan.milestones.map((milestone, milestoneIndex) => (
            <div key={milestone.id} className="relative">
              {/* Milestone header */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.completed
                      ? 'bg-green-100 text-green-600'
                      : milestone.progress > 0
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {milestone.completed ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <span className="text-sm font-medium">{milestoneIndex + 1}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{milestone.title}</h3>
                  <p className="text-gray-600 mt-1">{milestone.description}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{Math.round(milestone.progress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="mt-4 space-y-3">
                    {milestone.tasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleTaskToggle(milestone.id, task.id)}
                      >
                        {task.completed ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                            {task.title}
                          </p>
                          <p className="text-sm text-gray-600">{task.description}</p>
                          {task.notes && (
                            <p className="text-sm text-blue-600 mt-1 italic">Note: {task.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resources */}
                  {milestone.resources.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Resources</h4>
                      <div className="space-y-2">
                        {milestone.resources.map((resource) => (
                          <a
                            key={resource.id}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-blue-600 hover:text-blue-700 underline"
                          >
                            {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Connecting line */}
              {milestoneIndex < plan.milestones.length - 1 && (
                <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard;