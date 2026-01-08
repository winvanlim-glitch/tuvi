import { NextRequest, NextResponse } from 'next/server';
import { supabase, FeedbackRow } from '@/lib/supabase';

interface FeedbackData {
  name?: string;
  email?: string;
  feedback: string;
  category: string;
  timestamp: string;
  userAgent?: string;
}

/**
 * POST /api/feedback
 * Lưu feedback từ người dùng vào Supabase
 */
export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json();
    const { feedback, name, email, category, timestamp, userAgent } = body;

    // Validation
    if (!feedback || !feedback.trim()) {
      return NextResponse.json(
        { error: 'Feedback content is required' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!supabase) {
      console.error('Supabase is not configured. Please set environment variables.');
      // Fallback: log to console
      console.log('Feedback received (fallback):', {
        name: name?.trim() || 'Anonymous',
        email: email?.trim() || '',
        feedback: feedback.trim(),
        category: category || 'general',
        timestamp: timestamp || new Date().toISOString(),
      });
      
      return NextResponse.json({
        success: true,
        message: 'Feedback received (logged to console - Supabase not configured)',
        id: Date.now().toString(),
      });
    }

    // Sanitize input
    const feedbackRow: FeedbackRow = {
      name: name?.trim() || 'Anonymous',
      email: email?.trim() || undefined,
      feedback: feedback.trim(),
      category: category || 'general',
      timestamp: timestamp || new Date().toISOString(),
      user_agent: userAgent || undefined,
      ip: request.headers.get('x-forwarded-for') || 
          request.headers.get('x-real-ip') || 
          undefined,
    };

    // Save to Supabase
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedbackRow])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      console.log(`supabase service role key: ${process.env.SUPABASE_SERVICE_ROLE_KEY}`);
      console.log(`supabase url: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
      
      return NextResponse.json(
        {
          error: 'Failed to save feedback to database',
          message: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback received successfully',
      id: data.id,
    });

  } catch (error: any) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      {
        error: 'Failed to submit feedback',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/feedback
 * Lấy danh sách feedback (admin only - cần authentication)
 */
export async function GET(request: NextRequest) {
  // TODO: Add authentication check
  // const authHeader = request.headers.get('authorization');
  // if (!isAuthorized(authHeader)) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase is not configured' },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0,
    });
  } catch (error: any) {
    console.error('Feedback retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve feedback' },
      { status: 500 }
    );
  }
}

