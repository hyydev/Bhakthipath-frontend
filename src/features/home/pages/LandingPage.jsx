import ThemeToggle from "../../../components/ThemeToggle";
import {
  Section,
  SectionHeader,
  FeatureCard,
  Button,
  Heading,
  Text,
  GradientText,
  Badge,
} from "../../../components/ui";

export default function LandingPage() {
  return (
    <>
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <Section spacing="lg" className="min-h-screen flex items-center">
        <div className="text-center">
          {/* Badge */}
          <Badge variant="golden" size="lg" className="mb-6 animate-fade-in">
            ✨ Welcome to BhakthiVerse
          </Badge>

          {/* Main Heading */}
          <Heading level={1} className="mb-6 animate-slide-up">
            Your Ultimate{" "}
            <span
              className="
            bg-gradient-to-r 
            from-blue-600 
            to-indigo-600 
            dark:from-amber-300 
            dark:via-amber-400 
            dark:to-amber-600 
            bg-clip-text 
            text-transparent
            font-body
          "
            >
              Spiritual Journey
            </span>
          </Heading>

          {/* Description */}
          <Text
            size="xl"
            className="max-w-3xl mx-auto mb-8 leading-relaxed animate-slide-up"
          >
            Experience divine wisdom, connect with devotees, and deepen your
            spiritual practice with our comprehensive platform trusted by
            thousands of seekers.
          </Text>

          {/* CTA Buttons */}
          <div className="flex gap-4 justify-center animate-slide-up">
            <Button variant="gradient" size="lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-8 justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-sm text-gray-400">Active Devotees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-400">Daily Prayers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">100%</div>
              <div className="text-sm text-gray-400">Satisfaction</div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features Section */}
      <Section>
        <SectionHeader
          subtitle="Our Features"
          title="Transform Your Spiritual Journey"
          description="Discover powerful features designed to enhance your devotional practice and connect you with a vibrant community of seekers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={
              <svg
                className="w-6 h-6 text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            }
            title="Sacred Texts"
            description="Access ancient scriptures, bhajans, and spiritual literature in multiple languages with audio support."
            badge="Popular"
            badgeColor="primary"
          />

          <FeatureCard
            icon={
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            title="Community"
            description="Join a vibrant community of devotees, participate in discussions, and share your spiritual experiences."
            badge="Active"
            badgeColor="purple"
          />

          <FeatureCard
            icon={
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                />
              </svg>
            }
            title="Devotional Music"
            description="Listen to thousands of bhajans, kirtans, and mantras from renowned artists and spiritual masters."
            badge="New"
            badgeColor="cyan"
          />

          <FeatureCard
            icon={
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            title="Daily Practices"
            description="Set reminders for prayers, track your spiritual progress, and maintain consistency in your practice."
            badge="Essential"
            badgeColor="green"
          />
        </div>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg">
        <div className="text-center max-w-4xl mx-auto">
          <Heading level={2} className="mb-6">
            Ready to Begin Your <GradientText>Spiritual Journey?</GradientText>
          </Heading>
          <Text size="lg" className="mb-8">
            Join thousands of devotees who have transformed their lives through
            dedicated practice and divine guidance.
          </Text>
          <Button variant="gradient" size="lg">
            Start Your Journey Today
          </Button>
        </div>
      </Section>
    </>
  );
}
