import { NextResponse } from 'next/server';
import { requireAuth } from '@/core/auth';
import type { Book, UpdateBookDto } from '@/core/types';




export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();
    const { id } = await params;

    // Mock book retrieval (in production, use a database)
    const response = await fetch(
      `${request.url.split('/api')[0]}/api/books`,
      {
        headers: request.headers,
      }
    );

    if (!response.ok) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const data = await response.json();
    const book = data.books.find((b: Book) => b.id === id);

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json(book);
  } catch {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}


export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const data: UpdateBookDto = await request.json();

    // For demonstration purposes, we'll use a module-level variable
    // In production, this would be a database operation
    return NextResponse.json(
      {
        id,
        ...data,
        authorId: session.user.id,
        authorName: session.user.name,
        updatedAt: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch {

    return NextResponse.json(
      { message: 'Failed to update book' },
      { status: 500 }
    );
  }
}


export async function DELETE() {


  try {
    await requireAuth();
    // In production, check if user owns the book before deleting

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {

    return NextResponse.json(
      { message: 'Failed to delete book' },
      { status: 500 }
    );
  }
}

