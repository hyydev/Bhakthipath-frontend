# BhakthiVerse Theme System Guide

This guide explains how to use the Preparation Street-inspired theme system across your entire website.

## 🎨 Theme Overview

Your website now has a complete design system matching Preparation Street's modern, interactive aesthetic:

- **Dark Navy Theme** - Professional dark mode with blue/purple/cyan accents
- **Interactive Backgrounds** - Mouse-tracking, parallax scrolling, animated gradients
- **Reusable Components** - Cards, buttons, sections, typography
- **Consistent Spacing** - Professional layout system
- **Modern Typography** - Inter, Space Grotesk, JetBrains Mono fonts

---

## 📁 File Structure

```
src/
├── components/
│   └── ui/
│       ├── Card.jsx          # Card components
│       ├── Button.jsx        # Button components
│       ├── Section.jsx       # Section layouts
│       ├── Badge.jsx         # Badge component
│       ├── Typography.jsx    # Text components
│       └── index.js          # Export all components
├── features/
│   └── home/
│       └── components/
│           └── BackgroundWrapper.jsx  # Interactive background
└── index.css                 # Global styles & animations
```

---

## 🚀 Quick Start

### 1. Import Components

```jsx
import { 
  Card, 
  Button, 
  Section, 
  SectionHeader,
  Heading,
  Text,
  Badge 
} from '@/components/ui';

import BackgroundWrapper from '@/features/home/components/BackgroundWrapper';
```

### 2. Create a Page

```jsx
export default function MyPage() {
  return (
    <BackgroundWrapper>
      <Section>
        <SectionHeader 
          title="My Page Title"
          description="Page description"
        />
        {/* Your content */}
      </Section>
    </BackgroundWrapper>
  );
}
```

---

## 🎯 Component Usage

### BackgroundWrapper

Wrap any page with this for the interactive background:

```jsx
<BackgroundWrapper>
  {/* Your page content */}
</BackgroundWrapper>
```

**Features:**
- Mouse-tracking gradient blobs
- Parallax scroll effects
- Animated floating blobs
- Grid pattern overlay
- Noise texture

---

### Cards

```jsx
// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>

// Card Variants
<Card variant="default" />   // Semi-transparent
<Card variant="solid" />     // More opaque
<Card variant="glass" />     // Glassmorphism
<Card variant="gradient" />  // Gradient border

// Feature Card (like Preparation Street)
<FeatureCard
  icon={<YourIcon />}
  title="Feature Title"
  description="Feature description"
  badge="New"
  badgeColor="primary"
/>
```

---

### Buttons

```jsx
// Button Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="gradient">Gradient</Button>

// Button Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Icon Button
<IconButton size="md">
  <YourIcon />
</IconButton>
```

---

### Sections

```jsx
// Section with Header
<Section>
  <SectionHeader
    subtitle="Optional Subtitle"
    title="Section Title"
    description="Section description"
    align="center"  // left, center, right
  />
  {/* Section content */}
</Section>

// Section Sizes
<Section containerSize="sm" />     // max-w-4xl
<Section containerSize="default" /> // max-w-6xl
<Section containerSize="lg" />      // max-w-7xl
<Section containerSize="full" />    // max-w-full

// Section Spacing
<Section spacing="sm" />      // py-12
<Section spacing="default" /> // py-20
<Section spacing="lg" />      // py-32
```

---

### Typography

```jsx
// Headings
<Heading level={1}>Display Large</Heading>
<Heading level={2}>Display Medium</Heading>
<Heading level={3}>Display Small</Heading>
<Heading level={4}>Heading XL</Heading>

// Gradient Heading
<Heading level={1} gradient>
  Gradient Text
</Heading>

// Text
<Text size="lg" color="gray">
  Regular text
</Text>

// Gradient Text (inline)
<GradientText>Highlighted Text</GradientText>
```

---

### Badges

```jsx
<Badge variant="primary">Primary</Badge>
<Badge variant="purple">Purple</Badge>
<Badge variant="cyan">Cyan</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

---

## 🎨 Color System

### Theme Colors

```jsx
// Use in className
className="bg-dark-950"      // Darkest navy
className="bg-dark-900"      // Dark navy
className="bg-dark-800"      // Navy

className="text-primary-500" // Blue
className="text-purple-500"  // Purple
className="text-cyan-500"    // Cyan
```

### Gradient Examples

```jsx
// Background gradients
className="bg-gradient-to-r from-primary-600 to-purple-600"
className="bg-gradient-to-br from-primary-500/10 to-purple-500/10"

// Text gradients
className="bg-gradient-to-r from-primary-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
```

---

## 📐 Layout Patterns

### Hero Section

```jsx
<Section spacing="lg" className="min-h-screen flex items-center">
  <div className="text-center">
    <Badge variant="primary" className="mb-6">
      ✨ Announcement
    </Badge>
    
    <Heading level={1} className="mb-6">
      Your <GradientText>Amazing</GradientText> Title
    </Heading>
    
    <Text size="xl" className="max-w-3xl mx-auto mb-8">
      Description text
    </Text>
    
    <div className="flex gap-4 justify-center">
      <Button variant="gradient" size="lg">CTA Button</Button>
      <Button variant="outline" size="lg">Secondary</Button>
    </div>
  </div>
</Section>
```

### Feature Grid

```jsx
<Section>
  <SectionHeader
    title="Features"
    description="Feature description"
  />
  
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <FeatureCard {...} />
    <FeatureCard {...} />
    <FeatureCard {...} />
  </div>
</Section>
```

### Stats Section

```jsx
<div className="flex gap-8 justify-center">
  <div className="text-center">
    <div className="text-3xl font-bold text-white mb-1">10K+</div>
    <div className="text-sm text-gray-400">Metric Name</div>
  </div>
  {/* More stats */}
</div>
```

---

## 🎭 Animations

### Built-in Animations

```jsx
// Fade in
className="animate-fade-in"

// Slide up
className="animate-slide-up"

// Slide down
className="animate-slide-down"

// Scale in
className="animate-scale-in"

// Glow pulse
className="animate-glow-pulse"
```

### Hover Effects

```jsx
// Scale on hover
className="hover:scale-105 transition-transform"

// Glow on hover
className="hover:shadow-glow-md transition-shadow"

// Lift on hover
className="hover:-translate-y-1 transition-transform"
```

---

## 🎯 Best Practices

### 1. **Always Use BackgroundWrapper**
```jsx
// ✅ Good
<BackgroundWrapper>
  <YourContent />
</BackgroundWrapper>

// ❌ Bad - No background
<YourContent />
```

### 2. **Use Section for Spacing**
```jsx
// ✅ Good - Consistent spacing
<Section>
  <SectionHeader title="..." />
  <Content />
</Section>

// ❌ Bad - Manual spacing
<div className="py-20 px-6">
  <Content />
</div>
```

### 3. **Use Theme Colors**
```jsx
// ✅ Good - Theme colors
className="bg-primary-600 text-white"

// ❌ Bad - Random colors
className="bg-blue-500 text-white"
```

### 4. **Consistent Typography**
```jsx
// ✅ Good - Use components
<Heading level={2}>Title</Heading>
<Text size="lg">Description</Text>

// ❌ Bad - Manual styles
<h2 className="text-3xl font-bold">Title</h2>
<p className="text-lg">Description</p>
```

---

## 📱 Responsive Design

All components are mobile-responsive by default. Use Tailwind breakpoints:

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Responsive grid */}
</div>

<Heading level={1} className="text-4xl md:text-5xl lg:text-6xl">
  {/* Responsive text */}
</Heading>
```

---

## 🔧 Customization

### Extend Tailwind Config

Edit `tailwind.config.js` to add custom colors, fonts, etc:

```js
theme: {
  extend: {
    colors: {
      brand: {
        500: '#your-color',
      },
    },
  },
}
```

### Create Custom Components

Follow the same pattern in `src/components/ui/`:

```jsx
export const MyComponent = ({ children, className = '' }) => (
  <div className={`base-styles ${className}`}>
    {children}
  </div>
);
```

---

## 📚 Examples

Check `src/features/home/pages/HomePage.jsx` for a complete example showing:
- Hero section
- Feature cards
- CTA sections
- Responsive layouts
- All component usage

---

## 🎉 You're Ready!

You now have a complete theme system matching Preparation Street. Use these components across all your pages for a consistent, professional look.

**Need help?** Refer to the component files in `src/components/ui/` for more details.