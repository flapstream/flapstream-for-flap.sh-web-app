<img src="og-image.png" alt="FlapStream" width="100%" />

<div align="center">

# ![A preview of the BubbleFlap application](./dist/100.png) FlapStream

**The first BSC token livestreaming platform for [flap.sh](https://flap.sh) tokens.**

Live stream your token. Get gifted on-chain.

[![Platform](https://img.shields.io/badge/Platform-BSC%20Mainnet-yellow?style=flat-square&logo=binance)](https://bscscan.com)
[![Streaming](https://img.shields.io/badge/Protocol-RTMP%20%2F%20HTTP--FLV-blue?style=flat-square)](https://flapstream.com)
[![Mobile](https://img.shields.io/badge/Mobile-iPhone%20%2F%20Android-green?style=flat-square)](https://flapstream.com)
[![Language](https://img.shields.io/badge/i18n-EN%20%2F%20ZH-red?style=flat-square)](https://flapstream.com)
[![Live](https://img.shields.io/badge/Live-flapstream.com-brightgreen?style=flat-square)](https://flapstream.com)

</div>

---

## What is FlapStream?

FlapStream is a real-time livestreaming platform purpose-built for BSC token communities. Viewers send **real on-chain cryptocurrency gifts** directly to streamers — no wrappers, no vouchers, no intermediaries.

Every stream page is a complete token hub: live price chart, on-chain trade feed, top holder list, gift leaderboard, and real-time chat — all in one place.

---

## Features

| Feature | Description |
|---|---|
| 📡 RTMP Streaming | Industry-standard RTMP ingestion, compatible with OBS, Streamlabs, Larix (mobile) |
| 🎁 On-Chain Gifts | Real BSC crypto gifts settled via FlapStreamVault smart contract |
| 📊 Live Token Data | Real-time price, market cap, volume, holders from on-chain data |
| 💬 Wallet Chat | Chat tied to BSC wallet identity — on-chain username and avatar |
| 🔄 Swap Integration | PancakeSwap swap panel embedded on every stream page |
| 📱 Mobile Streaming | Stream from iPhone / Android / Tablet using Larix Broadcaster (free) |
| 🌏 Bilingual | Full English and Chinese (EN / ZH) interface |
| 🏆 Karma System | On-chain reputation score based on gifts sent and received |
| 🎬 Clips | Stream highlights with thumbnail preview and peak viewer stats |
| 🔗 Embed API | Embeddable player for any token stream |

---

## Mobile Streaming

FlapStream supports live streaming from **iPhone, iPad, Android, and tablets** — no computer required.

| App | Platform | Price |
|---|---|---|
| **Larix Broadcaster** | iPhone / iPad / Android | Free |
| **Streamlabs Mobile** | iPhone / Android | Free |
| **Prism Live Studio** | iPhone / Android | Free |

Enter your FlapStream RTMP URL as the Stream Server and your Stream Key as the Stream Name — tap go live.

---

## Public REST API

Base URL: `https://flapstream.com/api/v1`

All endpoints are open and require no authentication.

### Streams

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/live` | Currently live streams with server timestamp |
| `GET` | `/streams` | All registered streams (live + offline) |
| `GET` | `/streams/all` | All streams without pagination |
| `GET` | `/streams/:tokenAddress` | Stream info for a specific token |
| `GET` | `/embed/:tokenAddress` | Embeddable live badge data for a token |

### Users & Profiles

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/profile/:address` | Full profile with Karma, followers, gift breakdown |
| `GET` | `/wallet/:address` | Quick wallet lookup — username, avatar, live status |
| `GET` | `/profile/:address/followers` | Public follower list for any wallet |
| `POST` | `/register` | Create or update a streamer profile |
| `POST` | `/avatar/:address` | Upload avatar (multipart/form-data, field: `avatar`) |

### Gifts

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/gifts/recent` | Last 20 gifts across the platform with Karma values |
| `GET` | `/gifts/:tokenAddress` | Last 50 gifts for a specific token's stream |

### Leaderboard & Discovery

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/leaderboard` | Top 50 streamers ranked by Karma score (`?limit=` max 100) |
| `GET` | `/search?q=` | Search tokens and streamers by name, symbol, or wallet |
| `GET` | `/clips/recent` | Latest public stream clips with token info and video links |
| `GET` | `/token/:tokenAddress` | On-chain token data + live stream status and viewer count |

### Example Responses

**GET `/api/v1/live`**
```json
[
  {
    "id": 1,
    "tokenAddress": "0xabc...123",
    "tokenSymbol": "TOKEN",
    "tokenName": "My Token",
    "streamerAddress": "0xdef...456",
    "isLive": true,
    "viewerCount": 42,
    "streamTitle": "Token launch stream"
  }
]
```

**GET `/api/v1/gifts/recent`**
```json
[
  {
    "id": 1,
    "senderAddress": "0xabc...123",
    "giftType": "rocket",
    "karmaValue": 3,
    "tokenAddress": "0xdef...456"
  }
]
```

**POST `/api/v1/register`**
```json
// Request body
{
  "walletAddress": "0xabc...123",
  "tokenAddress": "0xdef...456",
  "tokenSymbol": "TOKEN",
  "tokenName": "My Token"
}
```

---

## Gift Types & Karma

| Gift | Karma Value |
|---|---|
| Love | 1 |
| Rose | 2 |
| Rocket | 3 |
| FSM | 5 |
| USDT | 8 |
| BNB | 10 |
| Gold Ingot | 15 |
| Cedric's | 20 |
| Horse | 25 |

---

## Self-Hosting / Deployment

### Requirements

- Node.js 18+
- PostgreSQL 14+
- PM2 (process manager)
- RTMP server (nginx-rtmp or SRS)
- Linux VPS (AlmaLinux / Ubuntu recommended)

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/flapstream/flapstream-for-flap.sh-web-app.git
cd flapstream-for-flap.sh-web-app
```

**2. Create the PostgreSQL database**
```sql
CREATE DATABASE flapstream;
CREATE USER flapstream WITH PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE flapstream TO flapstream;
```

**3. Configure environment**

Edit `ecosystem.config.cjs` and fill in your values:
```js
DATABASE_URL: 'postgresql://USER:PASSWORD@localhost:5432/flapstream',
ADMIN_PASSWORD: 'your_secure_password',
MORALIS_API_KEY: 'your_moralis_api_key',
```

**4. Create avatar upload directory**
```bash
mkdir -p uploads/avatars
```

**5. Start with PM2**
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

**6. Configure your RTMP server**

Point your RTMP server (nginx-rtmp or SRS) to accept streams and forward them. The app expects:
- RTMP ingest on port `1935`
- HTTP-FLV playback on your configured stream URL

**7. (Optional) Nginx reverse proxy**

Proxy port `5000` to your domain with HTTPS using Certbot/Let's Encrypt.

---

## Tech Stack

- **Runtime**: Node.js (compiled, production-only)
- **Frontend**: React + Vite (compiled, served as static assets)
- **Database**: PostgreSQL
- **Blockchain**: BSC Mainnet via Moralis API
- **Streaming**: RTMP ingestion → HTTP-FLV delivery
- **Smart Contract**: FlapStreamVault on BSC Mainnet

---

## Smart Contract

The on-chain gift economy is powered by **FlapStreamVault**, deployed on BSC Mainnet.

Contract Address: `0x400986eec2D72beCAB3F73700b56bA2528Bc7A53`

[View on BscScan](https://bscscan.com/address/0x400986eec2D72beCAB3F73700b56bA2528Bc7A53)

---

## Links

- **Live Platform**: [flapstream.com](https://flapstream.com)
- **Whitepaper**: [flapstream.com/whitepaper](https://flapstream.com/whitepaper)
- **Built for**: [flap.sh](https://flap.sh) token ecosystem

---

<div align="center">

**FlapStream** — Live Stream your token. Get gifted on-chain.

*Built on BSC · For flap.sh tokens*

</div>
