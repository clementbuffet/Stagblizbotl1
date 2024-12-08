export function FeaturesSection() {
  const features = [
    {
      title: 'AI-Powered Generation',
      description: 'Create unique and engaging challenges with our AI technology'
    },
    {
      title: 'Earn Rewards',
      description: 'Get DARE tokens for participating and completing challenges'
    },
    {
      title: 'Build Community',
      description: 'Connect with others and grow your social impact'
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Bolt Community</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-white shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}