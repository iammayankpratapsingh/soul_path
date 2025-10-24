# Card Screen Flow Diagram

## Current App Structure
```
Soul Path App
├── HomeScreen (Spreads Tab)
├── HistoryScreen (History Tab)  
└── CardsScreen (Cards Tab) ← Current focus
    └── CardItem components (list of cards)
```

## Proposed Card Detail Screen Flow

### 1. Cards List Screen (Current)
```
┌─────────────────────────────────────┐
│ Status Bar (12:40, VoLTE, 46%)     │
├─────────────────────────────────────┤
│ ← Cards                             │
├─────────────────────────────────────┤
│ [Card 1] [Card 2] [Card 3]          │
│ [Card 4] [Card 5] [Card 6]          │
│ [Card 7] [Card 8] [Card 9]          │
│ ...                                 │
└─────────────────────────────────────┘
```

### 2. Card Detail Screen (New - Based on your image)
```
┌─────────────────────────────────────┐
│ Status Bar (12:40, VoLTE, 46%)     │
├─────────────────────────────────────┤
│ ← Shadchakra Kamal                  │
├─────────────────────────────────────┤
│ [Positive] [Negative]               │ ← Tab selection
│   Green     Red                      │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │                             │    │
│  │                             │    │
│  │                             │    │ ← FULL CARD IMAGE
│  │                             │    │   from cards.json
│  │                             │    │   (complete image)
│  │                             │    │
│  │                             │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│         Shadchakra Kamal             │ ← Card heading in middle
│                                     │
│                                     │
│ A special reading that gives you    │
│ guidance for the day ahead          │
│ A special reading that gives you    │
│ guidance for the day ahead          │
│ A special reading that gives you    │
│ guidance for the day ahead          │
└─────────────────────────────────────┘
```

## Navigation Flow

### User Journey:
1. **Cards Tab** → User sees list of all cards
2. **Card Tap** → Navigate to CardDetailScreen
3. **Card Detail Screen** → Shows full card image with tabs
4. **Tab Selection** → Switch between Positive/Negative aspects
5. **Back Button** → Return to Cards list

### Screen Components:

#### CardDetailScreen Structure:
```
CardDetailScreen
├── Header (with back button + card name)
├── Tab Navigation (Positive/Negative)
├── Full Card Image Display
│   └── Complete card image from cards.json (no cropping/hiding)
├── Guidance Text
│   └── "A special reading that gives you guidance for the day ahead"
└── Tab Content
    ├── Positive Tab: Shows positive keywords/meanings
    └── Negative Tab: Shows reversed keywords/meanings
```

## Data Flow

### Card Data Structure (from cards.json):
```json
{
  "id": 56,
  "image": "https://firebasestorage.googleapis.com/.../56.png", ← THIS IMAGE
  "card_name": "Shadchakra Kamal",
  "type": "Laghu Mandala – Kamal (Kaama)",
  "keywords": "Inner balance, energy alignment, flow state",
  "reversed_keywords": "Blockages, disconnection, energy stagnation"
}
```

**Key Point**: The `image` field from cards.json contains the actual ornate card images that will be displayed in full resolution on the detail screen.

### Screen State Management:
```
CardDetailScreen State:
├── selectedCard: CardData
├── activeTab: 'positive' | 'negative'
├── cardImage: string (full resolution)
└── guidanceText: string
```

## Visual Design Elements

### Color Scheme (matching your image):
- **Background**: Light purple/lavender
- **Card Image**: Actual card image from cards.json
- **Positive Tab**: Green text/button
- **Negative Tab**: Red text/button
- **Main Text**: Black

### Layout Specifications:
- **Card Image**: Large, rounded rectangle, full width with padding
- **Tab Design**: Green button for Positive, Red button for Negative
- **Typography**: Consistent with app theme
- **Spacing**: Proper padding and margins for mobile viewing

## Implementation Requirements

### New Files Needed:
1. `src/screens/CardDetailScreen.tsx` - Main detail screen
2. `src/components/CardImageDisplay.tsx` - Full card image component
3. `src/components/TabNavigation.tsx` - Positive/Negative tab component

### Navigation Updates:
1. Update `CardsScreen.tsx` to navigate to detail screen
2. Add route in `RootNavigator.tsx` for CardDetailScreen
3. Pass card data as navigation parameters

### Features:
1. **Complete Image Display**: Show the FULL card image from cards.json without any cropping or hiding
2. **Tab Functionality**: Switch between positive and negative aspects
3. **Responsive Design**: Optimized for mobile viewing
4. **Smooth Navigation**: Back button returns to cards list
5. **Data Integration**: Use existing card data from cards.json
6. **Image Source**: Display the complete images from cards list in full resolution

This diagram shows the complete flow from the cards list to the detailed card view, matching the visual design you described from your image.
