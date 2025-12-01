import BackgroundWrapper from "../../../layout/BackgroundWrapper";
import { 
  Section, 
  SectionHeader, 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button, 
  Heading, 
  Text, 
  Badge,
  IconButton 
} from "@/components/ui";

/**
 * Example Page - Shows different component combinations
 * Use this as a reference for building other pages
 */
export default function ExamplePage() {
  return (
    <BackgroundWrapper>
      {/* Example 1: Simple Content Section */}
      <Section spacing="lg">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-4">Example Page</Badge>
          <Heading level={1} gradient className="mb-4">
            Component Examples
          </Heading>
          <Text size="lg">
            This page demonstrates various ways to use the theme components
          </Text>
        </div>
      </Section>

      {/* Example 2: Card Grid */}
      <Section>
        <SectionHeader
          subtitle="Card Examples"
          title="Different Card Styles"
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default" hover>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Semi-transparent with hover effect</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm">
                This is the default card style with a subtle background and border.
              </Text>
            </CardContent>
          </Card>

          <Card variant="glass" hover glow>
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>Glassmorphism with glow</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm">
                Glass effect with a glowing shadow for emphasis.
              </Text>
            </CardContent>
          </Card>

          <Card variant="gradient" hover>
            <CardHeader>
              <CardTitle>Gradient Card</CardTitle>
              <CardDescription>Gradient border effect</CardDescription>
            </CardHeader>
            <CardContent>
              <Text size="sm">
                Gradient borders create a premium look.
              </Text>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Example 3: Card with Footer */}
      <Section>
        <SectionHeader
          subtitle="Advanced Cards"
          title="Cards with Actions"
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="solid">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Premium Feature</CardTitle>
                  <CardDescription>Access exclusive content</CardDescription>
                </div>
                <Badge variant="primary">Pro</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span>
                  Unlimited access
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span>
                  Priority support
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                  <span className="text-green-400">✓</span>
                  Advanced features
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="primary" className="w-full">
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>

          <Card variant="solid">
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
              <CardDescription>Real-time metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary-400">1.2K</div>
                  <div className="text-xs text-gray-400 mt-1">Active Users</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">350</div>
                  <div className="text-xs text-gray-400 mt-1">New Today</div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                View Details
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Section>

      {/* Example 4: Button Showcase */}
      <Section>
        <SectionHeader
          subtitle="Buttons"
          title="Button Variations"
          align="left"
        />

        <div className="space-y-6">
          {/* Primary Buttons */}
          <div>
            <Text size="sm" className="mb-3 font-semibold text-white">Primary Buttons</Text>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          {/* Secondary Buttons */}
          <div>
            <Text size="sm" className="mb-3 font-semibold text-white">Secondary Buttons</Text>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="md">Secondary</Button>
              <Button variant="outline" size="md">Outline</Button>
              <Button variant="ghost" size="md">Ghost</Button>
            </div>
          </div>

          {/* Gradient Button */}
          <div>
            <Text size="sm" className="mb-3 font-semibold text-white">Special Buttons</Text>
            <div className="flex flex-wrap gap-3">
              <Button variant="gradient" size="md">Gradient CTA</Button>
              <Button variant="primary" size="md" disabled>Disabled</Button>
            </div>
          </div>

          {/* Icon Buttons */}
          <div>
            <Text size="sm" className="mb-3 font-semibold text-white">Icon Buttons</Text>
            <div className="flex flex-wrap gap-3">
              <IconButton size="sm">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </IconButton>
              <IconButton size="md">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </IconButton>
              <IconButton size="lg">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </Section>

      {/* Example 5: Badges */}
      <Section>
        <SectionHeader
          subtitle="Badges"
          title="Badge Variations"
          align="left"
        />

        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="purple">Purple</Badge>
          <Badge variant="cyan">Cyan</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="danger">Danger</Badge>
        </div>
      </Section>

      {/* Example 6: Typography Scale */}
      <Section>
        <SectionHeader
          subtitle="Typography"
          title="Text Hierarchy"
          align="left"
        />

        <div className="space-y-4">
          <Heading level={1}>Heading Level 1 - Display Large</Heading>
          <Heading level={2}>Heading Level 2 - Display Medium</Heading>
          <Heading level={3}>Heading Level 3 - Display Small</Heading>
          <Heading level={4}>Heading Level 4 - Heading XL</Heading>
          <Heading level={5}>Heading Level 5 - Heading LG</Heading>
          <Heading level={6}>Heading Level 6 - Heading MD</Heading>
          
          <div className="pt-4">
            <Text size="xl">Extra Large Text</Text>
            <Text size="lg">Large Text</Text>
            <Text size="base">Base Text</Text>
            <Text size="sm">Small Text</Text>
            <Text size="xs">Extra Small Text</Text>
          </div>
        </div>
      </Section>
    </BackgroundWrapper>
  );
}