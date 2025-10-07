# InstaMD Next Gen

A modern healthcare platform built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Homepage with Integrated Sign In** - Two-column responsive layout
- **Secure Authentication** - NextAuth.js with credentials provider
- **Database** - Prisma ORM with SQLite
- **Modern UI** - Tailwind CSS with custom design system
- **TypeScript** - Full type safety

## Tech Stack

- **Framework:** Next.js 15.5.4 with Turbopack
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Authentication:** NextAuth.js 4.24
- **Database:** Prisma 6.16 + SQLite
- **UI Components:** Custom components with CVA (Class Variance Authority)

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd instamd-next-gen
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Generate a secure secret for NextAuth:

```bash
openssl rand -base64 32
```

4. **Set up the database**

```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes (NextAuth)
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Homepage with sign in
│   ├── components/       # React components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── lib/              # Utilities and configuration
│   │   └── auth.ts       # NextAuth configuration
│   └── types/            # TypeScript type definitions
├── prisma/               # Database schema
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Authentication

The app uses NextAuth.js with email/password authentication:

- Users sign in on the homepage
- Credentials are validated against the Prisma database
- Sessions are managed with JWT tokens

## Database Schema

The database uses Prisma with the following models:

- **User** - User accounts
- **Account** - OAuth accounts (for future extensions)
- **Session** - User sessions
- **VerificationToken** - Email verification tokens

## Customization

### Design Tokens

The design system uses Tailwind CSS with custom colors defined in `tailwind.config.ts`:

- Primary: Blue tones
- Accent: Purple tones
- Neutral: Gray scale
- Success/Warning/Danger/Info: Status colors

### Components

All components use CVA for variant management and are fully typed with TypeScript.

## Support

For support, contact:
- Email: support@instamdinc.com
- Phone: (408) 442-3495 (M–F 6am–5pm PT)
- Info: info@instamdinc.com

## License

Private - InstaMD Inc.
