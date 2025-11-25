# Theme Toggle Feature Guide

## 🌓 Overview

Your BhakthiVerse website now has a **theme toggle feature** just like Preparation Street! Users can switch between:

- **Dark Theme** - Navy blue background with vibrant gradient blobs
- **Light Theme** - White aesthetic with soft pastel gradient blobs

---

## ✨ What's Been Implemented

### 1. **Theme Context** (`src/context/ThemeContext.jsx`)
- Global theme state management
- Persists theme preference in localStorage
- Provides theme utilities across the app

### 2. **Theme Toggle Button** (`src/components/ThemeToggle.jsx`)
- Beautiful animated sun/moon icon toggle
- Smooth transitions between themes
- Fixed position (top-right corner)

### 3. **Theme-Aware Components**
All UI components now support both themes:
- ✅ BackgroundWrapper (animated backgrounds)
- ✅ Cards (all variants)
- ✅ Buttons (all variants)
- ✅ Typography (headings, text)
- ✅ Badges
- ✅ Icon Buttons

### 4. **Tailwind Dark Mode**
- Class-based dark mode enabled
- Automatic theme class switching
- Smooth color transitions

---

## 🎨 Theme Colors

### Dark Theme
```
Background: #0A1628 → #1a2332 (Navy gradient)
Text: White
Blobs: Vibrant blue, purple, cyan
Cards: Semi-transparent white overlays
```

### Light Theme
```
Background: #F7FAFF → #F0F4F9 (Light blue-white gradient)
Text: Dark navy (#0A1628)
Blobs: Soft pastel blue, purple, cyan
Cards: White with subtle borders
```

---

## 🚀 Usage

### Using Theme Toggle

The theme toggle is already added to HomePage. To add it to other pages:

```jsx
import ThemeToggle from "@/components/ThemeToggle";

export default function MyPage() {
  return (
    <div>
      {/* Fixed position theme toggle */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>
      
      {/* Your content */}
    </div>
  );
}
```

### Using Theme in Components

Access theme state in any component:

```jsx
import { useTheme } from '@/context/ThemeContext';

export default function MyComponent() {
  const { theme, toggleTheme, isDark, isLight } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      
      {isDark && <p>Dark mode is active</p>}
      {isLight && <p>Light mode is active</p>}
    </div>
  );
}
```

### Theme-Aware Styling

Use Tailwind's dark/light modifiers:

```jsx
<div className="
  bg-white dark:bg-dark-900 light:bg-white
  text-dark-900 dark:text-white light:text-dark-900
  border-dark-900/10 dark:border-white/10 light:border-dark-900/10
">
  Theme-aware content
</div>
```

---

## 🎯 Theme Persistence

The theme preference is automatically saved to localStorage:
- Key: `bhakthiverse-theme`
- Values: `'dark'` or `'light'`
- Persists across page reloads
- Syncs across browser tabs

---

## 🎨 Customizing Themes

### Change Theme Colors

Edit `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      // Add your custom colors
      'custom-light': '#yourcolor',
      'custom-dark': '#yourcolor',
    },
  },
}
```

### Customize Background Blobs

Edit `BackgroundWrapper.jsx` to change blob colors:

```jsx
// Dark theme blob colors
const blob1Color = isDark ? '#3B82F6' : '#93C5FD';

// Change to your colors
const blob1Color = isDark ? '#YourDarkColor' : '#YourLightColor';
```

### Customize Toggle Button

Edit `ThemeToggle.jsx`:

```jsx
// Change button size
<button className="w-14 h-14"> {/* Change size here */}

// Change icons
import { Sun, Moon } from 'lucide-react'; // Use different icons
```

---

## 📱 Responsive Behavior

The theme toggle:
- ✅ Fixed position on all screen sizes
- ✅ Accessible on mobile and desktop
- ✅ Touch-friendly size (56x56px)
- ✅ High z-index (z-50) to stay on top

---

## ♿ Accessibility

- ✅ Proper `aria-label` for screen readers
- ✅ Keyboard accessible (tab + enter)
- ✅ High contrast in both themes
- ✅ Smooth transitions (respects prefers-reduced-motion)

---

## 🔧 Advanced Usage

### Programmatically Set Theme

```jsx
import { useTheme } from '@/context/ThemeContext';

function MyComponent() {
  const { setTheme } = useTheme();
  
  return (
    <div>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
    </div>
  );
}
```

### Detect System Theme

Add this to ThemeContext if you want to detect system preference:

```jsx
const getSystemTheme = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Use in initial state
const [theme, setTheme] = useState(() => {
  const savedTheme = localStorage.getItem('bhakthiverse-theme');
  return savedTheme || getSystemTheme();
});
```

---

## 🎉 Testing

1. **Run the dev server**: `npm run dev`
2. **Click the theme toggle** in the top-right corner
3. **Observe**:
   - Background changes from dark to light
   - Text colors invert
   - Gradient blobs change to pastel colors
   - All cards and buttons adapt
4. **Reload the page** - theme persists!

---

## 💡 Tips

1. **Always use theme-aware classes** for new components
2. **Test both themes** when building new features
3. **Use the provided UI components** - they're already theme-aware
4. **Check contrast** in both themes for accessibility

---

## 🐛 Troubleshooting

**Theme not persisting?**
- Check browser localStorage is enabled
- Clear cache and reload

**Colors not changing?**
- Ensure component uses `dark:` and `light:` modifiers
- Check if ThemeProvider wraps your app

**Toggle button not visible?**
- Check z-index conflicts
- Ensure it's not covered by other elements

---

## 📚 Files Modified

```
✅ src/context/ThemeContext.jsx          (NEW)
✅ src/components/ThemeToggle.jsx        (NEW)
✅ src/features/home/components/BackgroundWrapper.jsx  (UPDATED)
✅ src/components/ui/Card.jsx            (UPDATED)
✅ src/components/ui/Button.jsx          (UPDATED)
✅ src/components/ui/Typography.jsx      (UPDATED)
✅ src/App.jsx                           (UPDATED)
✅ src/features/home/pages/HomePage.jsx (UPDATED)
✅ tailwind.config.js                    (UPDATED)
```

---

## 🎊 You're All Set!

Your website now has a professional theme toggle feature just like Preparation Street! Users can choose their preferred theme, and it will be remembered across sessions.

**Enjoy the new theme feature!** 🌓✨