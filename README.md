# Content Listing App

This is a **responsive and performant** content listing page built with **ReactJS**. The project demonstrates best practices in modern front-end development, fulfilling all design and functional requirements provided in the **React Workshop Assignment**.

---

## Features

- **Lazy Loading**
  Loads data and images seamlessly as the user scrolls.

- **Client-Side Search**
  Instantly filters movies based on user input, without API calls.

- **Responsive Grid Layout**

  - Portrait view: 3 columns
  - Landscape view: 5 columns

- **Keyboard Navigation**
  Users can navigate through the grid using arrow keys.

- **Smooth UI Effects**
  Includes a subtle scale effect on hover and focus.

- **Edge Case Handling**
  Handles missing images and titles without breaking the UI.

- **Pixel-Perfect UI**
  Matches the given design specification closely.

---

## Project Structure

```plaintext
src/
├── components/
│   ├── ContentGrid.jsx       # Main logic and state management
│   ├── Header.jsx            # Search bar, back button, and suggestions
│   └── MovieGrid.jsx         # Displays the grid of movie posters
├── utils/
│   └── constants.js          # Base API URL and configuration
├── index.css                 # Global styles, custom font, scrollbars
├── index.js                  # App entry point

public/
└── index.html                # Loads Titillium Web font
```

---

## Tech Stack

- React 18
- Tailwind CSS v3
- Axios for data fetching
- IntersectionObserver API for infinite scrolling
- Modern JavaScript (ES6+), HTML5, CSS3

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app

```bash
npm start
```

The app will run locally at: [http://localhost:3000](http://localhost:3000)

---

## API & Assets Reference

- **Base URL**: `https://test.create.diagnal.com`

- **Data API**:
  `/data/page#.json`
  _(e.g., `/data/page1.json`, `/data/page2.json`)_

- **Image Assets**:
  `/images/`
  _(e.g., `/images/poster1.jpg`, `/images/Back.png`, `/images/search.png`)_

---

## Requirements Covered

- Pixel-perfect UI design
- Infinite scroll with lazy loading
- Client-side search
- Responsive layout (portrait & landscape)
- No visible scrollbars
- Keyboard accessibility
- Error fallback handling for broken images
- Clean, modular and well-commented code
