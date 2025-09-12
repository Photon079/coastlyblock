# Forest Guardian Platform - Image Management

## Directory Structure
This folder contains all static images for the Forest Guardian platform.

## Current Images

### Background Images
- `forest-background-main.jpg` - Primary background image (aerial forest with winding river)
- `forest-background.jpg` - Secondary forest background (backup)

### Project Images
- `amazon-forest.jpg` - Amazon Rainforest Restoration project
- `sahel-desert.jpg` - Sahel Desert Reforestation project  
- `mangrove-coastal.jpg` - Coastal Mangrove Recovery project
- `mountain-forest.jpg` - Mountain Forest Restoration project

## Adding New Images

### 1. Save Image Files
Place your image files in this `/public/images/` directory with descriptive names:
```
/public/images/
├── your-new-image.jpg
├── project-name.jpg
└── background-variant.jpg
```

### 2. Update Image Constants
Add your new images to `/constants/images.ts`:
```typescript
export const IMAGES = {
  // Background images
  FOREST_BACKGROUND: '/images/forest-background-main.jpg',
  YOUR_NEW_BACKGROUND: '/images/your-new-image.jpg',
  
  // Project images  
  YOUR_PROJECT: '/images/project-name.jpg',
} as const;
```

### 3. Use in Components
Import and use in your React components:
```typescript
import { IMAGES } from './constants/images';

// In your component
<div style={{ backgroundImage: `url(${IMAGES.YOUR_NEW_BACKGROUND})` }}>
```

### 4. Image with Fallback (Recommended)
For better error handling, use the ImageWithFallback component:
```typescript
import { ImageWithFallback } from './components/figma/ImageWithFallback';

<ImageWithFallback 
  src={IMAGES.YOUR_PROJECT}
  alt="Project description"
  className="w-full h-64 object-cover"
/>
```

## Best Practices

### File Naming
- Use kebab-case: `forest-background-main.jpg`
- Be descriptive: `amazon-rainforest-restoration.jpg`
- Include purpose: `hero-background.jpg`, `project-thumbnail.jpg`

### File Organization
- **Backgrounds**: Use for page/section backgrounds
- **Projects**: Specific to restoration projects
- **Icons**: SVG icons and small graphics
- **UI**: Interface elements and decorations

### Image Quality
- **Backgrounds**: High resolution (1920x1080 or higher)
- **Project images**: Medium resolution (800x600 minimum) 
- **Thumbnails**: Small resolution (400x300)
- **Icons**: SVG preferred, or high-DPI PNG

### File Formats
- **Photos**: JPG for best compression
- **Graphics with transparency**: PNG
- **Icons and simple graphics**: SVG
- **Animations**: WebP or MP4

## Usage Examples

### Background Image
```typescript
// Full screen background
<div 
  className="min-h-screen"
  style={{
    backgroundImage: `url(${IMAGES.FOREST_BACKGROUND})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
>
```

### Project Card Image
```typescript
// Project thumbnail
<ImageWithFallback 
  src={IMAGES.AMAZON_PROJECT}
  alt="Amazon Rainforest Restoration"
  className="w-full h-48 object-cover rounded-lg"
/>
```

### Modal Background
```typescript
// Modal with background
<div 
  className="backdrop-blur-md bg-white/5 border border-white/20 rounded-3xl"
  style={{
    backgroundImage: `url(${IMAGES.FOREST_BACKGROUND})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
>
```