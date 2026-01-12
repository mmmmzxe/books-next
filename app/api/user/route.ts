import { NextResponse } from 'next/server';
import { requireAuth } from '@/core/auth';

// Mock user storage (in production, use a database)
const users = new Map([
  ['1', { id: '1', email: 'admin@books.com', name: 'Admin User' }],
]);

export async function GET() {
  try {
    const session = await requireAuth();
    const user = users.get(session.user.id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}


export async function PUT(request: Request) {
  try {
    const session = await requireAuth();
    const { name, email } = await request.json();

    const user = users.get(session.user.id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update user
    const updatedUser = { ...user, name, email };
    users.set(session.user.id, updatedUser);

    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

