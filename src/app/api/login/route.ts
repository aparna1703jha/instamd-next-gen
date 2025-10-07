import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Mock user database
const MOCK_USERS = [
  {
    id: "1",
    email: "test@example.com",
    password: "password123",
    name: "Test User",
    role: "patient",
  },
  {
    id: "2",
    email: "doctor@instamdinc.com",
    password: "doctor123",
    name: "Dr. Smith",
    role: "doctor",
  },
  {
    id: "3",
    email: "admin@instamdinc.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
  },
];

// JWT secret (in production, this should be in env variables)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          error: "Username and password are required",
        },
        { status: 400 }
      );
    }

    // Find user by email (username field contains email)
    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === username.toLowerCase()
    );

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Return success response
    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
