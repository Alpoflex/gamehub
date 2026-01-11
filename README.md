# GameHub 🎮

**Your Ultimate Gaming Discovery Platform.**

A modern gaming dashboard powered by RAWG API, featuring 500,000+ games with ratings, screenshots, trailers, and a stunning neon gaming aesthetic.

## Features

*   **500,000+ Games**: Complete RAWG database access
*   **Real-Time Search**: Instant game discovery
*   **Genre Filtering**: 12 popular game genres
*   **Platform Badges**: PS, Xbox, PC, Switch, Mobile
*   **Ratings & Reviews**: Metacritic scores & user ratings
*   **Trending Games**: See what's hot right now
*   **Top Rated**: All-time gaming classics
*   **Bilingual**: English/Turkish support 🇬🇧🇹🇷
*   **Neon Gaming Theme**: Purple, blue, and pink aesthetics

## Technologies

*   **Next.js 16** (App Router)
*   **TypeScript**
*   **Tailwind CSS v4**
*   **Axios** (API Calls)
*   **Framer Motion** (Animations)
*   **RAWG API** (Gaming Database)
*   **Lucide React** (Icons)

## Setup

1. **Clone the repository**
```bash
git clone https://github.com/Alpoflex/gamehub.git
cd gamehub
```

2. **Install dependencies**
```bash
npm install
```

3. **Get RAWG API Key**
   - Visit [https://rawg.io/apidocs](https://rawg.io/apidocs)
   - Sign up for a free account
   - Generate your API key

4. **Create environment file**
```bash
# Create .env.local file in root directory
echo "RAWG_API_KEY=your_api_key_here" > .env.local
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
   - Navigate to `http://localhost:3000`

## Environment Variables

Create a `.env.local` file in the root directory:

```env
RAWG_API_KEY=your_rawg_api_key_here
```

**⚠️ Important:** Never commit your `.env.local` file to Git. It's already in `.gitignore`.

## Usage

*   **Browse Games**: Scroll through trending, popular, and top-rated
*   **Search**: Type in search bar for instant results
*   **Filter by Genre**: Click genre pills to filter
*   **View Details**: Click any game card for more info
*   **Switch Language**: Click EN/TR button in top-right corner

---

*A portfolio project showcasing API integration, bilingual support, gaming UI/UX, and modern web design.*
