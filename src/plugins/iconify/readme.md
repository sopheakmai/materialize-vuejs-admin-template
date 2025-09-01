# Iconify Plugin Documentation

This directory contains the Iconify icon bundling system for the Materialize Vue.js admin template.

## Overview

The Iconify plugin provides an advanced icon bundling solution that optimizes icon delivery by creating custom bundles from multiple sources, reducing bundle size and improving performance.

## Files

### `build.ts`

An **advanced icon bundling script** for the Iconify SVG Framework that creates optimized icon bundles for Vue.js applications.

#### Core Functionality

- **Multi-source Icon Import**: Processes icons from multiple sources:
  - Custom SVG files from directories
  - Iconify JSON icon sets (like Material Design Icons)
  - Individual icon selections from large icon libraries
- **Icon Processing Pipeline**: Each icon goes through optimization:
  - SVG cleanup and validation
  - Color parsing and monotone conversion (replaces colors with `currentColor`)
  - SVGO optimization for smaller file sizes
  - Metadata removal to reduce bundle size
- **Bundle Generation**: Creates a single JavaScript file (`icons-bundle.js`) that registers all icons with the Iconify Vue component

#### Key Optimizations

1. **Tree Shaking**: Only bundles icons you actually specify, not entire icon libraries
2. **Size Reduction**: Removes unnecessary metadata, categories, and descriptions
3. **SVG Optimization**: Uses SVGO to minimize SVG code
4. **Color Theming**: Converts colors to `currentColor` for CSS theming support
5. **Single Bundle**: Combines all icons into one file to reduce HTTP requests

#### Current Configuration

- Imports Material Design Icons from `@iconify-json/mdi`
- Supports custom SVG files from `src/assets/images/iconify-svg`
- Configured for Vue 3 (`@iconify/vue`)
- Outputs ES modules (not CommonJS)

#### Usage

```bash
# Navigate to the iconify plugin directory
cd src/plugins/iconify

# Run the build script
node build.ts
# or with ts-node
ts-node build.ts
```

#### Configuration

Edit the `sources` object in `build.ts` to customize your icon bundle:

```typescript
const sources: BundleScriptConfig = {
  svg: [
    {
      dir: 'src/assets/images/iconify-svg',
      monotone: true,
      prefix: 'custom',
    },
  ],
  icons: [
    'mdi:home',
    'mdi:account',
    // Add individual icons here
  ],
  json: [
    // Path to Iconify JSON files
    'node_modules/.pnpm/@iconify-json+mdi@1.2.3/node_modules/@iconify-json/mdi/icons.json',
  ],
}
```

### `tsconfig.json`

**Why a Separate TypeScript Configuration?**

This dedicated `tsconfig.json` exists because the build script has **different requirements** than the main application.

#### Specific Configuration Features

- **`"composite": false`**: This is a standalone script, not part of a TypeScript project reference
- **`"target": "ESNext"`**: Uses latest JavaScript features since it runs in Node.js during build time
- **`"moduleResolution": "bundler"`**: Optimized for modern bundlers like Vite
- **`"strict": true`**: Enforces strict type checking for reliable build script execution
- **No Declaration Files**: `"declaration": false` since this is a build tool, not a library
- **Excludes Compiled Files**: `"exclude": ["./*.js"]` prevents TypeScript from processing the generated bundle

#### Benefits of Separate Configuration

1. **Isolation**: Build script requirements don't interfere with main app TypeScript settings
2. **Optimization**: Tailored compiler options for Node.js build environment
3. **Maintenance**: Easier to manage build tool dependencies separately
4. **Performance**: Faster compilation with focused configuration

## Integration with Vue Application

Once the bundle is generated, import it in your main application:

```typescript
// In main.ts or App.vue
import './src/plugins/iconify/icons-bundle.js'
```

```vue
<!-- Now you can use icons in your components -->
<Icon icon="mdi:home" />

<Icon icon="custom:my-icon" />
```

## Performance Benefits

**Optimization Results:**
- **Bundle Size Reduction**: Only includes icons you actually use instead of entire icon libraries
- **Fewer HTTP Requests**: All icons bundled into a single file instead of loading individually
- **SVG Optimization**: Uses SVGO to minimize SVG code and remove unnecessary attributes
- **Metadata Removal**: Strips out unused metadata like categories, themes, and descriptions
- **Minification**: Compresses icon data to smallest possible size

**Development Benefits:**
- **Tree Shaking**: Dead code elimination removes unused icons from final bundle
- **Consistent Theming**: Converts colors to `currentColor` for easy CSS theming
- **Type Safety**: TypeScript interfaces ensure proper icon usage
- **Build-time Processing**: Icon optimization happens at build time, not runtime

**Result:** Faster loading times, smaller bundle sizes, and better user experience compared to loading icons on-demand or including entire icon libraries.

## Dependencies

Required packages for the build script:

```bash
npm install --save-dev @iconify/tools @iconify/utils @iconify/json @iconify/iconify
```

## Troubleshooting

### Common Issues

1. **Module Resolution Errors**: Ensure all required dependencies are installed
2. **Path Issues**: Verify that SVG directory paths are correct relative to the script location
3. **TypeScript Errors**: Check that the separate `tsconfig.json` is being used for compilation

### Debug Mode

The script includes console logging to track the bundling process. Check the output for:
- Successfully bundled icon sets
- Number of icons processed
- Any import or processing errors

## Customization

### Adding Custom SVG Icons

1. Place your SVG files in `src/assets/images/iconify-svg`
2. Update the `svg` configuration in `build.ts`
3. Run the build script to regenerate the bundle

### Adding Icon Libraries

1. Install the desired `@iconify-json` package
2. Add the JSON file path to the `json` array in the configuration
3. Rebuild the bundle

### Selective Icon Import

To import only specific icons from a large library:

```typescript
json: [
  {
    filename: '@iconify-json/line-md/icons.json',
    icons: [
      'home-twotone-alt',
      'github',
      'document-list',
    ],
  },
]
```

This setup ensures optimal icon bundling performance while maintaining clean separation between build tools and application code.