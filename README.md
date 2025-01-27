# aifolio 🤖

a minimalist ai-powered portfolio template that creates an interactive ama (ask me anything) experience

## live demo 🌐

check out the [live demo](https://efekuc.uk) to see my own version in action.

## features ✨

- interactive ai chat interface
- customizable ai personality
- modern, minimalist design
- content moderation built-in
- mobile-responsive layout
- deploy anywhere (vercel, custom server, etc.)
- easy to customize and extend

## quick start 🚀

1. clone and install:
```bash
git clone https://github.com/yourusername/aifolio
cd aifolio
npm install
```

2. create `.env` file:
```env
GROQ_API_KEY=your_groq_api_key_here
ALLOWED_ORIGINS=*
NODE_ENV=development
PORT=3000
```

3. run locally:
```bash
# using express (works everywhere)
npm run dev

# or using vercel
npm run vercel-dev
```

## deployment options 🌍

### vercel (recommended)
1. fork this repo
2. connect to vercel
3. add environment variables
4. ship

## customization 🎨

### ai personality
edit the system prompt in `api/chat.js` to create your own ai personality. the current template uses satoshi nakamoto as an example.

### groq model selection
you can choose different groq models by changing the `model` parameter in `api/chat.js`:

```javascript
model: "llama3-8b-8192",  // fast, good for most uses
// or
model: "mixtral-8x7b-32768",  // more capable, longer context
// or
model: "gemma-7b-it",  // balanced performance
```

### styling
- modify `styles/style.css` for visual changes
- update `index.html` for layout changes
- replace `og-image.jpg` and `favicon.svg` with your own assets

### security features
- cors protection (configurable in `.env`)
- content moderation (built into the ai prompt)
- rate limiting (add your own in `server.js`)

## environment variables 🔑

| variable | description | default |
|----------|-------------|---------|
| `GROQ_API_KEY` | your groq api key | required |
| `ALLOWED_ORIGINS` | cors allowed origins | * |
| `NODE_ENV` | environment | development |
| `PORT` | server port | 3000 |

## project structure 📁

```
aifolio/
├── api/
│   └── chat.js          # ai chat endpoint
├── styles/              # css styles
├── scripts/            # frontend js
├── server.js           # express server
├── index.html          # main page
├── vercel.json         # vercel config
└── package.json        # dependencies
```

## development 💻

### local development
```bash
# install dependencies
npm install

# run with express
npm run dev

# run with vercel
npm run vercel-dev
```

### deployment
```bash
# deploy to vercel
npm run deploy

# or run on your server
npm start
```

## contributing 🤝

contributions welcome! please feel free to submit a pull request.

## credits 👏

originally crafted by me, [efeuc.uk](https://github.com/efekucuk), now open for all.

## license 📄

mit - see the [license](LICENSE) file for details.

## support 💬

got questions? open an issue or check the [discussions](https://github.com/efekucuk/aifolio/discussions). 
