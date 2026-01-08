import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface CommentData {
  feedback_id: string;
  name: string;
  email?: string;
  comment: string;
}

/**
 * POST /api/comments
 * Thêm bình luận vào feedback
 */
export async function POST(request: NextRequest) {
  try {
    const body: CommentData = await request.json();
    const { feedback_id, name, email, comment } = body;

    // Validation
    if (!feedback_id || !comment || !comment.trim()) {
      return NextResponse.json(
        { error: 'Feedback ID and comment content are required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      console.error('Supabase is not configured.');
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Sanitize input
    const commentRow = {
      feedback_id: feedback_id.trim(),
      name: name?.trim() || 'Anonymous',
      email: email?.trim() || undefined,
      comment: comment.trim(),
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from('comments')
      .insert([commentRow])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        {
          error: 'Failed to save comment to database',
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Comment added successfully',
      data: data,
    });

  } catch (error: any) {
    console.error('Comment submission error:', error);
    return NextResponse.json(
      {
        error: 'Failed to submit comment',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/comments?feedback_id=xxx
 * Lấy danh sách comments của một feedback
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const feedbackId = searchParams.get('feedback_id');

    if (!feedbackId) {
      return NextResponse.json(
        { error: 'Feedback ID is required' },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('feedback_id', feedbackId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve comments' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    });
  } catch (error: any) {
    console.error('Comment retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve comments' },
      { status: 500 }
    );
  }
}

