# GameHub 🎮

Your game library is massive. Finding what to play next shouldn't be.

## What's this?

Gaming discovery platform pulling from RAWG's database of 500k+ games. Built it because scrolling through Steam's store page was driving me crazy.

**Features:**
- Search games instantly
- Filter by genre (RPG, FPS, Strategy, etc.)
- See ratings, platforms, release dates
- Get game details, screenshots, trailers
- Switch between English/Turkish 🇬🇧🇹🇷

## Tech Stack

Next.js • TypeScript • Tailwind • RAWG API • Framer Motion

Went with neon purple/pink theme because... well, gaming.

## Quick Start

1. **Get RAWG API key** (free)
   - Go to [https://rawg.io/apidocs](https://rawg.io/apidocs)
   - Sign up → Generate key

2. **Setup**
```bash
git clone https://github.com/Alpoflex/gamehub.git
cd gamehub
npm install
echo "RAWG_API_KEY=your_key_here" > .env.local
npm run dev
```

3. **Play**
   - Hit localhost:3000
   - Search, filter, discover

## Notes

- No login required
- Your data stays local
- API has 20k req/month free tier (plenty for personal use)
- Language toggle top-right if you prefer Turkish

Built this over a few evenings. Still adding features when I have time.

---

*Uses RAWG API for game data. Not affiliated with any game platforms.*
