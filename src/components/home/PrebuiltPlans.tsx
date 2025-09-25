import React from 'react';
import { Code, Palette, BarChart, Brain, Smartphone } from 'lucide-react';
import { useLearning } from '../../context/LearningContext';

const PrebuiltPlans: React.FC = () => {
  const { createPlan } = useLearning();

  const prebuiltPlans = [
    {
      id: 'web-dev',
      title: 'Web Development',
      description: 'Master modern web development with React, Node.js, and more',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      duration: '6-12 months',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js'],
    },
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      description: 'Learn user interface and experience design principles',
      icon: Palette,
      color: 'from-pink-500 to-purple-500',
      duration: '4-8 months',
      skills: ['Figma', 'Design Theory', 'Prototyping', 'User Research'],
    },
    {
      id: 'data-science',
      title: 'Data Science',
      description: 'Analyze data and build machine learning models',
      icon: BarChart,
      color: 'from-green-500 to-teal-500',
      duration: '8-12 months',
      skills: ['Python', 'Statistics', 'SQL', 'Machine Learning'],
    },
    {
      id: 'ai-ml',
      title: 'Artificial Intelligence',
      description: 'Dive into AI, machine learning, and neural networks',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      duration: '10-15 months',
      skills: ['Python', 'TensorFlow', 'Deep Learning', 'NLP'],
    },
    {
      id: 'mobile-dev',
      title: 'Mobile Development',
      description: 'Build native and cross-platform mobile applications',
      icon: Smartphone,
      color: 'from-orange-500 to-red-500',
      duration: '6-10 months',
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
    },
  ];

  const handleSelectPlan = (planTitle: string) => {
    createPlan(planTitle, 'beginner');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular Learning <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Roadmaps</span>
          </h2>
          <p className="text-xl text-gray-600">
            Start your journey with our most popular pre-built learning paths
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prebuiltPlans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => handleSelectPlan(plan.title)}
              >
                <div className={`bg-gradient-to-r ${plan.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-pink-500 transition-colors">
                  {plan.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {plan.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {plan.duration}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {plan.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center text-pink-500 font-medium group-hover:text-pink-600">
                    Start Learning →
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Don't see what you're looking for?
          </p>
          <button className="text-pink-500 font-semibold hover:text-pink-600 transition-colors">
            Create a Custom Learning Plan →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PrebuiltPlans;