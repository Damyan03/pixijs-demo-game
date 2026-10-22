# Wildcard Challenge – Tiger Cage Game

A small puzzle game built with PixiJS 8, GSAP and TypeScript. Open the six cage bars in the order logged in the browser console to free the tiger.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install       # install dependencies
npm run dev       # start the dev server at http://localhost:8080
npm run build     # lint, type-check and build to dist/
npx vite preview  # preview the production build
```

## Classes

All game objects are in `src/app/game-objects/`.

| Class | Description |
| --- | --- |
| `GameObject` | Abstract base class. A container with one centered sprite. |
| `InteractableObject` | Abstract. Makes an object clickable and calls `onTap()`. |
| `Bar` | One of the six bars. Holds its shadow and number. Slides out when clicked and reports to the main screen. |
| `Cage` | Shows the cage and creates the six bars (1–3 left, 4–6 right, top to bottom). |
| `Tiger` | The tiger. `leap()` animates it out of the cage. |
| `Plate` | The meter. Shows how many bars are still locked. |
| `Background` | Scales to cover the whole window. |
| `MainScreen` | Builds the scene and holds the game rules. It generates the code, checks each bar, plays the win sequence and resets. It also scales the scene to fit the window. |

## Development notes

**Time spent**

- 3h – Learning PixiJS and GSAP, reading documentation and testing
- 3h – Deciding the game structure (classes and approach)
- ~1h – Logic, tweaks, animations and the end screen

I used the PixiJS Creation template (Web), because the PixiJS documentation recommends it. It also helped me understand a proper PixiJS architecture. I removed the template content that the game did not use, such as the settings. They were not relevant, and I did not write them. I kept the load screen to preload all bundles seamlessly. I kept the `Label` class and used it for the bar numbers and the meter. Because this is a single scene, I loaded all assets under one bundle, `main`.

The majority of the time went into designing the game itself. It has been a while since I last used OOP for game design. It took me longer than I would like to admit to get back into the flow of things. I initially wanted two types of objects: static `DecorObject`s and `InteractableObject`s (the bars). This did not work, because objects such as the text and the cage needed to behave differently.

I also did not scope the assignment properly at first. I tried to make the game future-proof for more objects, which made it needlessly complicated. After some thinking, I narrowed it down to the essential game logic. I kept the `InteractableObject` class, because it did not hurt. After the initial design phase, most later changes were easy. Because of the way I designed it, they usually took only a few lines of code instead of rewriting whole sections.

I used the PixiJS DevTools browser extension for part of the troubleshooting.

## AI usage

This is a project for learning and understanding. I wrote the code myself and used AI (ChatGPT, Claude Code) as a learning aid: to explain how PixiJS works, to help with specific syntax, and to review and debug my code. Some snippets come from its suggestions. This README was drafted with AI from my notes.