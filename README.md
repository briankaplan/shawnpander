# Shawn Pander Website

Official website for musician Shawn Pander, featuring music playback, tour dates, and press materials.

## Features

- Music player with Spotify and Apple Music integration
- Tour dates and ticket sales
- Press kit and downloads
- About section and contact information

## Setup

1. Clone the repository:
```bash
git clone https://github.com/briankaplan/shawnpander.git
cd shawn-pander-site
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```env
# Admin Authentication
ADMIN_PHONE_NUMBER=your_phone_number_here
ADMIN_AUTH_CODE=your_secure_code_here

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here

# Vercel KV Configuration
KV_URL=your_kv_url_here
KV_REST_API_URL=your_kv_rest_api_url_here
KV_REST_API_TOKEN=your_kv_rest_api_token_here
KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token_here
```

4. Set up Twilio Webhook:
- Go to your Twilio Console
- Navigate to Phone Numbers → Manage → Active Numbers
- Click on your number
- Under "Messaging", set the webhook URL to:
  ```
  https://your-domain.com/api/sms
  ```

5. Set up Vercel KV:
```bash
npx vercel link
npx vercel env pull .env.local
```

6. Run the development server:
```bash
npm run dev
```

## Admin Authentication

1. Visit `/admin` on your website
2. Enter your phone number and authentication code
3. Once authenticated, you can send SMS commands to update content

## Content Management Tips

### Header Updates
The header is the main promotional area at the top of the site. Keep it concise and impactful.

Example:
```
header: New Album "Forever & For Now" - Available Now on All Platforms! 🎵
```

### Show Updates
Include all relevant information for shows:
- Venue name and location
- Date and time
- Special details (e.g., album release, special guests)

Example:
```
show: The Continental Club
123 Main St, Austin, TX
December 15, 2024 at 9:00 PM
Album Release Show with Special Guests
```

### News Updates
Share important announcements, press coverage, or other news.

Example:
```
news: Rolling Stone features "Forever & For Now" in their Top Albums of 2024! Read the full review here: [link]
```

## Development

### Project Structure
```
src/
  ├── app/              # Next.js app router
  │   ├── admin/       # Admin authentication
  │   └── api/         # API routes
  ├── components/       # React components
  │   ├── sections/    # Page sections
  │   └── ui/          # Reusable UI components
  ├── hooks/           # Custom React hooks
  ├── lib/             # Utility functions
  └── types/           # TypeScript types
```

### Key Technologies
- Next.js 14
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- OpenAI
- Twilio
- Vercel KV

## Security Notes
- Only the authenticated admin phone number can update content
- All updates require confirmation
- Authentication tokens expire after 7 days
- All content updates are logged with timestamps and IP addresses

## Support
For technical support or questions about the content management system, contact the development team.

## License
MIT License