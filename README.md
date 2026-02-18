# 💒 Ela & Gabriel Wedding Website

A beautiful, animated, trilingual wedding website built with Next.js 14, Tailwind CSS, and Framer Motion.

![Wedding Website](./public/engagement.jpg)

## ✨ Features

- **Trilingual Support**: English 🇬🇧, French 🇫🇷, Hebrew 🇮🇱 (with RTL)
- **Beautiful Animations**: Smooth scroll animations, parallax effects, floating elements
- **4 Event Cards**: Mairie, Oriental Party, Shabbat Kiddush, Huppa
- **RSVP System**: Per-event attendance with Google Sheets integration
- **Responsive Design**: Looks great on all devices
- **Color Palette**: Extracted from your beautiful engagement sunset photo

## 🎨 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Sunset Gold | `#E8A87C` | Primary accent |
| Soft Coral | `#F4C4B5` | Secondary accent |
| Dusty Rose | `#D4A5A5` | Romantic touches |
| Ocean Blue | `#7BA3C4` | Text, headers |
| Cream | `#FDF8F5` | Backgrounds |
| Terracotta | `#C17767` | Buttons, CTAs |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or download this repository
cd ela-gabriel-wedding

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📝 Google Sheets RSVP Setup

1. **Create a Google Sheet** with these columns:
   - Timestamp, Name, Email, Phone, Guests, Dietary, Message, Mairie, Oriental, Kiddush, Huppa

2. **Add Apps Script**:
   - Go to Extensions > Apps Script
   - Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.email,
      data.phone,
      data.guests,
      data.dietary,
      data.message,
      data.mairie,
      data.oriental,
      data.kiddush,
      data.huppa
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Deploy**:
   - Click "Deploy" > "New deployment"
   - Select "Web app"
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Copy the URL

4. **Add to Environment**:
   - Create `.env.local` file
   - Add: `GOOGLE_SHEETS_WEBHOOK_URL=your_url_here`

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable in Vercel dashboard
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables
4. Deploy!

### Domain Setup

1. Go to Vercel Dashboard > Your Project > Settings > Domains
2. Add `elaandgabriel.com`
3. Update DNS records at your domain registrar:
   - A Record: `76.76.21.21`
   - CNAME: `cname.vercel-dns.com`

## 📁 Project Structure

```
ela-gabriel-wedding/
├── public/
│   └── engagement.jpg
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── api/
│   │       └── rsvp/
│   │           └── route.ts
│   ├── components/
│   │   ├── Navigation.tsx
│   │   ├── Hero.tsx
│   │   ├── OurStory.tsx
│   │   ├── Events.tsx
│   │   ├── RSVPForm.tsx
│   │   └── Footer.tsx
│   ├── messages/
│   │   ├── en.json
│   │   ├── fr.json
│   │   └── he.json
│   └── styles/
│       └── globals.css
├── i18n.ts
├── middleware.ts
└── tailwind.config.js
```

## 🎯 Customization

### Update Event Details
Edit the translation files in `src/messages/`:
- `en.json` - English
- `fr.json` - French  
- `he.json` - Hebrew

### Add More Photos
1. Add images to `public/` folder
2. Update components to display them

### Modify Colors
Edit `tailwind.config.js` to change the color palette.

## 💝 Made with Love

For Ela & Gabriel's special day - July 2025

---

**Mazal Tov! 🎉**
