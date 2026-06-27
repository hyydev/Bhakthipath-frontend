# 🚀 Quick Start Guide

## Get Started in 3 Steps

### Step 1: Run the Development Server

```bash
cd Frontend/BhakthiVerse
npm run dev
```

### Step 2: View the Examples

Open your browser and navigate to:
- **HomePage**: `http://localhost:5173/` - See the hero section and features
- **ExamplePage**: Create a route to see all component examples

### Step 3: Start Building

Create a new page using the template:

```jsx
import BackgroundWrapper from "@/features/home/components/BackgroundWrapper";
import { Section, SectionHeader, Card, Button, Heading } from "@/components/ui";

export default function MyNewPage() {
  return (
    <BackgroundWrapper>
      <Section spacing="lg">
        <SectionHeader
          title="My Page Title"
          description="Page description here"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="glass" hover>
            <Heading level={3}>Card Title</Heading>
            <p className="text-gray-400 mt-2">Card content</p>
          </Card>
          
          <Card variant="glass" hover>
            <Heading level={3}>Another Card</Heading>
            <p className="text-gray-400 mt-2">More content</p>
          </Card>
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="gradient" size="lg">
            Call to Action
          </Button>
        </div>
      </Section>
    </BackgroundWrapper>
  );
}
```

---

## 📖 Documentation

- **THEME_GUIDE.md** - Complete component reference
- **IMPLEMENTATION_SUMMARY.md** - What's been built
- **ExamplePage.jsx** - Live component showcase

---

## 🎨 Common Patterns

### Hero Section
```jsx
<Section spacing="lg" className="min-h-screen flex items-center">
  <div className="text-center">
    <Heading level={1} gradient>Your Title</Heading>
    <Text size="xl" className="mt-4">Description</Text>
    <Button variant="gradient" size="lg" className="mt-8">
      Get Started
    </Button>
  </div>
</Section>
```

### Feature Grid
```jsx
<Section>
  <SectionHeader title="Features" />
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <FeatureCard icon={<Icon />} title="Feature" description="..." />
    {/* More cards */}
  </div>
</Section>
```

### Content Card
```jsx
<Card variant="solid" hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>
```

---

## 🎯 Tips

1. **Always use BackgroundWrapper** for the interactive background
2. **Use Section** for consistent spacing between page sections
3. **Import from @/components/ui** for clean imports
4. **Check ExamplePage.jsx** when you need inspiration
5. **Customize with className** prop for one-off styles

---

## 🔥 Available Components

### Layout
- `BackgroundWrapper` - Interactive animated background
- `Section` - Page section with spacing
- `SectionHeader` - Section title and description

### Content
- `Card` - Content cards (4 variants)
- `FeatureCard` - Special feature cards
- `Heading` - Headings (6 levels)
- `Text` - Body text
- `GradientText` - Gradient text effect

### Interactive
- `Button` - Buttons (5 variants, 3 sizes)
- `IconButton` - Icon-only buttons
- `Badge` - Status badges (7 colors)

---

## 💡 Need Help?

1. Check **THEME_GUIDE.md** for detailed docs
2. Look at **HomePage.jsx** for a complete example
3. Explore **ExamplePage.jsx** for all component variations
4. Refer to component files in `src/components/ui/` for props

---

Happy Building! 🎉