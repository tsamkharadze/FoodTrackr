import { Link } from "react-router-dom";
import { Activity, TrendingUp, Utensils, Shield } from "lucide-react";

const features = [
  {
    name: "Track Your Meals",
    description:
      "Log your daily meals and track your macro nutrients with our intuitive food diary.",
    icon: Utensils,
  },
  {
    name: "Monitor Progress",
    description: "Track your weight journey with detailed charts and insights.",
    icon: TrendingUp,
  },
  {
    name: "Set Goals",
    description:
      "Set personalized nutrition goals and track your progress towards them.",
    icon: Activity,
  },
  {
    name: "Secure & Private",
    description:
      "Your data is encrypted and protected. Only you can access your information.",
    icon: Shield,
  },
];

export default function Landing() {
  return (
    <div>
      {/* Hero section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=2850&q=80')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: "0.1",
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight   sm:text-6xl">
              Take Control of Your Health Journey
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Track your nutrition, monitor your progress, and achieve your
              fitness goals with our comprehensive fitness tracking platform.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Already have an account? <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Smart features for your fitness journey
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive suite of tools helps you stay on track with your
            fitness goals.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <Icon
                      className="h-5 w-5 flex-none text-indigo-600"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </div>
  );
}
