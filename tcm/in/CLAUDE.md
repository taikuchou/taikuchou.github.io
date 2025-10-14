# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Traditional Chinese Medicine (TCM) Internal Medicine reference application. The project consists of two main interfaces:

1. **tcminall.html**: Full hierarchical navigation interface with menu system for browsing TCM formulas and treatments
2. **tcmin.html**: Simple search interface for keyword-based lookup

The application displays detailed information about TCM treatments including:
- Treatment principles and symptoms
- Point prescriptions and formulas
- Formula patterns, actions, ingredients, and modifications
- Syndrome differentiation (辨證分型)

## Architecture

### Data Structure

**tcminall.js** contains the complete medical data in a single JavaScript object `alldata` with the following structure:
- `alldata.version`: Version information
- `alldata.groups`: Top-level category array
- `alldata.dafanGroup`: Nested hierarchical organization of treatments (Level1 → Level2 → Level3)
- `alldata.dafanList`: Array of treatment objects with complete medical information

Each treatment object includes:
- URL, categories (MAINCATEGORY, GROUP, SUBGROUP_1, SUBGROUP_2)
- Bilingual content (English/Traditional Chinese) for all fields
- Treatment details: EFFECT, ACTIONS_INDICATIONS, LATIN_NAME, PINYIN_NAME, NAME, COMMON_NAME, DOSAGE, SUBJECT
- Special formatting markers: `{SPERATE}`, `{SPERATE_LINE}`, `{IMAGE_LINK}`, `[text]`, `＊＊`, `＆＆`

### UI Components

**tcminrwdui_all.js** (263 lines): Main UI controller for tcminall.html
- `showList()`: Renders hierarchical menu structure with 3 levels
- `showDafan()`: Displays detailed treatment information in the main content area
- `getDafan()`: Retrieves treatment data by CHANNELS and GROUP
- `addTwoColunmnListRow()` / `addOneColunmnListRow()`: Layout helpers for form content
- `getListHTML()`: Parses formatted text with special markers into styled HTML lists
- `specialStyle1()`: Applies color styling for bracketed text (red) and special markers (blue)

**js/script.js** (299 lines): Shared UI utilities
- jQuery UI initialization (datepicker with zh-TW locale, select2 dropdowns)
- Dropdown menu behavior
- Mobile hamburger menu toggle
- Magnific Popup integration for image popups
- Alert/confirmation dialogs (`alertSingle`, `alertDouble`)
- Collapse/expand functionality
- Tab navigation system

### Styling

**css/style.css**: Custom styles for the application
- Libraries: jquery-ui.css, select2.min.css, all.min.css (FontAwesome), magnific-popup.css, slick.css

### Content Formatting

The application uses special markers in text content to control rendering:

- `•` - List bullet separator
- `{SPERATE}` - Empty line separator
- `{SPERATE_LINE}` - Horizontal line separator
- `{IMAGE_LINK}filename` - Embeds image from `./in_images/filename.png`
- `[text]` - Red highlighted text
- `＊＊text＊＊` - Red text with blue bracketed content
- `＆＆text＆＆` - Blue text with red bracketed content
- `|` - Delimiter for parsing (removed during rendering)
- `◦` - Alternative list separator

## Development Notes

### Data Management

**tcminall.js is a generated file** containing a massive single-line JavaScript object (5.8 MB, no line breaks). The data structure is:
```javascript
var alldata = {
  "dafanGroup": { /* hierarchical categories */ },
  "groups": [ /* top-level array */ ],
  "version": "version string",
  "dafanList": [ /* array of treatment objects */ ]
}
```

### Bilingual Content

All medical content is bilingual (English/Traditional Chinese). Labels and field names typically show both:
- English first, followed by Chinese characters
- Example: "Treatment Principles治療原則"

### Navigation Structure

The hierarchical menu has 3 levels:
1. **Level 1**: Main categories (e.g., "Frequent Urination+Incontinence_遺尿") with count
2. **Level 2**: Subcategories styled in yellow (#F7DB4F) with subcount
3. **Level 3**: Individual treatments (clickable) with CHANNELS and LITERAL_ENGLISH

Clicking Level 3 items triggers `showDafan()` which updates:
- Breadcrumb trail (g0, g2)
- Title with URL link
- Form box with treatment details in two-column layout

### UI Behavior

**tcminall.html** uses:
- Fixed header with version info (hidden by default)
- Responsive hamburger menu for mobile
- Breadcrumb navigation
- Scrolls to top on treatment selection
- Auto-closes mobile menu after selection

**tcmin.html** features:
- Simple search input with "Search" button (#searcht)
- Results display in #mainDiv
- Link to full interface (tcminall.html)

### Dependencies

- jQuery 3.7.1 (CDN in tcmin.html) or 3.1.1 (local in tcminall.html)
- jQuery UI (datepicker with zh-TW localization)
- Select2 (custom select dropdowns)
- Magnific Popup (image and inline popups)
- Slick (carousel, though not actively used)
- FontAwesome (icons)

### Special Considerations

1. **No build system**: Pure HTML/CSS/JS, no transpilation or bundling
2. **Large data file**: tcminall.js is 5.8 MB and should not be edited directly
3. **Character encoding**: UTF-8 required for Traditional Chinese characters
4. **Mobile-first**: Responsive design with breakpoints (col-md-*)
5. **Background color**: tcminall.html has distinctive pink background (#e5c3c6)

## File Structure

```
/
├── tcminall.html          # Main interface with hierarchical navigation
├── tcmin.html             # Search interface
├── tcminall.js            # Complete medical data (5.8 MB, generated)
├── tcminrwdui_all.js      # UI controller for tcminall.html
├── css/
│   ├── style.css          # Custom application styles
│   ├── jquery-ui.css      # jQuery UI theme
│   ├── select2.min.css    # Select2 dropdown styles
│   ├── magnific-popup.css # Popup styles
│   ├── all.min.css        # FontAwesome icons
│   └── slick.css          # Carousel styles
└── js/
    ├── script.js          # Shared UI utilities and behaviors
    ├── jquery-3.1.1.min.js
    ├── jquery-ui.js
    ├── datepicker-zh-TW.js  # Chinese locale for datepicker
    ├── select2.full.min.js
    ├── jquery.magnific-popup.min.js
    └── slick.min.js
```

## Testing

Open the HTML files directly in a browser (no server required):
- `tcminall.html` - Test full navigation and treatment display
- `tcmin.html` - Test search functionality

Verify:
1. Menu hierarchy renders correctly with counts
2. Clicking treatments loads detailed information
3. Special text formatting (colors, separators, images) displays properly
4. Mobile menu toggles on small screens
5. Breadcrumb navigation updates correctly
6. Bilingual content displays with proper encoding
