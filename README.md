# LinkedIn Speak 🎭

**Translate professional thoughts into elite corporate jargon. Or reverse the damage.**

LinkedIn Speak is a satirical translation tool that converts plain English into absurd LinkedIn corporate jargon—and decodes pretentious corporate speak back to honest English. It's a humorous take on how corporate culture talks about the world.

---

## Features

✨ **Bidirectional Translation**

- Plain English → LinkedIn Jargon
- LinkedIn Jargon → Plain English

🎚️ **5 Intensity Levels** (Plain to LinkedIn only)

- **Subtle**: Professional polish
- **Cringe**: Buzzwords and forced enthusiasm
- **Thought Leader**: Inspirational garbage
- **Series A Founder**: Startup pitch vibes
- **Fortune 500 Keynote**: Maximum corporate grandiosity

📋 **Smart Features**

- Real-time character count (3000 char limit)
- Example prompts for quick testing
- Copy-to-clipboard with instant feedback
- Regenerate for alternative translations
- Loading state with rotating messages

🎨 **Clean UI**

- Google Translate-style two-panel layout
- Fast, responsive web app

---

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js (Next.js API routes), Anthropic Claude API (`claude-haiku-4-5-20251001`)

---

## Prerequisites

- **Node.js** 18+ (with npm or yarn)
- **Anthropic API Key** (free tier available at [console.anthropic.com](https://console.anthropic.com/account/keys))

---

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/linkedin-speak.git
cd linkedin-speak
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your API key

Copy `.env.example` to `.env.local` and add your Anthropic API key:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and replace the placeholder:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

Get your key from: https://console.anthropic.com/account/keys

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## How It Works

### Plain → LinkedIn Mode

1. Enter plain English text (e.g., "I got a promotion")
2. Select intensity level (subtle to fortune 500 keynote)
3. Click "Translate"
4. Claude translates to absurd corporate jargon

Example output for "I got a promotion" at **Fortune 500 Keynote** intensity:

```
Thrilled to announce a pivotal moment in my professional trajectory!
This represents a paradigm shift in how I leverage my core competencies
and drive transformational impact across the organizational ecosystem.

#Leadership #CareerGrowth #Synergy #ParadigmShift
```

### LinkedIn → Plain Mode

1. Paste a LinkedIn post (the more corporate, the better)
2. Click "Translate" (intensity is ignored for decoding)
3. Claude reveals what it actually means in plain English

Example: "Rightsizing initiative" → "They laid us off."

---

## Project Structure

```
linkedin-speak/
├── app/
│   ├── api/
│   │   └── translate/route.ts    # POST endpoint
│   ├── page.tsx                  # Main page (state, orchestration)
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/
│   └── translator-card.tsx       # Main UI component
├── lib/
│   ├── types.ts                  # TypeScript types & constants
│   ├── prompts.ts                # Prompt templates
│   └── llm.ts                    # Anthropic SDK wrapper
├── public/                       # Static assets
├── .env.example                  # Environment variable template
└── package.json
```

### Key Files

- **`app/page.tsx`**: React state management (`inputText`, `outputText`, `mode`, `intensity`, `loading`, `error`). Calls `/api/translate` endpoint.
- **`components/translator-card.tsx`**: The main UI—two-panel layout with input textarea, mode tabs, intensity selector, example chips, and output display.
- **`lib/llm.ts`**: Wraps the Anthropic SDK. Reads `ANTHROPIC_API_KEY` from environment, calls `claude-haiku-4-5-20251001` with max 1500 tokens.
- **`app/api/translate/route.ts`**: Next.js POST handler. Validates input (non-empty, ≤3000 chars, valid mode/intensity), calls `translateText()`, returns JSON.

---

## Security

- **No hardcoded secrets**: API key is only read from `.env.local` (gitignored).
- **Input validation**: All POST requests validate input length and mode/intensity enums.
- **No request logging**: API requests to Anthropic are not logged to disk.

Never commit `.env.local` or your API key to version control.

---

## Limitations

- **3000 character input limit**: Matches typical Anthropic token budgets.
- **Haiku model**: Using `claude-haiku-4-5-20251001` for speed/cost. Swap to `claude-opus-4-6` in `lib/llm.ts` for higher quality (slower, more expensive).
- **API rate limits**: Subject to Anthropic's rate limiting.
- **Content moderation**: Claude has safety guidelines that may decline certain requests, even in satire context.

---

Made with the help of Claude.
