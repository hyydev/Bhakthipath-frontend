import ThemeToggle from "../../../components/ThemeToggle";
import RevealOnScroll from "../../../components/RevealOnScroll";
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
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/auth.store";
import { useSmoothScroll } from "../../../app/SmoothScrollProvider";
import {
  ShoppingBag,
  Sparkles,
  BookOpen,
  Users,
  Music,
  Clock,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      {/* Floating top-right controls */}
      <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-50 flex items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(isAuthenticated ? "/ecommerce" : "/login")}
          data-testid="landing-login-button"
          className="!px-4 !py-2 backdrop-blur-md"
        >
          {isAuthenticated ? "Continue" : "Login"}
        </Button>
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <Section spacing="lg" className="min-h-screen flex items-center">
        <div className="text-center">
          <Badge variant="golden" size="lg" className="mb-6 animate-fade-in">
            <Sparkles size={14} className="mr-1.5" />
            Welcome to BhakthiVerse
          </Badge>

          <Heading level={1} className="mb-6 animate-slide-up">
            Your Ultimate{" "}
            <GradientText>Spiritual Journey</GradientText>
          </Heading>

          <Text
            size="xl"
            className="max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up text-ink-700 dark:text-gray-300"
          >
            Experience divine wisdom, connect with devotees, and deepen your
            spiritual practice with our comprehensive platform trusted by
            thousands of seekers.
          </Text>

          <div className="flex flex-wrap gap-4 justify-center animate-slide-up">
            <Button
              variant="gradient"
              size="lg"
              data-testid="landing-get-started"
              onClick={() => scrollTo("#features", { offset: -32 })}
            >
              Get Started
              <Sparkles size={18} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              data-testid="landing-learn-more"
              onClick={() => scrollTo("#features", { offset: -32 })}
            >
              Learn More
            </Button>
          </div>

          <RevealOnScroll delay={0.2}>
            <div className="mt-20 flex flex-wrap gap-10 sm:gap-16 justify-center">
              {[
                { v: "10K+", l: "Active Devotees" },
                { v: "500+", l: "Daily Prayers" },
                { v: "100%", l: "Satisfaction" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-ink-900 dark:text-white mb-1">
                    {s.v}
                  </div>
                  <div className="text-sm text-ink-500 dark:text-gray-400 uppercase tracking-wider">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </Section>

      {/* Features Section */}
      <Section id="features">
        <RevealOnScroll>
          <SectionHeader
            subtitle="Our Features"
            title="Transform Your Spiritual Journey"
            description="Discover powerful features designed to enhance your devotional practice and connect you with a vibrant community of seekers."
          />
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <ShoppingBag className="w-6 h-6 text-saffron-700 dark:text-green-400" strokeWidth={2} />,
              title: "Shopping Store",
              description:
                "Explore a wide range of spiritual products, from books to ritual items, all curated for your devotional needs.",
              badge: "Available",
              badgeColor: "green",
              onClick: () => navigate("/ecommerce"),
            },
            {
              icon: <Sparkles className="w-6 h-6 text-fuchsia-700 dark:text-purple-400" strokeWidth={2} />,
              title: "Spiritual GPT Tool",
              description:
                "Get personalized spiritual guidance and answers to your devotional questions using our AI-powered tool.",
              badge: "Coming Soon",
              badgeColor: "purple",
            },
            {
              icon: <BookOpen className="w-6 h-6 text-saffron-700 dark:text-primary-400" strokeWidth={2} />,
              title: "Sacred Texts",
              description:
                "Access ancient scriptures, bhajans, and spiritual literature in multiple languages with audio support.",
              badge: "Popular",
              badgeColor: "primary",
            },
            {
              icon: <Users className="w-6 h-6 text-fuchsia-700 dark:text-purple-400" strokeWidth={2} />,
              title: "Community",
              description:
                "Join a vibrant community of devotees, participate in discussions, and share your spiritual experiences.",
              badge: "Coming Soon",
              badgeColor: "purple",
            },
            {
              icon: <Music className="w-6 h-6 text-teal-700 dark:text-cyan-400" strokeWidth={2} />,
              title: "Devotional Music",
              description:
                "Listen to thousands of bhajans, kirtans, and mantras from renowned artists and spiritual masters.",
              badge: "New",
              badgeColor: "cyan",
            },
            {
              icon: <Clock className="w-6 h-6 text-emerald-700 dark:text-green-400" strokeWidth={2} />,
              title: "Daily Practices",
              description:
                "Set reminders for prayers, track your spiritual progress, and maintain consistency in your practice.",
              badge: "In Development",
              badgeColor: "green",
            },
          ].map((feature, index) => (
            <RevealOnScroll key={feature.title} delay={index * 0.06}>
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                badge={feature.badge}
                badgeColor={feature.badgeColor}
                onClick={feature.onClick}
                data-testid={`feature-card-${index}`}
              />
            </RevealOnScroll>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section spacing="lg">
        <RevealOnScroll>
          <div className="text-center max-w-4xl mx-auto">
            <Heading level={2} className="mb-6">
              Ready to Begin Your <GradientText>Spiritual Journey?</GradientText>
            </Heading>
            <Text size="lg" className="mb-10">
              Join thousands of devotees who have transformed their lives through
              dedicated practice and divine guidance.
            </Text>
            <Button
              variant="gradient"
              size="lg"
              data-testid="landing-cta-button"
              onClick={() => scrollTo("#features", { offset: -32 })}
            >
              Start Your Journey Today
              <Sparkles size={18} />
            </Button>
          </div>
        </RevealOnScroll>
      </Section>
    </>
  );
}
