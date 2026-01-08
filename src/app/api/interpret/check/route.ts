import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/interpret/check
 * Kiểm tra xem Supabase và bảng interpretations có được config đúng không
 */
export async function GET(request: NextRequest) {
  try {
    // Check environment variables
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasServiceRoleKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!hasSupabaseUrl || !hasServiceRoleKey) {
      return NextResponse.json({
        configured: false,
        error: 'Missing environment variables',
        details: {
          hasSupabaseUrl,
          hasServiceRoleKey,
          supabaseUrl: hasSupabaseUrl ? '✅ Set' : '❌ Missing',
          serviceRoleKey: hasServiceRoleKey ? '✅ Set' : '❌ Missing',
        },
        message: 'Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file',
      });
    }

    if (!supabase) {
      return NextResponse.json({
        configured: false,
        error: 'Supabase client is null',
        message: 'Supabase client failed to initialize',
      });
    }

    // Kiểm tra xem bảng interpretations có tồn tại không
    const { data, error } = await supabase
      .from('interpretations')
      .select('id')
      .limit(1);

    if (error) {
      // Bảng chưa tồn tại
      if (error.code === '42P01') {
        return NextResponse.json({
          configured: true,
          table_exists: false,
          error: 'Table does not exist',
          message: 'Interpretations table does not exist. Please run migration 03_create_interpretations.sql',
          sql_file: 'migrations/03_create_interpretations.sql',
          error_details: {
            code: error.code,
            message: error.message,
            hint: error.hint,
          },
        });
      }

      return NextResponse.json({
        configured: true,
        table_exists: false,
        error: error.message,
        error_details: {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        },
      });
    }

    // Đếm số records hiện có
    const { count } = await supabase
      .from('interpretations')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      configured: true,
      table_exists: true,
      ready: true,
      record_count: count || 0,
      message: '✅ Everything is configured correctly!',
      supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30) + '...',
    });
  } catch (error: any) {
    return NextResponse.json({
      configured: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}

