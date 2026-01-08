import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * GET /api/setup
 * Kiểm tra xem bảng comments đã được tạo chưa
 */
export async function GET(request: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({
        error: 'Supabase not configured',
        setup_required: true,
      });
    }

    // Kiểm tra xem bảng comments có tồn tại không
    const { data, error } = await supabase
      .from('comments')
      .select('id')
      .limit(1);

    if (error) {
      // Bảng chưa tồn tại
      if (error.code === '42P01') {
        return NextResponse.json({
          setup_required: true,
          message: 'Comments table does not exist. Please run the SQL migration.',
          sql_file: 'create_comments_table.sql',
        });
      }
      
      return NextResponse.json({
        error: error.message,
        setup_required: true,
      });
    }

    return NextResponse.json({
      setup_required: false,
      message: 'Comments table exists and is ready!',
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      setup_required: true,
    });
  }
}

