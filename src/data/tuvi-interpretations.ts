/**
 * Hệ thống luận giải tử vi chi tiết theo mệnh và cung
 * Mỗi mệnh có luận giải riêng cho từng cung
 */

import { PalaceDefinition } from './tuvi-rules';

export interface PalaceInterpretation {
    summary: string;
    detailed: string;
    strengths: string[];
    weaknesses: string[];
    advice: string[];
    warnings: string[];
    luckyElements?: {
        colors: string[];
        numbers: string[];
        directions: string[];
        times: string[];
    };
}

export type MenhType = 'Kim' | 'Mộc' | 'Thủy' | 'Hỏa' | 'Thổ';

/**
 * Luận giải chi tiết cho từng cung theo từng mệnh
 */
export const PALACE_INTERPRETATIONS: Record<MenhType, Record<string, PalaceInterpretation>> = {
    'Kim': {
        'menh': {
            summary: 'Bạn thuộc mệnh Kim - người có tính cách cương trực, quyết đoán và trọng nghĩa khí.',
            detailed: 'Bạn là người có tư duy logic tốt, khả năng tổ chức và lãnh đạo xuất sắc. Bản chất của bạn thiên về sự chính trực, công bằng và có nguyên tắc rõ ràng. Bạn thường được người khác tin tưởng và tôn trọng nhờ tính cách đáng tin cậy. Tuy nhiên, đôi khi bạn hơi cứng nhắc và độc đoán trong cách suy nghĩ, cần học cách linh hoạt hơn. Cuộc đời bạn sẽ có nhiều thăng trầm nhưng nhờ ý chí vững vàng mà luôn đứng vững. Về già sẽ an nhàn, phú quý nhờ sự tích lũy và nỗ lực không ngừng.',
            strengths: [
                'Có khả năng lãnh đạo và tổ chức tốt',
                'Tư duy logic, phân tích sắc bén',
                'Trọng nghĩa khí, đáng tin cậy',
                'Kiên định với mục tiêu đã đặt ra',
                'Có nguyên tắc sống rõ ràng'
            ],
            weaknesses: [
                'Đôi khi cứng nhắc, khó thay đổi',
                'Có thể độc đoán trong quyết định',
                'Thiếu sự linh hoạt trong ứng xử',
                'Dễ bị stress khi áp lực cao'
            ],
            advice: [
                'Nên học cách lắng nghe ý kiến người khác',
                'Linh hoạt hơn trong cách ứng xử và giải quyết vấn đề',
                'Tránh xung đột trực diện không cần thiết',
                'Dành thời gian thư giãn để giảm stress',
                'Phát huy khả năng tổ chức trong công việc'
            ],
            warnings: [
                'Cẩn trọng với những quyết định quá vội vàng',
                'Tránh quá cứng nhắc trong các mối quan hệ',
                'Chú ý sức khỏe khi làm việc quá sức'
            ],
            luckyElements: {
                colors: ['Trắng', 'Xám', 'Vàng', 'Nâu đất'],
                numbers: ['6', '7', '2', '5', '8'],
                directions: ['Tây', 'Tây Bắc'],
                times: ['Tý (23h-01h)', 'Sửu (01h-03h)', 'Thân (15h-17h)', 'Dậu (17h-19h)']
            }
        },
        'tai_bach': {
            summary: 'Tài lộc của bạn ở mức khá giả, thường đến từ nhiều nguồn khác nhau.',
            detailed: 'Bạn có duyên với kinh doanh, đầu tư hoặc các hoạt động tạo ra thu nhập thụ động. Khả năng quản lý tài chính tốt, biết cách tích lũy và đầu tư thông minh. Tài lộc sẽ ngày càng tăng theo thời gian, đặc biệt sau tuổi 35 khi bạn đã có kinh nghiệm và mạng lưới quan hệ rộng. Bạn phù hợp với các ngành nghề liên quan đến kim loại, công nghệ, tài chính, hoặc quản lý. Tuy nhiên, cần quản lý chi tiêu một cách chặt chẽ và có kế hoạch để tránh thất thoát tài sản. Nên đầu tư vào vàng, bất động sản hoặc các tài sản có giá trị bền vững.',
            strengths: [
                'Khả năng quản lý tài chính tốt',
                'Biết cách tích lũy và đầu tư thông minh',
                'Có nhiều nguồn thu nhập',
                'Tài lộc tăng dần theo thời gian'
            ],
            weaknesses: [
                'Đôi khi chi tiêu không kiểm soát',
                'Có thể đầu tư quá mạo hiểm',
                'Dễ bị lừa trong các giao dịch tài chính'
            ],
            advice: [
                'Nên đầu tư vào vàng và bất động sản để bảo toàn tài sản',
                'Có kế hoạch tài chính dài hạn rõ ràng',
                'Tránh đầu tư vào các dự án quá mạo hiểm',
                'Quản lý chi tiêu một cách chặt chẽ',
                'Tận dụng khả năng tổ chức để tạo nhiều nguồn thu'
            ],
            warnings: [
                'Cẩn trọng với các khoản đầu tư không rõ ràng',
                'Tránh cho vay hoặc đầu tư quá nhiều vào một nơi',
                'Chú ý các khoản chi không cần thiết'
            ]
        },
        'quan_loc': {
            summary: 'Công danh sự nghiệp của bạn sẽ thăng tiến ổn định và bền vững.',
            detailed: 'Bạn phù hợp với các nghề quản lý, tổ chức, hoặc kinh doanh độc lập nơi bạn có thể phát huy tối đa khả năng lãnh đạo và tầm nhìn chiến lược. Trong công việc, bạn thường gặp được quý nhân phù trợ vào những thời điểm quan trọng. Sự nghiệp có xu hướng phát triển mạnh nhất trong độ tuổi trung niên (35-50 tuổi). Bạn có khả năng xây dựng uy tín và danh tiếng tốt trong lĩnh vực của mình. Hãy kiên trì với con đường đã chọn và không nên thay đổi hướng đi quá nhiều lần. Các ngành nghề phù hợp: quản lý, tài chính, công nghệ, luật, hoặc các ngành đòi hỏi tính chính xác cao.',
            strengths: [
                'Có khả năng lãnh đạo và tổ chức xuất sắc',
                'Tầm nhìn chiến lược tốt',
                'Được quý nhân phù trợ',
                'Xây dựng được uy tín và danh tiếng'
            ],
            weaknesses: [
                'Đôi khi quá cứng nhắc trong quản lý',
                'Có thể thiếu sự linh hoạt',
                'Dễ bị stress khi áp lực cao'
            ],
            advice: [
                'Kiên trì với con đường đã chọn',
                'Xây dựng mạng lưới quan hệ tốt',
                'Học hỏi từ những người có kinh nghiệm',
                'Phát huy khả năng tổ chức và lãnh đạo',
                'Giữ nguyên tắc nhưng linh hoạt trong cách làm'
            ],
            warnings: [
                'Tránh thay đổi hướng đi quá nhiều lần',
                'Cẩn trọng với các quyết định quan trọng',
                'Chú ý cân bằng giữa công việc và cuộc sống'
            ]
        },
        'phu_the': {
            summary: 'Tình duyên của bạn có xu hướng đến muộn nhưng khi đến sẽ rất bền vững và hạnh phúc.',
            detailed: 'Người phối ngẫu của bạn sẽ là chỗ dựa tinh thần vững chắc, biết lo toan và vun vén cho gia đình. Họ có thể là người trầm tĩnh, chín chắn và có tư duy thực tế, phù hợp với tính cách của bạn. Mối quan hệ hôn nhân của bạn sẽ trở nên hài hòa hơn sau khi trải qua giai đoạn từ 3-5 năm đầu, khi cả hai đã hiểu nhau sâu sắc hơn. Bạn và người ấy sẽ cùng nhau xây dựng một gia đình ổn định và hạnh phúc. Hãy kiên nhẫn và biết lắng nghe đối phương để xây dựng hạnh phúc lâu dài. Người phù hợp với bạn thường là người mệnh Thổ hoặc Thủy.',
            strengths: [
                'Mối quan hệ bền vững và lâu dài',
                'Người phối ngẫu đáng tin cậy',
                'Gia đình hòa thuận, ổn định',
                'Cùng nhau xây dựng tương lai'
            ],
            weaknesses: [
                'Tình duyên đến muộn',
                'Có thể gặp khó khăn trong giai đoạn đầu',
                'Đôi khi thiếu sự lãng mạn'
            ],
            advice: [
                'Kiên nhẫn chờ đợi người phù hợp',
                'Biết lắng nghe và thấu hiểu đối phương',
                'Xây dựng mối quan hệ dựa trên sự tin cậy',
                'Dành thời gian chất lượng cho nhau',
                'Tránh quá cứng nhắc trong các mối quan hệ'
            ],
            warnings: [
                'Tránh vội vàng trong hôn nhân',
                'Cẩn trọng với những người không chân thành',
                'Chú ý giao tiếp để tránh hiểu lầm'
            ]
        },
        'phuc_duc': {
            summary: 'Bạn được hưởng phúc đức từ tổ tiên và gia đình, thường gặp dữ hóa lành trong những lúc khó khăn.',
            detailed: 'Tâm tính của bạn lương thiện, thích giúp đỡ người khác mà không đòi hỏi đền đáp, chính vì vậy bạn thường gặp may mắn bất ngờ ở những thời điểm không ngờ tới. Bạn có phúc phần tốt từ tổ tiên, được gia đình hậu thuẫn mạnh mẽ. Tinh thần của bạn luôn lạc quan và biết tìm niềm vui trong cuộc sống đơn giản. Về già, bạn sẽ được tận hưởng tuổi thọ cao và sức khỏe tốt nhờ phước đức tích lũy. Những việc làm tốt của bạn sẽ được đền đáp xứng đáng.',
            strengths: [
                'Được phúc đức từ tổ tiên',
                'Tâm tính lương thiện',
                'Thường gặp may mắn bất ngờ',
                'Tuổi thọ cao, sức khỏe tốt'
            ],
            weaknesses: [
                'Đôi khi quá tin tưởng người khác',
                'Có thể bị lợi dụng lòng tốt'
            ],
            advice: [
                'Tiếp tục làm việc thiện và giúp đỡ người khác',
                'Trân trọng phúc đức từ tổ tiên',
                'Giữ tinh thần lạc quan trong mọi hoàn cảnh',
                'Tích lũy phước đức cho tương lai',
                'Biết phân biệt người thật lòng và giả dối'
            ],
            warnings: [
                'Cẩn trọng với những người lợi dụng lòng tốt',
                'Tránh quá tin tưởng vào người khác',
                'Chú ý bảo vệ bản thân'
            ]
        },
        'thien_di': {
            summary: 'Ra ngoài xa nhà thường đem lại may mắn và thành công cho bạn.',
            detailed: 'Bạn được nhiều người quý mến và dễ dàng xây dựng mối quan hệ tốt đẹp ở những nơi mới. Nếu có cơ hội đi xa lập nghiệp hoặc công việc yêu cầu thường xuyên di chuyển, bạn sẽ gặp nhiều thuận lợi và phát triển tốt hơn so với ở lại quê nhà. Du lịch và khám phá những vùng đất mới cũng mang lại cho bạn nhiều cảm hứng và cơ hội kinh doanh. Bạn có khả năng thích nghi tốt với môi trường mới và học hỏi nhanh. Hãy mạnh dạn bước ra khỏi vùng an toàn để khám phá những cơ hội mới.',
            strengths: [
                'Thích nghi tốt với môi trường mới',
                'Xây dựng mối quan hệ tốt ở nơi mới',
                'Gặp nhiều cơ hội khi đi xa',
                'Học hỏi nhanh từ những trải nghiệm mới'
            ],
            weaknesses: [
                'Có thể cảm thấy nhớ nhà',
                'Đôi khi thiếu sự ổn định',
                'Cần thời gian để thích nghi'
            ],
            advice: [
                'Mạnh dạn đi xa lập nghiệp nếu có cơ hội',
                'Tận dụng các cơ hội du lịch và khám phá',
                'Xây dựng mạng lưới quan hệ ở nhiều nơi',
                'Học hỏi từ những trải nghiệm mới',
                'Giữ liên lạc với gia đình và bạn bè'
            ],
            warnings: [
                'Cẩn trọng khi đi đến những nơi xa lạ',
                'Tránh quá vội vàng trong các quyết định',
                'Chú ý an toàn khi đi du lịch'
            ]
        },
        'dien_trach': {
            summary: 'Bạn có phúc lộc về đất đai và nhà cửa.',
            detailed: 'Dù xuất phát điểm có thể khiêm tốn nhưng về sau bạn sẽ sở hữu nhiều bất động sản có giá trị. Ngôi nhà của bạn luôn ấm áp, êm ấm và là nơi mọi người muốn quay về. Gia đình bạn sống hòa thuận, ít tranh cãi và xung đột. Bạn có khả năng quản lý và đầu tư vào bất động sản một cách thông minh. Nên đầu tư vào việc mua đất hoặc nhà càng sớm càng tốt vì đây sẽ là nguồn tài sản bền vững và tăng giá theo thời gian. Tránh bán tài sản đất đai khi chưa thực sự cần thiết.',
            strengths: [
                'Có phúc lộc về đất đai và nhà cửa',
                'Gia đình hòa thuận, ấm áp',
                'Khả năng đầu tư bất động sản tốt',
                'Tài sản tăng giá theo thời gian'
            ],
            weaknesses: [
                'Có thể đầu tư quá nhiều vào bất động sản',
                'Đôi khi khó quyết định khi nào nên bán'
            ],
            advice: [
                'Đầu tư vào đất đai và nhà cửa càng sớm càng tốt',
                'Quản lý tài sản một cách thông minh',
                'Tránh bán tài sản khi chưa cần thiết',
                'Xây dựng ngôi nhà ấm áp và hòa thuận',
                'Tận dụng giá trị của bất động sản'
            ],
            warnings: [
                'Cẩn trọng với các giao dịch bất động sản',
                'Tránh đầu tư quá mức vào một nơi',
                'Chú ý các khoản chi phí bảo trì'
            ]
        },
        'tu_tuc': {
            summary: 'Con cái của bạn thông minh, học giỏi và hiếu thảo với cha mẹ.',
            detailed: 'Bạn có duyên với việc nuôi dạy con thành người có ích cho xã hội. Con cái sẽ là niềm tự hào của bạn và về già sẽ lo lắng chu đáo cho bạn. Mối quan hệ giữa bạn và con cái rất tốt, dựa trên sự tôn trọng và yêu thương chân thành. Bạn sẽ dạy con những giá trị đạo đức tốt và cách sống có nguyên tắc. Nếu chưa có con, đừng lo lắng vì khi duyên đến, bạn sẽ có con khỏe mạnh và thông minh. Hãy dành thời gian chất lượng cho con cái để xây dựng mối quan hệ bền chặt.',
            strengths: [
                'Con cái thông minh, hiếu thảo',
                'Mối quan hệ tốt với con cái',
                'Nuôi dạy con thành công',
                'Được con cái chăm sóc khi về già'
            ],
            weaknesses: [
                'Có thể quá nghiêm khắc với con',
                'Đôi khi thiếu sự linh hoạt trong cách dạy con'
            ],
            advice: [
                'Dành thời gian chất lượng cho con cái',
                'Dạy con những giá trị đạo đức tốt',
                'Cân bằng giữa nghiêm khắc và yêu thương',
                'Lắng nghe và thấu hiểu con cái',
                'Tạo môi trường giáo dục tốt cho con'
            ],
            warnings: [
                'Tránh quá nghiêm khắc với con',
                'Cẩn trọng với các phương pháp giáo dục',
                'Chú ý sức khỏe của con cái'
            ]
        },
        'phu_mau': {
            summary: 'Cha mẹ của bạn có sức khỏe tốt và sống thọ.',
            detailed: 'Mối quan hệ giữa bạn và cha mẹ hòa thuận, tuy đôi khi có thể có những bất đồng nhỏ nhưng đều được giải quyết dễ dàng. Bạn được gia đình hậu thuẫn mạnh mẽ trong những quyết định quan trọng của cuộc đời. Cha mẹ là nguồn động viên tinh thần giúp bạn vượt qua khó khăn. Bạn sẽ học được nhiều bài học quý giá từ cha mẹ về cách sống và cách làm người. Hãy dành thời gian quan tâm và chăm sóc cha mẹ khi họ về già, đó là cách đền đáp công ơn sinh thành dưỡng dục.',
            strengths: [
                'Cha mẹ khỏe mạnh, sống thọ',
                'Mối quan hệ hòa thuận với cha mẹ',
                'Được gia đình hậu thuẫn',
                'Học được nhiều bài học quý giá'
            ],
            weaknesses: [
                'Có thể có những bất đồng nhỏ',
                'Đôi khi khó thể hiện cảm xúc'
            ],
            advice: [
                'Dành thời gian quan tâm cha mẹ',
                'Lắng nghe lời khuyên từ cha mẹ',
                'Chăm sóc cha mẹ khi về già',
                'Trân trọng công ơn sinh thành',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh để những bất đồng nhỏ trở thành lớn',
                'Cẩn trọng với các quyết định quan trọng',
                'Chú ý sức khỏe của cha mẹ'
            ]
        },
        'huynh_de': {
            summary: 'Anh chị em ruột thịt của bạn rất hòa thuận và biết đùm bọc, giúp đỡ lẫn nhau.',
            detailed: 'Mối quan hệ anh em là một trong những chỗ dựa tinh thần quan trọng của bạn. Có thể bạn sẽ hợp tác làm ăn với anh chị em trong một số giai đoạn của cuộc đời và đem lại kết quả tốt đẹp. Anh chị em của bạn thường là những người đáng tin cậy và sẵn sàng giúp đỡ khi bạn gặp khó khăn. Tuy nhiên, cần có sự minh bạch trong tài chính để tránh hiểu lầm không đáng có. Hãy luôn trân trọng tình cảm anh em vì đó là mối quan hệ máu mủ quý giá.',
            strengths: [
                'Anh chị em hòa thuận',
                'Đùm bọc và giúp đỡ lẫn nhau',
                'Có thể hợp tác làm ăn',
                'Chỗ dựa tinh thần quan trọng'
            ],
            weaknesses: [
                'Có thể có hiểu lầm về tài chính',
                'Đôi khi thiếu sự minh bạch'
            ],
            advice: [
                'Trân trọng tình cảm anh em',
                'Minh bạch trong các giao dịch tài chính',
                'Hợp tác làm ăn một cách công bằng',
                'Giúp đỡ anh chị em khi cần',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh hiểu lầm về tài chính',
                'Cẩn trọng với các hợp đồng làm ăn',
                'Chú ý sự minh bạch trong giao dịch'
            ]
        },
        'no_boc': {
            summary: 'Bạn có nhiều bạn bè và người quen nhưng người tri kỷ thực sự thì ít.',
            detailed: 'Cần cẩn trọng trong việc chọn đối tác làm ăn hoặc người giúp việc để tránh bị lợi dụng hoặc phản bội. Bạn có khả năng xây dựng mối quan hệ tốt với nhiều người nhưng cần biết phân biệt người thật lòng và người giả dối. Không nên tin tưởng hoàn toàn vào lời nói ngọt ngào mà hãy quan sát hành động thực tế. Tuy nhiên, những người bạn thật sự của bạn sẽ là những người rất chân thành và sẵn sàng giúp đỡ bạn khi khó khăn. Hãy biết trân trọng những người bạn thật lòng.',
            strengths: [
                'Có nhiều bạn bè và người quen',
                'Khả năng xây dựng mối quan hệ tốt',
                'Có những người bạn chân thành',
                'Được giúp đỡ khi khó khăn'
            ],
            weaknesses: [
                'Người tri kỷ thực sự ít',
                'Có thể bị lợi dụng',
                'Khó phân biệt người thật lòng và giả dối'
            ],
            advice: [
                'Biết phân biệt người thật lòng và giả dối',
                'Quan sát hành động thay vì chỉ nghe lời nói',
                'Cẩn trọng trong việc chọn đối tác',
                'Trân trọng những người bạn chân thành',
                'Xây dựng mối quan hệ dựa trên sự tin cậy'
            ],
            warnings: [
                'Tránh tin tưởng quá mức vào người khác',
                'Cẩn trọng với các đối tác làm ăn',
                'Chú ý những người có ý đồ không tốt'
            ]
        },
        'tat_ach': {
            summary: 'Sức khỏe tổng thể của bạn tốt, ít ốm đau lặt vặt.',
            detailed: 'Tuy nhiên, do làm việc nhiều và stress, bạn cần chú ý đến việc nghỉ ngơi và thư giãn đầy đủ. Các vấn đề về sức khỏe có thể xuất hiện chủ yếu liên quan đến hệ hô hấp, da liễu hoặc xương khớp khi bạn bước vào tuổi trung niên và về già. Bạn cần chú ý đến việc bảo vệ phổi và hệ hô hấp, tránh hút thuốc và môi trường ô nhiễm. Nên duy trì thói quen tập thể dục đều đặn, ăn uống điều độ và khám sức khỏe định kỳ để phát hiện sớm các vấn đề tiềm ẩn. Tâm lý ổn định sẽ giúp sức khỏe thể chất tốt hơn.',
            strengths: [
                'Sức khỏe tổng thể tốt',
                'Ít ốm đau lặt vặt',
                'Có khả năng phục hồi nhanh',
                'Tuổi thọ cao nếu biết chăm sóc'
            ],
            weaknesses: [
                'Dễ bị stress do làm việc nhiều',
                'Có thể có vấn đề về hô hấp',
                'Cần chú ý đến xương khớp khi về già'
            ],
            advice: [
                'Nghỉ ngơi và thư giãn đầy đủ',
                'Tập thể dục đều đặn',
                'Ăn uống điều độ và lành mạnh',
                'Khám sức khỏe định kỳ',
                'Bảo vệ hệ hô hấp, tránh môi trường ô nhiễm',
                'Giữ tâm lý ổn định'
            ],
            warnings: [
                'Tránh làm việc quá sức',
                'Cẩn trọng với các vấn đề về hô hấp',
                'Chú ý các dấu hiệu bất thường về sức khỏe',
                'Tránh hút thuốc và môi trường độc hại'
            ]
        }
    },
    // Tiếp tục với các mệnh khác...
    'Mộc': {
        'menh': {
            summary: 'Bạn thuộc mệnh Mộc - người có tính cách ôn hòa, điềm tĩnh và giàu lòng nhân ái.',
            detailed: 'Bạn thích sự tự do, ghét sự gò bó và có tư duy sáng tạo xuất sắc. Bản chất của bạn thiên về sự linh hoạt, thích nghi và khả năng phát triển không ngừng. Bạn có khả năng thích ứng tốt với mọi hoàn cảnh và luôn tìm cách phát triển bản thân. Tuy nhiên, đôi khi bạn "cả thèm chóng chán" và thiếu sự kiên định với mục tiêu. Cuộc đời bạn sẽ có nhiều thay đổi và cơ hội mới, nhưng cần học cách tập trung và kiên trì hơn. Về già sẽ an nhàn nhờ sự tích lũy kinh nghiệm và mạng lưới quan hệ rộng.',
            strengths: [
                'Tư duy sáng tạo, linh hoạt',
                'Khả năng thích nghi tốt',
                'Giàu lòng nhân ái',
                'Có nhiều ý tưởng mới',
                'Thích nghi với mọi hoàn cảnh'
            ],
            weaknesses: [
                'Thiếu sự kiên định',
                'Dễ "cả thèm chóng chán"',
                'Có thể thiếu tập trung',
                'Khó hoàn thành những việc dài hạn'
            ],
            advice: [
                'Cần kiên định hơn với mục tiêu của mình',
                'Tránh "cả thèm chóng chán"',
                'Học cách tập trung và hoàn thành công việc',
                'Tận dụng khả năng sáng tạo',
                'Xây dựng thói quen làm việc bền bỉ'
            ],
            warnings: [
                'Tránh thay đổi quá nhiều lần',
                'Cẩn trọng với các quyết định vội vàng',
                'Chú ý đến việc hoàn thành những gì đã bắt đầu'
            ],
            luckyElements: {
                colors: ['Xanh lá', 'Đen', 'Xanh dương'],
                numbers: ['3', '4', '1', '9'],
                directions: ['Đông', 'Đông Nam'],
                times: ['Dần (03h-05h)', 'Mão (05h-07h)', 'Tỵ (09h-11h)', 'Ngọ (11h-13h)']
            }
        },
        // ... (sẽ tiếp tục với các cung khác cho mệnh Mộc)
        'tai_bach': {
            summary: 'Tài lộc của bạn đến từ nhiều nguồn khác nhau, đặc biệt là các hoạt động sáng tạo.',
            detailed: 'Bạn có duyên với các ngành nghề liên quan đến nghệ thuật, giáo dục, hoặc các hoạt động kinh doanh sáng tạo. Khả năng tài chính sẽ tăng dần theo thời gian khi bạn phát triển kỹ năng và mạng lưới quan hệ. Bạn phù hợp với các công việc tự do hoặc kinh doanh nhỏ lẻ. Tuy nhiên, cần quản lý chi tiêu một cách cẩn thận vì bạn có xu hướng chi tiêu theo cảm hứng. Nên đầu tư vào giáo dục và phát triển kỹ năng để tăng thu nhập.',
            strengths: [
                'Nhiều nguồn thu nhập',
                'Phù hợp với công việc sáng tạo',
                'Tài lộc tăng dần theo thời gian',
                'Có khả năng tạo ra giá trị mới'
            ],
            weaknesses: [
                'Chi tiêu theo cảm hứng',
                'Thiếu kế hoạch tài chính dài hạn',
                'Có thể đầu tư không hiệu quả'
            ],
            advice: [
                'Quản lý chi tiêu một cách cẩn thận',
                'Đầu tư vào giáo dục và phát triển kỹ năng',
                'Tạo nhiều nguồn thu nhập',
                'Có kế hoạch tài chính rõ ràng',
                'Tận dụng khả năng sáng tạo để kiếm tiền'
            ],
            warnings: [
                'Tránh chi tiêu quá mức',
                'Cẩn trọng với các khoản đầu tư',
                'Chú ý các khoản chi không cần thiết'
            ]
        },
        'quan_loc': {
            summary: 'Sự nghiệp của bạn sẽ phát triển tốt trong các lĩnh vực sáng tạo và giáo dục.',
            detailed: 'Bạn phù hợp với các nghề liên quan đến nghệ thuật, giáo dục, tư vấn, hoặc các hoạt động kinh doanh sáng tạo. Sự nghiệp của bạn sẽ có nhiều thay đổi và cơ hội mới, nhưng cần học cách tập trung và kiên trì hơn. Bạn có khả năng truyền cảm hứng và động viên người khác. Trong công việc, bạn thường gặp được những người hỗ trợ và cơ hội phát triển. Hãy tận dụng khả năng sáng tạo và linh hoạt của mình để phát triển sự nghiệp.',
            strengths: [
                'Phù hợp với các lĩnh vực sáng tạo',
                'Có khả năng truyền cảm hứng',
                'Gặp được nhiều cơ hội phát triển',
                'Linh hoạt trong công việc'
            ],
            weaknesses: [
                'Thiếu sự kiên định',
                'Có thể thay đổi công việc quá nhiều',
                'Khó tập trung vào một việc lâu dài'
            ],
            advice: [
                'Tập trung vào một lĩnh vực cụ thể',
                'Tận dụng khả năng sáng tạo',
                'Xây dựng mạng lưới quan hệ tốt',
                'Học cách kiên trì và hoàn thành công việc',
                'Tìm công việc phù hợp với tính cách'
            ],
            warnings: [
                'Tránh thay đổi công việc quá nhiều',
                'Cẩn trọng với các quyết định nghề nghiệp',
                'Chú ý đến việc phát triển kỹ năng chuyên môn'
            ]
        },
        // ... (tiếp tục các cung khác)
        'phu_the': {
            summary: 'Tình duyên của bạn đến tự nhiên và hạnh phúc, dựa trên sự hiểu biết lẫn nhau.',
            detailed: 'Người phối ngẫu của bạn sẽ là người hiểu và trân trọng tính cách sáng tạo của bạn. Họ có thể là người linh hoạt, cởi mở và cùng bạn chia sẻ những ý tưởng mới. Mối quan hệ của bạn sẽ phát triển tốt dựa trên sự tôn trọng và tự do cá nhân. Bạn và người ấy sẽ cùng nhau khám phá và phát triển. Hãy dành thời gian để hiểu và chia sẻ với đối phương.',
            strengths: [
                'Tình duyên tự nhiên và hạnh phúc',
                'Người phối ngẫu hiểu và trân trọng bạn',
                'Mối quan hệ dựa trên sự tôn trọng',
                'Cùng nhau phát triển'
            ],
            weaknesses: [
                'Có thể thiếu sự cam kết',
                'Đôi khi quá tự do trong mối quan hệ'
            ],
            advice: [
                'Dành thời gian để hiểu đối phương',
                'Chia sẻ những ý tưởng và cảm xúc',
                'Giữ sự tự do nhưng vẫn cam kết',
                'Xây dựng mối quan hệ dựa trên sự tôn trọng',
                'Tránh quá tự do trong mối quan hệ'
            ],
            warnings: [
                'Tránh thiếu sự cam kết',
                'Cẩn trọng với các mối quan hệ không rõ ràng',
                'Chú ý đến nhu cầu của đối phương'
            ]
        },
        'phuc_duc': {
            summary: 'Bạn có phúc đức tốt từ việc giúp đỡ người khác và sống lương thiện.',
            detailed: 'Tâm tính của bạn lương thiện, thích giúp đỡ người khác và luôn tìm cách làm cho cuộc sống tốt đẹp hơn. Bạn có khả năng truyền cảm hứng và động viên người khác. Những việc làm tốt của bạn sẽ được đền đáp xứng đáng. Về già, bạn sẽ được tận hưởng tuổi thọ cao và sức khỏe tốt nhờ phước đức tích lũy. Hãy tiếp tục làm việc thiện và giúp đỡ người khác.',
            strengths: [
                'Phúc đức tốt từ việc giúp đỡ người khác',
                'Tâm tính lương thiện',
                'Truyền cảm hứng và động viên người khác',
                'Tuổi thọ cao, sức khỏe tốt'
            ],
            weaknesses: [
                'Có thể bị lợi dụng lòng tốt',
                'Đôi khi quá tin tưởng người khác'
            ],
            advice: [
                'Tiếp tục làm việc thiện',
                'Giúp đỡ người khác một cách khôn ngoan',
                'Truyền cảm hứng và động viên người khác',
                'Trân trọng phước đức tích lũy',
                'Biết phân biệt người thật lòng và giả dối'
            ],
            warnings: [
                'Cẩn trọng với những người lợi dụng lòng tốt',
                'Tránh quá tin tưởng vào người khác',
                'Chú ý bảo vệ bản thân'
            ]
        },
        'thien_di': {
            summary: 'Đi xa và khám phá những nơi mới sẽ mang lại nhiều cơ hội và may mắn cho bạn.',
            detailed: 'Bạn có khả năng thích nghi tốt với môi trường mới và học hỏi nhanh từ những trải nghiệm. Du lịch và khám phá những vùng đất mới sẽ mang lại cho bạn nhiều cảm hứng và cơ hội phát triển. Bạn có thể gặp được những người bạn mới và cơ hội kinh doanh ở những nơi mới. Hãy mạnh dạn bước ra khỏi vùng an toàn để khám phá những cơ hội mới.',
            strengths: [
                'Thích nghi tốt với môi trường mới',
                'Học hỏi nhanh từ trải nghiệm',
                'Gặp nhiều cơ hội khi đi xa',
                'Xây dựng mối quan hệ tốt ở nơi mới'
            ],
            weaknesses: [
                'Có thể cảm thấy nhớ nhà',
                'Đôi khi thiếu sự ổn định',
                'Cần thời gian để thích nghi'
            ],
            advice: [
                'Mạnh dạn đi xa và khám phá',
                'Tận dụng các cơ hội du lịch',
                'Xây dựng mạng lưới quan hệ ở nhiều nơi',
                'Học hỏi từ những trải nghiệm mới',
                'Giữ liên lạc với gia đình và bạn bè'
            ],
            warnings: [
                'Cẩn trọng khi đi đến những nơi xa lạ',
                'Tránh quá vội vàng trong các quyết định',
                'Chú ý an toàn khi đi du lịch'
            ]
        },
        'dien_trach': {
            summary: 'Bạn có phúc lộc về nhà cửa, ngôi nhà của bạn luôn ấm áp và đầy sức sống.',
            detailed: 'Ngôi nhà của bạn sẽ là nơi đầy sức sống với nhiều cây xanh và không gian mở. Gia đình bạn sống hòa thuận và có nhiều hoạt động vui vẻ. Bạn có khả năng tạo ra một không gian sống thoải mái và sáng tạo. Nên đầu tư vào việc trang trí và làm đẹp ngôi nhà để tạo ra một môi trường sống tốt. Tránh để ngôi nhà quá lộn xộn hoặc thiếu sự chăm sóc.',
            strengths: [
                'Ngôi nhà ấm áp và đầy sức sống',
                'Gia đình hòa thuận',
                'Không gian sống thoải mái',
                'Có nhiều hoạt động vui vẻ'
            ],
            weaknesses: [
                'Có thể thiếu sự tổ chức',
                'Đôi khi ngôi nhà quá lộn xộn'
            ],
            advice: [
                'Đầu tư vào việc trang trí và làm đẹp ngôi nhà',
                'Tạo ra không gian sống thoải mái',
                'Giữ ngôi nhà gọn gàng và sạch sẽ',
                'Tạo ra môi trường sống tốt',
                'Tránh để ngôi nhà quá lộn xộn'
            ],
            warnings: [
                'Tránh để ngôi nhà thiếu sự chăm sóc',
                'Cẩn trọng với các khoản chi phí trang trí',
                'Chú ý đến việc bảo trì ngôi nhà'
            ]
        },
        'tu_tuc': {
            summary: 'Con cái của bạn thông minh, sáng tạo và có nhiều tài năng.',
            detailed: 'Bạn có duyên với việc nuôi dạy con thành người sáng tạo và độc lập. Con cái sẽ là niềm tự hào của bạn và sẽ phát triển tốt trong các lĩnh vực nghệ thuật hoặc giáo dục. Mối quan hệ giữa bạn và con cái rất tốt, dựa trên sự tôn trọng và tự do. Bạn sẽ dạy con cách tư duy sáng tạo và độc lập. Hãy dành thời gian để khám phá và phát triển tài năng của con cái.',
            strengths: [
                'Con cái thông minh và sáng tạo',
                'Mối quan hệ tốt với con cái',
                'Nuôi dạy con thành công',
                'Con cái có nhiều tài năng'
            ],
            weaknesses: [
                'Có thể thiếu sự nghiêm khắc',
                'Đôi khi quá tự do với con'
            ],
            advice: [
                'Dành thời gian để khám phá tài năng của con',
                'Dạy con cách tư duy sáng tạo',
                'Cân bằng giữa tự do và kỷ luật',
                'Khuyến khích con phát triển tài năng',
                'Tạo môi trường giáo dục tốt cho con'
            ],
            warnings: [
                'Tránh quá tự do với con',
                'Cẩn trọng với các phương pháp giáo dục',
                'Chú ý đến việc phát triển kỹ năng của con'
            ]
        },
        'phu_mau': {
            summary: 'Cha mẹ của bạn khỏe mạnh và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ giữa bạn và cha mẹ hòa thuận và cởi mở. Bạn được gia đình hỗ trợ trong việc phát triển và khám phá. Cha mẹ là nguồn động viên tinh thần giúp bạn vượt qua khó khăn. Bạn sẽ học được nhiều bài học quý giá từ cha mẹ về cách sống và cách làm người. Hãy dành thời gian quan tâm và chăm sóc cha mẹ khi họ về già.',
            strengths: [
                'Cha mẹ khỏe mạnh',
                'Mối quan hệ hòa thuận với cha mẹ',
                'Được gia đình hỗ trợ',
                'Học được nhiều bài học quý giá'
            ],
            weaknesses: [
                'Có thể có những bất đồng nhỏ',
                'Đôi khi khó thể hiện cảm xúc'
            ],
            advice: [
                'Dành thời gian quan tâm cha mẹ',
                'Lắng nghe lời khuyên từ cha mẹ',
                'Chăm sóc cha mẹ khi về già',
                'Trân trọng công ơn sinh thành',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh để những bất đồng nhỏ trở thành lớn',
                'Cẩn trọng với các quyết định quan trọng',
                'Chú ý sức khỏe của cha mẹ'
            ]
        },
        'huynh_de': {
            summary: 'Anh chị em của bạn hòa thuận và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ anh em là một trong những chỗ dựa tinh thần quan trọng của bạn. Anh chị em của bạn thường là những người cởi mở và sẵn sàng giúp đỡ khi bạn gặp khó khăn. Có thể bạn sẽ hợp tác làm ăn với anh chị em trong một số giai đoạn và đem lại kết quả tốt đẹp. Tuy nhiên, cần có sự minh bạch trong tài chính để tránh hiểu lầm. Hãy luôn trân trọng tình cảm anh em.',
            strengths: [
                'Anh chị em hòa thuận',
                'Đùm bọc và giúp đỡ lẫn nhau',
                'Có thể hợp tác làm ăn',
                'Chỗ dựa tinh thần quan trọng'
            ],
            weaknesses: [
                'Có thể có hiểu lầm về tài chính',
                'Đôi khi thiếu sự minh bạch'
            ],
            advice: [
                'Trân trọng tình cảm anh em',
                'Minh bạch trong các giao dịch tài chính',
                'Hợp tác làm ăn một cách công bằng',
                'Giúp đỡ anh chị em khi cần',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh hiểu lầm về tài chính',
                'Cẩn trọng với các hợp đồng làm ăn',
                'Chú ý sự minh bạch trong giao dịch'
            ]
        },
        'no_boc': {
            summary: 'Bạn có nhiều bạn bè và người quen, đặc biệt là trong các lĩnh vực sáng tạo.',
            detailed: 'Bạn có khả năng xây dựng mối quan hệ tốt với nhiều người từ các lĩnh vực khác nhau. Những người bạn của bạn thường là những người sáng tạo và cởi mở. Tuy nhiên, cần cẩn trọng trong việc chọn đối tác làm ăn để tránh bị lợi dụng. Hãy biết phân biệt người thật lòng và người giả dối. Những người bạn thật sự của bạn sẽ là những người rất chân thành và sẵn sàng giúp đỡ bạn khi khó khăn.',
            strengths: [
                'Có nhiều bạn bè và người quen',
                'Khả năng xây dựng mối quan hệ tốt',
                'Có những người bạn chân thành',
                'Được giúp đỡ khi khó khăn'
            ],
            weaknesses: [
                'Có thể bị lợi dụng',
                'Khó phân biệt người thật lòng và giả dối'
            ],
            advice: [
                'Biết phân biệt người thật lòng và giả dối',
                'Cẩn trọng trong việc chọn đối tác',
                'Trân trọng những người bạn chân thành',
                'Xây dựng mối quan hệ dựa trên sự tin cậy',
                'Tận dụng mạng lưới quan hệ để phát triển'
            ],
            warnings: [
                'Tránh tin tưởng quá mức vào người khác',
                'Cẩn trọng với các đối tác làm ăn',
                'Chú ý những người có ý đồ không tốt'
            ]
        },
        'tat_ach': {
            summary: 'Sức khỏe tổng thể của bạn tốt, nhưng cần chú ý đến hệ tiêu hóa và gan.',
            detailed: 'Bạn có sức khỏe tốt và ít ốm đau lặt vặt. Tuy nhiên, do tính cách dễ thay đổi và đôi khi thiếu sự kiên định, bạn cần chú ý đến việc nghỉ ngơi và thư giãn đầy đủ. Các vấn đề về sức khỏe có thể xuất hiện chủ yếu liên quan đến hệ tiêu hóa, gan hoặc dị ứng khi bạn bước vào tuổi trung niên. Nên duy trì thói quen tập thể dục đều đặn, ăn uống điều độ và khám sức khỏe định kỳ. Tránh thức khuya và làm việc quá sức.',
            strengths: [
                'Sức khỏe tổng thể tốt',
                'Ít ốm đau lặt vặt',
                'Có khả năng phục hồi nhanh',
                'Tuổi thọ cao nếu biết chăm sóc'
            ],
            weaknesses: [
                'Có thể có vấn đề về tiêu hóa',
                'Cần chú ý đến gan',
                'Dễ bị dị ứng'
            ],
            advice: [
                'Nghỉ ngơi và thư giãn đầy đủ',
                'Tập thể dục đều đặn',
                'Ăn uống điều độ và lành mạnh',
                'Khám sức khỏe định kỳ',
                'Tránh thức khuya và làm việc quá sức',
                'Chú ý đến hệ tiêu hóa và gan'
            ],
            warnings: [
                'Tránh làm việc quá sức',
                'Cẩn trọng với các vấn đề về tiêu hóa',
                'Chú ý các dấu hiệu bất thường về sức khỏe',
                'Tránh thức khuya và uống rượu bia quá nhiều'
            ]
        }
    },
    // Tiếp tục với Thủy, Hỏa, Thổ... (sẽ làm tương tự)
    'Thủy': {
        'menh': {
            summary: 'Bạn thuộc mệnh Thủy - người thông minh, khéo léo và có khả năng giao tiếp tốt.',
            detailed: 'Bạn nhạy cảm, tinh tế và biết cách lắng nghe người khác. Bản chất của bạn thiên về sự linh hoạt, thích nghi và khả năng thấu hiểu. Bạn có khả năng giao tiếp xuất sắc và dễ dàng tạo được thiện cảm với mọi người. Tuy nhiên, đôi khi bạn hay lo âu và suy nghĩ quá nhiều, dễ bị cảm xúc chi phối. Cuộc đời bạn sẽ có nhiều thay đổi và cơ hội mới, nhưng cần học cách giữ tinh thần lạc quan và quyết đoán hơn. Về già sẽ an nhàn nhờ khả năng thích nghi và mạng lưới quan hệ rộng.',
            strengths: [
                'Thông minh, khéo léo',
                'Khả năng giao tiếp tốt',
                'Nhạy cảm, tinh tế',
                'Biết cách lắng nghe',
                'Dễ tạo thiện cảm với mọi người'
            ],
            weaknesses: [
                'Hay lo âu và suy nghĩ quá nhiều',
                'Dễ bị cảm xúc chi phối',
                'Thiếu sự quyết đoán',
                'Có thể thiếu tự tin'
            ],
            advice: [
                'Nên giữ tinh thần lạc quan',
                'Tránh để cảm xúc chi phối các quyết định quan trọng',
                'Học cách quyết đoán hơn',
                'Tận dụng khả năng giao tiếp',
                'Xây dựng sự tự tin'
            ],
            warnings: [
                'Tránh suy nghĩ quá nhiều',
                'Cẩn trọng với các quyết định dựa trên cảm xúc',
                'Chú ý đến sức khỏe tinh thần'
            ],
            luckyElements: {
                colors: ['Đen', 'Xanh dương', 'Trắng', 'Xám'],
                numbers: ['1', '6', '7'],
                directions: ['Bắc'],
                times: ['Tý (23h-01h)', 'Sửu (01h-03h)', 'Thân (15h-17h)', 'Dậu (17h-19h)']
            }
        },
        'tai_bach': {
            summary: 'Tài lộc của bạn đến từ khả năng giao tiếp và các hoạt động liên quan đến dịch vụ.',
            detailed: 'Bạn có duyên với các ngành nghề liên quan đến giao tiếp, tư vấn, hoặc các hoạt động dịch vụ. Khả năng tài chính sẽ tăng dần theo thời gian khi bạn phát triển mạng lưới quan hệ và kỹ năng giao tiếp. Bạn phù hợp với các công việc tự do hoặc kinh doanh nhỏ lẻ dựa trên mối quan hệ. Tuy nhiên, cần quản lý chi tiêu một cách cẩn thận vì bạn có xu hướng chi tiêu theo cảm xúc. Nên đầu tư vào giáo dục và phát triển kỹ năng giao tiếp để tăng thu nhập.',
            strengths: [
                'Nhiều nguồn thu nhập từ giao tiếp',
                'Phù hợp với công việc dịch vụ',
                'Tài lộc tăng dần theo thời gian',
                'Có khả năng tạo mối quan hệ tốt'
            ],
            weaknesses: [
                'Chi tiêu theo cảm xúc',
                'Thiếu kế hoạch tài chính dài hạn',
                'Có thể đầu tư không hiệu quả'
            ],
            advice: [
                'Quản lý chi tiêu một cách cẩn thận',
                'Đầu tư vào giáo dục và phát triển kỹ năng',
                'Tận dụng khả năng giao tiếp để kiếm tiền',
                'Có kế hoạch tài chính rõ ràng',
                'Xây dựng mạng lưới quan hệ tốt'
            ],
            warnings: [
                'Tránh chi tiêu quá mức',
                'Cẩn trọng với các khoản đầu tư',
                'Chú ý các khoản chi không cần thiết'
            ]
        },
        'quan_loc': {
            summary: 'Sự nghiệp của bạn sẽ phát triển tốt trong các lĩnh vực giao tiếp và dịch vụ.',
            detailed: 'Bạn phù hợp với các nghề liên quan đến giao tiếp, tư vấn, giáo dục, hoặc các hoạt động dịch vụ. Sự nghiệp của bạn sẽ có nhiều thay đổi và cơ hội mới, nhưng cần học cách quyết đoán và tự tin hơn. Bạn có khả năng tạo được thiện cảm với mọi người và xây dựng mối quan hệ tốt. Trong công việc, bạn thường gặp được những người hỗ trợ và cơ hội phát triển. Hãy tận dụng khả năng giao tiếp và linh hoạt của mình để phát triển sự nghiệp.',
            strengths: [
                'Phù hợp với các lĩnh vực giao tiếp',
                'Có khả năng tạo thiện cảm',
                'Gặp được nhiều cơ hội phát triển',
                'Linh hoạt trong công việc'
            ],
            weaknesses: [
                'Thiếu sự quyết đoán',
                'Có thể thay đổi công việc quá nhiều',
                'Khó tập trung vào một việc lâu dài'
            ],
            advice: [
                'Tập trung vào một lĩnh vực cụ thể',
                'Tận dụng khả năng giao tiếp',
                'Xây dựng mạng lưới quan hệ tốt',
                'Học cách quyết đoán và tự tin hơn',
                'Tìm công việc phù hợp với tính cách'
            ],
            warnings: [
                'Tránh thay đổi công việc quá nhiều',
                'Cẩn trọng với các quyết định nghề nghiệp',
                'Chú ý đến việc phát triển kỹ năng chuyên môn'
            ]
        },
        'phu_the': {
            summary: 'Tình duyên của bạn đến tự nhiên và hạnh phúc, dựa trên sự hiểu biết và cảm thông.',
            detailed: 'Người phối ngẫu của bạn sẽ là người hiểu và trân trọng tính cách nhạy cảm của bạn. Họ có thể là người ấm áp, biết lắng nghe và cùng bạn chia sẻ những cảm xúc. Mối quan hệ của bạn sẽ phát triển tốt dựa trên sự tôn trọng và cảm thông lẫn nhau. Bạn và người ấy sẽ cùng nhau xây dựng một gia đình ấm áp và hạnh phúc. Hãy dành thời gian để hiểu và chia sẻ với đối phương.',
            strengths: [
                'Tình duyên tự nhiên và hạnh phúc',
                'Người phối ngẫu hiểu và trân trọng bạn',
                'Mối quan hệ dựa trên sự cảm thông',
                'Cùng nhau xây dựng hạnh phúc'
            ],
            weaknesses: [
                'Có thể thiếu sự quyết đoán',
                'Đôi khi quá nhạy cảm trong mối quan hệ'
            ],
            advice: [
                'Dành thời gian để hiểu đối phương',
                'Chia sẻ những cảm xúc và suy nghĩ',
                'Giữ sự cảm thông và tôn trọng',
                'Xây dựng mối quan hệ dựa trên sự tin cậy',
                'Tránh quá nhạy cảm trong mối quan hệ'
            ],
            warnings: [
                'Tránh thiếu sự quyết đoán',
                'Cẩn trọng với các mối quan hệ không rõ ràng',
                'Chú ý đến nhu cầu của đối phương'
            ]
        },
        'phuc_duc': {
            summary: 'Bạn có phúc đức tốt từ việc giúp đỡ người khác và sống lương thiện.',
            detailed: 'Tâm tính của bạn lương thiện, thích giúp đỡ người khác và luôn tìm cách làm cho cuộc sống tốt đẹp hơn. Bạn có khả năng cảm thông và thấu hiểu người khác. Những việc làm tốt của bạn sẽ được đền đáp xứng đáng. Về già, bạn sẽ được tận hưởng tuổi thọ cao và sức khỏe tốt nhờ phước đức tích lũy. Hãy tiếp tục làm việc thiện và giúp đỡ người khác.',
            strengths: [
                'Phúc đức tốt từ việc giúp đỡ người khác',
                'Tâm tính lương thiện',
                'Cảm thông và thấu hiểu người khác',
                'Tuổi thọ cao, sức khỏe tốt'
            ],
            weaknesses: [
                'Có thể bị lợi dụng lòng tốt',
                'Đôi khi quá tin tưởng người khác'
            ],
            advice: [
                'Tiếp tục làm việc thiện',
                'Giúp đỡ người khác một cách khôn ngoan',
                'Cảm thông và thấu hiểu người khác',
                'Trân trọng phước đức tích lũy',
                'Biết phân biệt người thật lòng và giả dối'
            ],
            warnings: [
                'Cẩn trọng với những người lợi dụng lòng tốt',
                'Tránh quá tin tưởng vào người khác',
                'Chú ý bảo vệ bản thân'
            ]
        },
        'thien_di': {
            summary: 'Đi xa và khám phá những nơi mới sẽ mang lại nhiều cơ hội và may mắn cho bạn.',
            detailed: 'Bạn có khả năng thích nghi tốt với môi trường mới và học hỏi nhanh từ những trải nghiệm. Du lịch và khám phá những vùng đất mới sẽ mang lại cho bạn nhiều cảm hứng và cơ hội phát triển. Bạn có thể gặp được những người bạn mới và cơ hội kinh doanh ở những nơi mới. Hãy mạnh dạn bước ra khỏi vùng an toàn để khám phá những cơ hội mới.',
            strengths: [
                'Thích nghi tốt với môi trường mới',
                'Học hỏi nhanh từ trải nghiệm',
                'Gặp nhiều cơ hội khi đi xa',
                'Xây dựng mối quan hệ tốt ở nơi mới'
            ],
            weaknesses: [
                'Có thể cảm thấy nhớ nhà',
                'Đôi khi thiếu sự ổn định',
                'Cần thời gian để thích nghi'
            ],
            advice: [
                'Mạnh dạn đi xa và khám phá',
                'Tận dụng các cơ hội du lịch',
                'Xây dựng mạng lưới quan hệ ở nhiều nơi',
                'Học hỏi từ những trải nghiệm mới',
                'Giữ liên lạc với gia đình và bạn bè'
            ],
            warnings: [
                'Cẩn trọng khi đi đến những nơi xa lạ',
                'Tránh quá vội vàng trong các quyết định',
                'Chú ý an toàn khi đi du lịch'
            ]
        },
        'dien_trach': {
            summary: 'Bạn có phúc lộc về nhà cửa, ngôi nhà của bạn luôn ấm áp và đầy cảm xúc.',
            detailed: 'Ngôi nhà của bạn sẽ là nơi đầy cảm xúc và ấm áp. Gia đình bạn sống hòa thuận và có nhiều hoạt động vui vẻ. Bạn có khả năng tạo ra một không gian sống thoải mái và đầy cảm xúc. Nên đầu tư vào việc trang trí và làm đẹp ngôi nhà để tạo ra một môi trường sống tốt. Tránh để ngôi nhà quá lộn xộn hoặc thiếu sự chăm sóc.',
            strengths: [
                'Ngôi nhà ấm áp và đầy cảm xúc',
                'Gia đình hòa thuận',
                'Không gian sống thoải mái',
                'Có nhiều hoạt động vui vẻ'
            ],
            weaknesses: [
                'Có thể thiếu sự tổ chức',
                'Đôi khi ngôi nhà quá lộn xộn'
            ],
            advice: [
                'Đầu tư vào việc trang trí và làm đẹp ngôi nhà',
                'Tạo ra không gian sống thoải mái',
                'Giữ ngôi nhà gọn gàng và sạch sẽ',
                'Tạo ra môi trường sống tốt',
                'Tránh để ngôi nhà quá lộn xộn'
            ],
            warnings: [
                'Tránh để ngôi nhà thiếu sự chăm sóc',
                'Cẩn trọng với các khoản chi phí trang trí',
                'Chú ý đến việc bảo trì ngôi nhà'
            ]
        },
        'tu_tuc': {
            summary: 'Con cái của bạn thông minh, nhạy cảm và có khả năng giao tiếp tốt.',
            detailed: 'Bạn có duyên với việc nuôi dạy con thành người nhạy cảm và có khả năng giao tiếp tốt. Con cái sẽ là niềm tự hào của bạn và sẽ phát triển tốt trong các lĩnh vực giao tiếp hoặc giáo dục. Mối quan hệ giữa bạn và con cái rất tốt, dựa trên sự cảm thông và hiểu biết. Bạn sẽ dạy con cách giao tiếp và cảm thông với người khác. Hãy dành thời gian để khám phá và phát triển tài năng của con cái.',
            strengths: [
                'Con cái thông minh và nhạy cảm',
                'Mối quan hệ tốt với con cái',
                'Nuôi dạy con thành công',
                'Con cái có khả năng giao tiếp tốt'
            ],
            weaknesses: [
                'Có thể thiếu sự nghiêm khắc',
                'Đôi khi quá nhạy cảm với con'
            ],
            advice: [
                'Dành thời gian để khám phá tài năng của con',
                'Dạy con cách giao tiếp và cảm thông',
                'Cân bằng giữa cảm thông và kỷ luật',
                'Khuyến khích con phát triển tài năng',
                'Tạo môi trường giáo dục tốt cho con'
            ],
            warnings: [
                'Tránh quá nhạy cảm với con',
                'Cẩn trọng với các phương pháp giáo dục',
                'Chú ý đến việc phát triển kỹ năng của con'
            ]
        },
        'phu_mau': {
            summary: 'Cha mẹ của bạn khỏe mạnh và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ giữa bạn và cha mẹ hòa thuận và cởi mở. Bạn được gia đình hỗ trợ trong việc phát triển và khám phá. Cha mẹ là nguồn động viên tinh thần giúp bạn vượt qua khó khăn. Bạn sẽ học được nhiều bài học quý giá từ cha mẹ về cách sống và cách làm người. Hãy dành thời gian quan tâm và chăm sóc cha mẹ khi họ về già.',
            strengths: [
                'Cha mẹ khỏe mạnh',
                'Mối quan hệ hòa thuận với cha mẹ',
                'Được gia đình hỗ trợ',
                'Học được nhiều bài học quý giá'
            ],
            weaknesses: [
                'Có thể có những bất đồng nhỏ',
                'Đôi khi khó thể hiện cảm xúc'
            ],
            advice: [
                'Dành thời gian quan tâm cha mẹ',
                'Lắng nghe lời khuyên từ cha mẹ',
                'Chăm sóc cha mẹ khi về già',
                'Trân trọng công ơn sinh thành',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh để những bất đồng nhỏ trở thành lớn',
                'Cẩn trọng với các quyết định quan trọng',
                'Chú ý sức khỏe của cha mẹ'
            ]
        },
        'huynh_de': {
            summary: 'Anh chị em của bạn hòa thuận và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ anh em là một trong những chỗ dựa tinh thần quan trọng của bạn. Anh chị em của bạn thường là những người cởi mở và sẵn sàng giúp đỡ khi bạn gặp khó khăn. Có thể bạn sẽ hợp tác làm ăn với anh chị em trong một số giai đoạn và đem lại kết quả tốt đẹp. Tuy nhiên, cần có sự minh bạch trong tài chính để tránh hiểu lầm. Hãy luôn trân trọng tình cảm anh em.',
            strengths: [
                'Anh chị em hòa thuận',
                'Đùm bọc và giúp đỡ lẫn nhau',
                'Có thể hợp tác làm ăn',
                'Chỗ dựa tinh thần quan trọng'
            ],
            weaknesses: [
                'Có thể có hiểu lầm về tài chính',
                'Đôi khi thiếu sự minh bạch'
            ],
            advice: [
                'Trân trọng tình cảm anh em',
                'Minh bạch trong các giao dịch tài chính',
                'Hợp tác làm ăn một cách công bằng',
                'Giúp đỡ anh chị em khi cần',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh hiểu lầm về tài chính',
                'Cẩn trọng với các hợp đồng làm ăn',
                'Chú ý sự minh bạch trong giao dịch'
            ]
        },
        'no_boc': {
            summary: 'Bạn có nhiều bạn bè và người quen, đặc biệt là trong các lĩnh vực giao tiếp.',
            detailed: 'Bạn có khả năng xây dựng mối quan hệ tốt với nhiều người từ các lĩnh vực khác nhau. Những người bạn của bạn thường là những người cởi mở và sẵn sàng giúp đỡ. Tuy nhiên, cần cẩn trọng trong việc chọn đối tác làm ăn để tránh bị lợi dụng. Hãy biết phân biệt người thật lòng và người giả dối. Những người bạn thật sự của bạn sẽ là những người rất chân thành và sẵn sàng giúp đỡ bạn khi khó khăn.',
            strengths: [
                'Có nhiều bạn bè và người quen',
                'Khả năng xây dựng mối quan hệ tốt',
                'Có những người bạn chân thành',
                'Được giúp đỡ khi khó khăn'
            ],
            weaknesses: [
                'Có thể bị lợi dụng',
                'Khó phân biệt người thật lòng và giả dối'
            ],
            advice: [
                'Biết phân biệt người thật lòng và giả dối',
                'Cẩn trọng trong việc chọn đối tác',
                'Trân trọng những người bạn chân thành',
                'Xây dựng mối quan hệ dựa trên sự tin cậy',
                'Tận dụng mạng lưới quan hệ để phát triển'
            ],
            warnings: [
                'Tránh tin tưởng quá mức vào người khác',
                'Cẩn trọng với các đối tác làm ăn',
                'Chú ý những người có ý đồ không tốt'
            ]
        },
        'tat_ach': {
            summary: 'Sức khỏe tổng thể của bạn tốt, nhưng cần chú ý đến hệ thần kinh và cảm xúc.',
            detailed: 'Bạn có sức khỏe tốt và ít ốm đau lặt vặt. Tuy nhiên, do tính cách nhạy cảm và đôi khi hay lo âu, bạn cần chú ý đến việc nghỉ ngơi và thư giãn đầy đủ. Các vấn đề về sức khỏe có thể xuất hiện chủ yếu liên quan đến hệ thần kinh, cảm xúc hoặc hệ tiết niệu khi bạn bước vào tuổi trung niên. Nên duy trì thói quen tập thể dục đều đặn, ăn uống điều độ và khám sức khỏe định kỳ. Tránh stress và lo âu quá mức.',
            strengths: [
                'Sức khỏe tổng thể tốt',
                'Ít ốm đau lặt vặt',
                'Có khả năng phục hồi nhanh',
                'Tuổi thọ cao nếu biết chăm sóc'
            ],
            weaknesses: [
                'Có thể có vấn đề về thần kinh',
                'Cần chú ý đến cảm xúc',
                'Dễ bị stress'
            ],
            advice: [
                'Nghỉ ngơi và thư giãn đầy đủ',
                'Tập thể dục đều đặn',
                'Ăn uống điều độ và lành mạnh',
                'Khám sức khỏe định kỳ',
                'Tránh stress và lo âu quá mức',
                'Chú ý đến sức khỏe tinh thần'
            ],
            warnings: [
                'Tránh làm việc quá sức',
                'Cẩn trọng với các vấn đề về thần kinh',
                'Chú ý các dấu hiệu bất thường về sức khỏe',
                'Tránh lo âu và stress quá mức'
            ]
        }
    },
    'Hỏa': {
        'menh': {
            summary: 'Bạn thuộc mệnh Hỏa - người nhiệt huyết, năng động và đầy đam mê.',
            detailed: 'Bạn luôn tràn đầy năng lượng, dám nghĩ dám làm và có tố chất truyền cảm hứng. Bản chất của bạn thiên về sự nhiệt huyết, đam mê và khả năng dẫn dắt người khác. Bạn có khả năng truyền cảm hứng và động viên người khác một cách mạnh mẽ. Tuy nhiên, tính khí có phần nóng nảy và đôi khi thiếu kiên nhẫn. Cuộc đời bạn sẽ có nhiều thăng trầm nhưng luôn đầy màu sắc và đam mê. Về già sẽ an nhàn nhờ sự tích lũy kinh nghiệm và thành tựu.',
            strengths: [
                'Nhiệt huyết, năng động',
                'Dám nghĩ dám làm',
                'Có tố chất truyền cảm hứng',
                'Đầy đam mê',
                'Có khả năng dẫn dắt'
            ],
            weaknesses: [
                'Tính khí nóng nảy',
                'Thiếu kiên nhẫn',
                'Có thể vội vàng',
                'Dễ bị kích động'
            ],
            advice: [
                'Cần học cách kiềm chế cảm xúc',
                'Giữ cái đầu lạnh trong mọi tình huống',
                'Tránh nóng vội hỏng việc lớn',
                'Tận dụng năng lượng tích cực',
                'Học cách kiên nhẫn hơn'
            ],
            warnings: [
                'Tránh quyết định khi đang nóng giận',
                'Cẩn trọng với các hành động vội vàng',
                'Chú ý đến sức khỏe do làm việc quá sức'
            ],
            luckyElements: {
                colors: ['Đỏ', 'Cam', 'Hồng', 'Tím', 'Xanh lá'],
                numbers: ['9', '3', '4'],
                directions: ['Nam'],
                times: ['Dần (03h-05h)', 'Mão (05h-07h)', 'Tỵ (09h-11h)', 'Ngọ (11h-13h)']
            }
        },
        'tai_bach': {
            summary: 'Tài lộc của bạn đến từ các hoạt động năng động và đầy đam mê.',
            detailed: 'Bạn có duyên với các ngành nghề liên quan đến năng lượng, thể thao, giải trí, hoặc các hoạt động kinh doanh đầy đam mê. Khả năng tài chính sẽ tăng nhanh khi bạn phát triển và tận dụng năng lượng tích cực của mình. Bạn phù hợp với các công việc đòi hỏi sự nhiệt huyết và đam mê. Tuy nhiên, cần quản lý chi tiêu một cách cẩn thận vì bạn có xu hướng chi tiêu theo cảm hứng. Nên đầu tư vào các dự án có tiềm năng phát triển nhanh.',
            strengths: [
                'Nhiều nguồn thu nhập từ đam mê',
                'Phù hợp với công việc năng động',
                'Tài lộc tăng nhanh',
                'Có khả năng tạo ra giá trị mới'
            ],
            weaknesses: [
                'Chi tiêu theo cảm hứng',
                'Thiếu kế hoạch tài chính dài hạn',
                'Có thể đầu tư quá mạo hiểm'
            ],
            advice: [
                'Quản lý chi tiêu một cách cẩn thận',
                'Đầu tư vào các dự án có tiềm năng',
                'Tận dụng năng lượng tích cực để kiếm tiền',
                'Có kế hoạch tài chính rõ ràng',
                'Tránh đầu tư quá mạo hiểm'
            ],
            warnings: [
                'Tránh chi tiêu quá mức',
                'Cẩn trọng với các khoản đầu tư mạo hiểm',
                'Chú ý các khoản chi không cần thiết'
            ]
        },
        'quan_loc': {
            summary: 'Sự nghiệp của bạn sẽ phát triển tốt trong các lĩnh vực năng động và đầy đam mê.',
            detailed: 'Bạn phù hợp với các nghề liên quan đến thể thao, giải trí, marketing, hoặc các hoạt động kinh doanh đầy đam mê. Sự nghiệp của bạn sẽ có nhiều thăng trầm nhưng luôn đầy màu sắc và đam mê. Bạn có khả năng truyền cảm hứng và động viên người khác một cách mạnh mẽ. Trong công việc, bạn thường gặp được những người hỗ trợ và cơ hội phát triển. Hãy tận dụng năng lượng tích cực và đam mê của mình để phát triển sự nghiệp.',
            strengths: [
                'Phù hợp với các lĩnh vực năng động',
                'Có khả năng truyền cảm hứng',
                'Gặp được nhiều cơ hội phát triển',
                'Đầy đam mê trong công việc'
            ],
            weaknesses: [
                'Thiếu kiên nhẫn',
                'Có thể thay đổi công việc quá nhiều',
                'Khó tập trung vào một việc lâu dài'
            ],
            advice: [
                'Tập trung vào một lĩnh vực cụ thể',
                'Tận dụng năng lượng tích cực',
                'Xây dựng mạng lưới quan hệ tốt',
                'Học cách kiên nhẫn và hoàn thành công việc',
                'Tìm công việc phù hợp với tính cách'
            ],
            warnings: [
                'Tránh thay đổi công việc quá nhiều',
                'Cẩn trọng với các quyết định nghề nghiệp',
                'Chú ý đến việc phát triển kỹ năng chuyên môn'
            ]
        },
        'phu_the': {
            summary: 'Tình duyên của bạn đầy đam mê và nhiệt huyết, nhưng cần học cách kiềm chế cảm xúc.',
            detailed: 'Người phối ngẫu của bạn sẽ là người hiểu và trân trọng tính cách nhiệt huyết của bạn. Họ có thể là người năng động, đầy đam mê và cùng bạn chia sẻ những hoài bão lớn. Mối quan hệ của bạn sẽ phát triển tốt dựa trên sự tôn trọng và đam mê chung. Bạn và người ấy sẽ cùng nhau xây dựng một gia đình đầy năng lượng và hạnh phúc. Hãy học cách kiềm chế cảm xúc để tránh những xung đột không cần thiết.',
            strengths: [
                'Tình duyên đầy đam mê và nhiệt huyết',
                'Người phối ngẫu hiểu và trân trọng bạn',
                'Mối quan hệ dựa trên sự đam mê chung',
                'Cùng nhau xây dựng hạnh phúc'
            ],
            weaknesses: [
                'Có thể thiếu sự kiềm chế cảm xúc',
                'Đôi khi quá nóng nảy trong mối quan hệ'
            ],
            advice: [
                'Học cách kiềm chế cảm xúc',
                'Chia sẻ những hoài bão và đam mê',
                'Giữ sự tôn trọng và đam mê chung',
                'Xây dựng mối quan hệ dựa trên sự tin cậy',
                'Tránh quá nóng nảy trong mối quan hệ'
            ],
            warnings: [
                'Tránh quyết định khi đang nóng giận',
                'Cẩn trọng với các mối quan hệ không rõ ràng',
                'Chú ý đến nhu cầu của đối phương'
            ]
        },
        'phuc_duc': {
            summary: 'Bạn có phúc đức tốt từ việc truyền cảm hứng và giúp đỡ người khác.',
            detailed: 'Tâm tính của bạn nhiệt huyết, thích giúp đỡ người khác và luôn tìm cách làm cho cuộc sống tốt đẹp hơn. Bạn có khả năng truyền cảm hứng và động viên người khác một cách mạnh mẽ. Những việc làm tốt của bạn sẽ được đền đáp xứng đáng. Về già, bạn sẽ được tận hưởng tuổi thọ cao và sức khỏe tốt nhờ phước đức tích lũy. Hãy tiếp tục làm việc thiện và giúp đỡ người khác.',
            strengths: [
                'Phúc đức tốt từ việc giúp đỡ người khác',
                'Tâm tính nhiệt huyết',
                'Truyền cảm hứng và động viên người khác',
                'Tuổi thọ cao, sức khỏe tốt'
            ],
            weaknesses: [
                'Có thể bị lợi dụng lòng tốt',
                'Đôi khi quá tin tưởng người khác'
            ],
            advice: [
                'Tiếp tục làm việc thiện',
                'Giúp đỡ người khác một cách khôn ngoan',
                'Truyền cảm hứng và động viên người khác',
                'Trân trọng phước đức tích lũy',
                'Biết phân biệt người thật lòng và giả dối'
            ],
            warnings: [
                'Cẩn trọng với những người lợi dụng lòng tốt',
                'Tránh quá tin tưởng vào người khác',
                'Chú ý bảo vệ bản thân'
            ]
        },
        'thien_di': {
            summary: 'Đi xa và khám phá những nơi mới sẽ mang lại nhiều cơ hội và may mắn cho bạn.',
            detailed: 'Bạn có khả năng thích nghi tốt với môi trường mới và học hỏi nhanh từ những trải nghiệm. Du lịch và khám phá những vùng đất mới sẽ mang lại cho bạn nhiều cảm hứng và cơ hội phát triển. Bạn có thể gặp được những người bạn mới và cơ hội kinh doanh ở những nơi mới. Hãy mạnh dạn bước ra khỏi vùng an toàn để khám phá những cơ hội mới.',
            strengths: [
                'Thích nghi tốt với môi trường mới',
                'Học hỏi nhanh từ trải nghiệm',
                'Gặp nhiều cơ hội khi đi xa',
                'Xây dựng mối quan hệ tốt ở nơi mới'
            ],
            weaknesses: [
                'Có thể cảm thấy nhớ nhà',
                'Đôi khi thiếu sự ổn định',
                'Cần thời gian để thích nghi'
            ],
            advice: [
                'Mạnh dạn đi xa và khám phá',
                'Tận dụng các cơ hội du lịch',
                'Xây dựng mạng lưới quan hệ ở nhiều nơi',
                'Học hỏi từ những trải nghiệm mới',
                'Giữ liên lạc với gia đình và bạn bè'
            ],
            warnings: [
                'Cẩn trọng khi đi đến những nơi xa lạ',
                'Tránh quá vội vàng trong các quyết định',
                'Chú ý an toàn khi đi du lịch'
            ]
        },
        'dien_trach': {
            summary: 'Bạn có phúc lộc về nhà cửa, ngôi nhà của bạn luôn ấm áp và đầy năng lượng.',
            detailed: 'Ngôi nhà của bạn sẽ là nơi đầy năng lượng và sức sống. Gia đình bạn sống hòa thuận và có nhiều hoạt động vui vẻ. Bạn có khả năng tạo ra một không gian sống đầy cảm hứng và đam mê. Nên đầu tư vào việc trang trí và làm đẹp ngôi nhà để tạo ra một môi trường sống tốt. Tránh để ngôi nhà quá lộn xộn hoặc thiếu sự chăm sóc.',
            strengths: [
                'Ngôi nhà ấm áp và đầy năng lượng',
                'Gia đình hòa thuận',
                'Không gian sống đầy cảm hứng',
                'Có nhiều hoạt động vui vẻ'
            ],
            weaknesses: [
                'Có thể thiếu sự tổ chức',
                'Đôi khi ngôi nhà quá lộn xộn'
            ],
            advice: [
                'Đầu tư vào việc trang trí và làm đẹp ngôi nhà',
                'Tạo ra không gian sống đầy cảm hứng',
                'Giữ ngôi nhà gọn gàng và sạch sẽ',
                'Tạo ra môi trường sống tốt',
                'Tránh để ngôi nhà quá lộn xộn'
            ],
            warnings: [
                'Tránh để ngôi nhà thiếu sự chăm sóc',
                'Cẩn trọng với các khoản chi phí trang trí',
                'Chú ý đến việc bảo trì ngôi nhà'
            ]
        },
        'tu_tuc': {
            summary: 'Con cái của bạn năng động, đầy đam mê và có nhiều tài năng.',
            detailed: 'Bạn có duyên với việc nuôi dạy con thành người năng động và đầy đam mê. Con cái sẽ là niềm tự hào của bạn và sẽ phát triển tốt trong các lĩnh vực thể thao hoặc giải trí. Mối quan hệ giữa bạn và con cái rất tốt, dựa trên sự tôn trọng và đam mê chung. Bạn sẽ dạy con cách sống đầy nhiệt huyết và đam mê. Hãy dành thời gian để khám phá và phát triển tài năng của con cái.',
            strengths: [
                'Con cái năng động và đầy đam mê',
                'Mối quan hệ tốt với con cái',
                'Nuôi dạy con thành công',
                'Con cái có nhiều tài năng'
            ],
            weaknesses: [
                'Có thể thiếu sự nghiêm khắc',
                'Đôi khi quá nóng nảy với con'
            ],
            advice: [
                'Dành thời gian để khám phá tài năng của con',
                'Dạy con cách sống đầy nhiệt huyết',
                'Cân bằng giữa đam mê và kỷ luật',
                'Khuyến khích con phát triển tài năng',
                'Tạo môi trường giáo dục tốt cho con'
            ],
            warnings: [
                'Tránh quá nóng nảy với con',
                'Cẩn trọng với các phương pháp giáo dục',
                'Chú ý đến việc phát triển kỹ năng của con'
            ]
        },
        'phu_mau': {
            summary: 'Cha mẹ của bạn khỏe mạnh và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ giữa bạn và cha mẹ hòa thuận và cởi mở. Bạn được gia đình hỗ trợ trong việc phát triển và khám phá. Cha mẹ là nguồn động viên tinh thần giúp bạn vượt qua khó khăn. Bạn sẽ học được nhiều bài học quý giá từ cha mẹ về cách sống và cách làm người. Hãy dành thời gian quan tâm và chăm sóc cha mẹ khi họ về già.',
            strengths: [
                'Cha mẹ khỏe mạnh',
                'Mối quan hệ hòa thuận với cha mẹ',
                'Được gia đình hỗ trợ',
                'Học được nhiều bài học quý giá'
            ],
            weaknesses: [
                'Có thể có những bất đồng nhỏ',
                'Đôi khi khó thể hiện cảm xúc'
            ],
            advice: [
                'Dành thời gian quan tâm cha mẹ',
                'Lắng nghe lời khuyên từ cha mẹ',
                'Chăm sóc cha mẹ khi về già',
                'Trân trọng công ơn sinh thành',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh để những bất đồng nhỏ trở thành lớn',
                'Cẩn trọng với các quyết định quan trọng',
                'Chú ý sức khỏe của cha mẹ'
            ]
        },
        'huynh_de': {
            summary: 'Anh chị em của bạn hòa thuận và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ anh em là một trong những chỗ dựa tinh thần quan trọng của bạn. Anh chị em của bạn thường là những người cởi mở và sẵn sàng giúp đỡ khi bạn gặp khó khăn. Có thể bạn sẽ hợp tác làm ăn với anh chị em trong một số giai đoạn và đem lại kết quả tốt đẹp. Tuy nhiên, cần có sự minh bạch trong tài chính để tránh hiểu lầm. Hãy luôn trân trọng tình cảm anh em.',
            strengths: [
                'Anh chị em hòa thuận',
                'Đùm bọc và giúp đỡ lẫn nhau',
                'Có thể hợp tác làm ăn',
                'Chỗ dựa tinh thần quan trọng'
            ],
            weaknesses: [
                'Có thể có hiểu lầm về tài chính',
                'Đôi khi thiếu sự minh bạch'
            ],
            advice: [
                'Trân trọng tình cảm anh em',
                'Minh bạch trong các giao dịch tài chính',
                'Hợp tác làm ăn một cách công bằng',
                'Giúp đỡ anh chị em khi cần',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh hiểu lầm về tài chính',
                'Cẩn trọng với các hợp đồng làm ăn',
                'Chú ý sự minh bạch trong giao dịch'
            ]
        },
        'no_boc': {
            summary: 'Bạn có nhiều bạn bè và người quen, đặc biệt là trong các lĩnh vực năng động.',
            detailed: 'Bạn có khả năng xây dựng mối quan hệ tốt với nhiều người từ các lĩnh vực khác nhau. Những người bạn của bạn thường là những người năng động và sẵn sàng giúp đỡ. Tuy nhiên, cần cẩn trọng trong việc chọn đối tác làm ăn để tránh bị lợi dụng. Hãy biết phân biệt người thật lòng và người giả dối. Những người bạn thật sự của bạn sẽ là những người rất chân thành và sẵn sàng giúp đỡ bạn khi khó khăn.',
            strengths: [
                'Có nhiều bạn bè và người quen',
                'Khả năng xây dựng mối quan hệ tốt',
                'Có những người bạn chân thành',
                'Được giúp đỡ khi khó khăn'
            ],
            weaknesses: [
                'Có thể bị lợi dụng',
                'Khó phân biệt người thật lòng và giả dối'
            ],
            advice: [
                'Biết phân biệt người thật lòng và giả dối',
                'Cẩn trọng trong việc chọn đối tác',
                'Trân trọng những người bạn chân thành',
                'Xây dựng mối quan hệ dựa trên sự tin cậy',
                'Tận dụng mạng lưới quan hệ để phát triển'
            ],
            warnings: [
                'Tránh tin tưởng quá mức vào người khác',
                'Cẩn trọng với các đối tác làm ăn',
                'Chú ý những người có ý đồ không tốt'
            ]
        },
        'tat_ach': {
            summary: 'Sức khỏe tổng thể của bạn tốt, nhưng cần chú ý đến tim mạch và hệ tuần hoàn.',
            detailed: 'Bạn có sức khỏe tốt và ít ốm đau lặt vặt. Tuy nhiên, do tính cách năng động và đôi khi làm việc quá sức, bạn cần chú ý đến việc nghỉ ngơi và thư giãn đầy đủ. Các vấn đề về sức khỏe có thể xuất hiện chủ yếu liên quan đến tim mạch, hệ tuần hoàn hoặc huyết áp khi bạn bước vào tuổi trung niên. Nên duy trì thói quen tập thể dục đều đặn, ăn uống điều độ và khám sức khỏe định kỳ. Tránh làm việc quá sức và stress.',
            strengths: [
                'Sức khỏe tổng thể tốt',
                'Ít ốm đau lặt vặt',
                'Có khả năng phục hồi nhanh',
                'Tuổi thọ cao nếu biết chăm sóc'
            ],
            weaknesses: [
                'Có thể có vấn đề về tim mạch',
                'Cần chú ý đến hệ tuần hoàn',
                'Dễ bị stress do làm việc quá sức'
            ],
            advice: [
                'Nghỉ ngơi và thư giãn đầy đủ',
                'Tập thể dục đều đặn',
                'Ăn uống điều độ và lành mạnh',
                'Khám sức khỏe định kỳ',
                'Tránh làm việc quá sức và stress',
                'Chú ý đến tim mạch và hệ tuần hoàn'
            ],
            warnings: [
                'Tránh làm việc quá sức',
                'Cẩn trọng với các vấn đề về tim mạch',
                'Chú ý các dấu hiệu bất thường về sức khỏe',
                'Tránh stress và lo âu quá mức'
            ]
        }
    },
    'Thổ': {
        'menh': {
            summary: 'Bạn thuộc mệnh Thổ - người điềm đạm, vững vàng và đáng tin cậy.',
            detailed: 'Bạn sống thực tế, chân thành và luôn biết quan tâm đến người khác. Bản chất của bạn thiên về sự ổn định, kiên định và đáng tin cậy. Bạn có khả năng xây dựng và duy trì những mối quan hệ bền vững. Tuy nhiên, đôi khi bạn hơi bảo thủ và chậm chạp trong thay đổi, thiếu sự linh hoạt. Cuộc đời bạn sẽ ổn định và phát triển từ từ nhưng bền vững. Về già sẽ an nhàn và phú quý nhờ sự tích lũy và kiên trì.',
            strengths: [
                'Điềm đạm, vững vàng',
                'Đáng tin cậy',
                'Sống thực tế',
                'Chân thành',
                'Quan tâm đến người khác'
            ],
            weaknesses: [
                'Hơi bảo thủ',
                'Chậm chạp trong thay đổi',
                'Thiếu sự linh hoạt',
                'Có thể thiếu sáng tạo'
            ],
            advice: [
                'Nên cởi mở hơn với những ý tưởng mới',
                'Chủ động nắm bắt cơ hội',
                'Học cách linh hoạt hơn',
                'Tận dụng sự ổn định và kiên định',
                'Phát triển khả năng sáng tạo'
            ],
            warnings: [
                'Tránh quá bảo thủ',
                'Cẩn trọng với sự chậm chạp',
                'Chú ý đến việc thích nghi với thay đổi'
            ],
            luckyElements: {
                colors: ['Vàng', 'Nâu', 'Đỏ', 'Cam', 'Hồng'],
                numbers: ['2', '5', '8', '9'],
                directions: ['Đông Bắc', 'Tây Nam'],
                times: ['Thìn (07h-09h)', 'Tuất (19h-21h)', 'Sửu (01h-03h)', 'Mùi (13h-15h)']
            }
        },
        'tai_bach': {
            summary: 'Tài lộc của bạn đến từ các hoạt động ổn định và bền vững.',
            detailed: 'Bạn có duyên với các ngành nghề liên quan đến đất đai, bất động sản, nông nghiệp, hoặc các hoạt động kinh doanh ổn định. Khả năng tài chính sẽ tăng dần và bền vững theo thời gian khi bạn tích lũy và đầu tư thông minh. Bạn phù hợp với các công việc đòi hỏi sự kiên trì và ổn định. Tuy nhiên, cần quản lý chi tiêu một cách cẩn thận và có kế hoạch dài hạn. Nên đầu tư vào bất động sản và các tài sản có giá trị bền vững.',
            strengths: [
                'Nhiều nguồn thu nhập từ hoạt động ổn định',
                'Phù hợp với công việc bền vững',
                'Tài lộc tăng dần và bền vững',
                'Có khả năng tích lũy tốt'
            ],
            weaknesses: [
                'Chi tiêu có thể thiếu linh hoạt',
                'Có thể đầu tư quá thận trọng',
                'Thiếu sự mạo hiểm cần thiết'
            ],
            advice: [
                'Quản lý chi tiêu một cách cẩn thận',
                'Đầu tư vào bất động sản và tài sản bền vững',
                'Tận dụng sự ổn định để tích lũy',
                'Có kế hoạch tài chính dài hạn',
                'Tránh đầu tư quá thận trọng'
            ],
            warnings: [
                'Tránh chi tiêu quá mức',
                'Cẩn trọng với các khoản đầu tư',
                'Chú ý các khoản chi không cần thiết'
            ]
        },
        'quan_loc': {
            summary: 'Sự nghiệp của bạn sẽ phát triển tốt trong các lĩnh vực ổn định và bền vững.',
            detailed: 'Bạn phù hợp với các nghề liên quan đến đất đai, bất động sản, nông nghiệp, hoặc các hoạt động kinh doanh ổn định. Sự nghiệp của bạn sẽ phát triển từ từ nhưng bền vững. Bạn có khả năng xây dựng và duy trì những thành tựu lâu dài. Trong công việc, bạn thường gặp được những người hỗ trợ và cơ hội phát triển. Hãy tận dụng sự ổn định và kiên trì của mình để phát triển sự nghiệp.',
            strengths: [
                'Phù hợp với các lĩnh vực ổn định',
                'Có khả năng xây dựng thành tựu lâu dài',
                'Gặp được nhiều cơ hội phát triển',
                'Kiên trì trong công việc'
            ],
            weaknesses: [
                'Thiếu sự linh hoạt',
                'Có thể chậm chạp trong thay đổi',
                'Khó thích nghi với môi trường mới'
            ],
            advice: [
                'Tập trung vào một lĩnh vực cụ thể',
                'Tận dụng sự ổn định và kiên trì',
                'Xây dựng mạng lưới quan hệ tốt',
                'Học cách linh hoạt hơn',
                'Tìm công việc phù hợp với tính cách'
            ],
            warnings: [
                'Tránh quá bảo thủ',
                'Cẩn trọng với các quyết định nghề nghiệp',
                'Chú ý đến việc thích nghi với thay đổi'
            ]
        },
        'phu_the': {
            summary: 'Tình duyên của bạn ổn định và bền vững, dựa trên sự tin cậy và cam kết.',
            detailed: 'Người phối ngẫu của bạn sẽ là người hiểu và trân trọng tính cách ổn định của bạn. Họ có thể là người đáng tin cậy, chân thành và cùng bạn xây dựng một gia đình ổn định. Mối quan hệ của bạn sẽ phát triển tốt dựa trên sự tin cậy và cam kết lâu dài. Bạn và người ấy sẽ cùng nhau xây dựng một gia đình ổn định và hạnh phúc. Hãy học cách cởi mở và linh hoạt hơn trong mối quan hệ.',
            strengths: [
                'Tình duyên ổn định và bền vững',
                'Người phối ngẫu đáng tin cậy',
                'Mối quan hệ dựa trên sự tin cậy',
                'Cùng nhau xây dựng hạnh phúc'
            ],
            weaknesses: [
                'Có thể thiếu sự lãng mạn',
                'Đôi khi quá cứng nhắc trong mối quan hệ'
            ],
            advice: [
                'Học cách cởi mở và linh hoạt',
                'Chia sẻ những cảm xúc và suy nghĩ',
                'Giữ sự tin cậy và cam kết',
                'Xây dựng mối quan hệ dựa trên sự tôn trọng',
                'Tránh quá cứng nhắc trong mối quan hệ'
            ],
            warnings: [
                'Tránh thiếu sự lãng mạn',
                'Cẩn trọng với các mối quan hệ không rõ ràng',
                'Chú ý đến nhu cầu của đối phương'
            ]
        },
        'phuc_duc': {
            summary: 'Bạn có phúc đức tốt từ việc sống lương thiện và quan tâm đến người khác.',
            detailed: 'Tâm tính của bạn lương thiện, thích giúp đỡ người khác và luôn tìm cách làm cho cuộc sống tốt đẹp hơn. Bạn có khả năng xây dựng và duy trì những mối quan hệ bền vững. Những việc làm tốt của bạn sẽ được đền đáp xứng đáng. Về già, bạn sẽ được tận hưởng tuổi thọ cao và sức khỏe tốt nhờ phước đức tích lũy. Hãy tiếp tục làm việc thiện và giúp đỡ người khác.',
            strengths: [
                'Phúc đức tốt từ việc giúp đỡ người khác',
                'Tâm tính lương thiện',
                'Xây dựng mối quan hệ bền vững',
                'Tuổi thọ cao, sức khỏe tốt'
            ],
            weaknesses: [
                'Có thể bị lợi dụng lòng tốt',
                'Đôi khi quá tin tưởng người khác'
            ],
            advice: [
                'Tiếp tục làm việc thiện',
                'Giúp đỡ người khác một cách khôn ngoan',
                'Xây dựng mối quan hệ bền vững',
                'Trân trọng phước đức tích lũy',
                'Biết phân biệt người thật lòng và giả dối'
            ],
            warnings: [
                'Cẩn trọng với những người lợi dụng lòng tốt',
                'Tránh quá tin tưởng vào người khác',
                'Chú ý bảo vệ bản thân'
            ]
        },
        'thien_di': {
            summary: 'Đi xa và khám phá những nơi mới sẽ mang lại nhiều cơ hội và may mắn cho bạn.',
            detailed: 'Bạn có khả năng thích nghi tốt với môi trường mới và học hỏi từ những trải nghiệm. Du lịch và khám phá những vùng đất mới sẽ mang lại cho bạn nhiều cảm hứng và cơ hội phát triển. Bạn có thể gặp được những người bạn mới và cơ hội kinh doanh ở những nơi mới. Hãy mạnh dạn bước ra khỏi vùng an toàn để khám phá những cơ hội mới.',
            strengths: [
                'Thích nghi tốt với môi trường mới',
                'Học hỏi từ trải nghiệm',
                'Gặp nhiều cơ hội khi đi xa',
                'Xây dựng mối quan hệ tốt ở nơi mới'
            ],
            weaknesses: [
                'Có thể cảm thấy nhớ nhà',
                'Đôi khi thiếu sự ổn định',
                'Cần thời gian để thích nghi'
            ],
            advice: [
                'Mạnh dạn đi xa và khám phá',
                'Tận dụng các cơ hội du lịch',
                'Xây dựng mạng lưới quan hệ ở nhiều nơi',
                'Học hỏi từ những trải nghiệm mới',
                'Giữ liên lạc với gia đình và bạn bè'
            ],
            warnings: [
                'Cẩn trọng khi đi đến những nơi xa lạ',
                'Tránh quá vội vàng trong các quyết định',
                'Chú ý an toàn khi đi du lịch'
            ]
        },
        'dien_trach': {
            summary: 'Bạn có phúc lộc về nhà cửa, ngôi nhà của bạn luôn ấm áp và ổn định.',
            detailed: 'Ngôi nhà của bạn sẽ là nơi ấm áp và ổn định. Gia đình bạn sống hòa thuận và có nhiều hoạt động vui vẻ. Bạn có khả năng tạo ra một không gian sống thoải mái và bền vững. Nên đầu tư vào việc trang trí và làm đẹp ngôi nhà để tạo ra một môi trường sống tốt. Tránh để ngôi nhà quá lộn xộn hoặc thiếu sự chăm sóc.',
            strengths: [
                'Ngôi nhà ấm áp và ổn định',
                'Gia đình hòa thuận',
                'Không gian sống thoải mái',
                'Có nhiều hoạt động vui vẻ'
            ],
            weaknesses: [
                'Có thể thiếu sự tổ chức',
                'Đôi khi ngôi nhà quá lộn xộn'
            ],
            advice: [
                'Đầu tư vào việc trang trí và làm đẹp ngôi nhà',
                'Tạo ra không gian sống thoải mái',
                'Giữ ngôi nhà gọn gàng và sạch sẽ',
                'Tạo ra môi trường sống tốt',
                'Tránh để ngôi nhà quá lộn xộn'
            ],
            warnings: [
                'Tránh để ngôi nhà thiếu sự chăm sóc',
                'Cẩn trọng với các khoản chi phí trang trí',
                'Chú ý đến việc bảo trì ngôi nhà'
            ]
        },
        'tu_tuc': {
            summary: 'Con cái của bạn ổn định, đáng tin cậy và có khả năng tích lũy tốt.',
            detailed: 'Bạn có duyên với việc nuôi dạy con thành người ổn định và đáng tin cậy. Con cái sẽ là niềm tự hào của bạn và sẽ phát triển tốt trong các lĩnh vực ổn định. Mối quan hệ giữa bạn và con cái rất tốt, dựa trên sự tôn trọng và tin cậy. Bạn sẽ dạy con cách sống ổn định và tích lũy. Hãy dành thời gian để khám phá và phát triển tài năng của con cái.',
            strengths: [
                'Con cái ổn định và đáng tin cậy',
                'Mối quan hệ tốt với con cái',
                'Nuôi dạy con thành công',
                'Con cái có khả năng tích lũy tốt'
            ],
            weaknesses: [
                'Có thể thiếu sự nghiêm khắc',
                'Đôi khi quá cứng nhắc với con'
            ],
            advice: [
                'Dành thời gian để khám phá tài năng của con',
                'Dạy con cách sống ổn định và tích lũy',
                'Cân bằng giữa ổn định và kỷ luật',
                'Khuyến khích con phát triển tài năng',
                'Tạo môi trường giáo dục tốt cho con'
            ],
            warnings: [
                'Tránh quá cứng nhắc với con',
                'Cẩn trọng với các phương pháp giáo dục',
                'Chú ý đến việc phát triển kỹ năng của con'
            ]
        },
        'phu_mau': {
            summary: 'Cha mẹ của bạn khỏe mạnh và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ giữa bạn và cha mẹ hòa thuận và ổn định. Bạn được gia đình hỗ trợ trong việc phát triển và tích lũy. Cha mẹ là nguồn động viên tinh thần giúp bạn vượt qua khó khăn. Bạn sẽ học được nhiều bài học quý giá từ cha mẹ về cách sống và cách làm người. Hãy dành thời gian quan tâm và chăm sóc cha mẹ khi họ về già.',
            strengths: [
                'Cha mẹ khỏe mạnh',
                'Mối quan hệ hòa thuận với cha mẹ',
                'Được gia đình hỗ trợ',
                'Học được nhiều bài học quý giá'
            ],
            weaknesses: [
                'Có thể có những bất đồng nhỏ',
                'Đôi khi khó thể hiện cảm xúc'
            ],
            advice: [
                'Dành thời gian quan tâm cha mẹ',
                'Lắng nghe lời khuyên từ cha mẹ',
                'Chăm sóc cha mẹ khi về già',
                'Trân trọng công ơn sinh thành',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh để những bất đồng nhỏ trở thành lớn',
                'Cẩn trọng với các quyết định quan trọng',
                'Chú ý sức khỏe của cha mẹ'
            ]
        },
        'huynh_de': {
            summary: 'Anh chị em của bạn hòa thuận và có mối quan hệ tốt với bạn.',
            detailed: 'Mối quan hệ anh em là một trong những chỗ dựa tinh thần quan trọng của bạn. Anh chị em của bạn thường là những người đáng tin cậy và sẵn sàng giúp đỡ khi bạn gặp khó khăn. Có thể bạn sẽ hợp tác làm ăn với anh chị em trong một số giai đoạn và đem lại kết quả tốt đẹp. Tuy nhiên, cần có sự minh bạch trong tài chính để tránh hiểu lầm. Hãy luôn trân trọng tình cảm anh em.',
            strengths: [
                'Anh chị em hòa thuận',
                'Đùm bọc và giúp đỡ lẫn nhau',
                'Có thể hợp tác làm ăn',
                'Chỗ dựa tinh thần quan trọng'
            ],
            weaknesses: [
                'Có thể có hiểu lầm về tài chính',
                'Đôi khi thiếu sự minh bạch'
            ],
            advice: [
                'Trân trọng tình cảm anh em',
                'Minh bạch trong các giao dịch tài chính',
                'Hợp tác làm ăn một cách công bằng',
                'Giúp đỡ anh chị em khi cần',
                'Giữ mối quan hệ hòa thuận'
            ],
            warnings: [
                'Tránh hiểu lầm về tài chính',
                'Cẩn trọng với các hợp đồng làm ăn',
                'Chú ý sự minh bạch trong giao dịch'
            ]
        },
        'no_boc': {
            summary: 'Bạn có nhiều bạn bè và người quen, đặc biệt là trong các lĩnh vực ổn định.',
            detailed: 'Bạn có khả năng xây dựng mối quan hệ tốt với nhiều người từ các lĩnh vực khác nhau. Những người bạn của bạn thường là những người đáng tin cậy và sẵn sàng giúp đỡ. Tuy nhiên, cần cẩn trọng trong việc chọn đối tác làm ăn để tránh bị lợi dụng. Hãy biết phân biệt người thật lòng và người giả dối. Những người bạn thật sự của bạn sẽ là những người rất chân thành và sẵn sàng giúp đỡ bạn khi khó khăn.',
            strengths: [
                'Có nhiều bạn bè và người quen',
                'Khả năng xây dựng mối quan hệ tốt',
                'Có những người bạn chân thành',
                'Được giúp đỡ khi khó khăn'
            ],
            weaknesses: [
                'Có thể bị lợi dụng',
                'Khó phân biệt người thật lòng và giả dối'
            ],
            advice: [
                'Biết phân biệt người thật lòng và giả dối',
                'Cẩn trọng trong việc chọn đối tác',
                'Trân trọng những người bạn chân thành',
                'Xây dựng mối quan hệ dựa trên sự tin cậy',
                'Tận dụng mạng lưới quan hệ để phát triển'
            ],
            warnings: [
                'Tránh tin tưởng quá mức vào người khác',
                'Cẩn trọng với các đối tác làm ăn',
                'Chú ý những người có ý đồ không tốt'
            ]
        },
        'tat_ach': {
            summary: 'Sức khỏe tổng thể của bạn tốt, nhưng cần chú ý đến hệ tiêu hóa và dạ dày.',
            detailed: 'Bạn có sức khỏe tốt và ít ốm đau lặt vặt. Tuy nhiên, do tính cách ổn định và đôi khi thiếu sự linh hoạt, bạn cần chú ý đến việc nghỉ ngơi và thư giãn đầy đủ. Các vấn đề về sức khỏe có thể xuất hiện chủ yếu liên quan đến hệ tiêu hóa, dạ dày hoặc xương khớp khi bạn bước vào tuổi trung niên. Nên duy trì thói quen tập thể dục đều đặn, ăn uống điều độ và khám sức khỏe định kỳ. Tránh ăn uống không điều độ và làm việc quá sức.',
            strengths: [
                'Sức khỏe tổng thể tốt',
                'Ít ốm đau lặt vặt',
                'Có khả năng phục hồi nhanh',
                'Tuổi thọ cao nếu biết chăm sóc'
            ],
            weaknesses: [
                'Có thể có vấn đề về tiêu hóa',
                'Cần chú ý đến dạ dày',
                'Dễ bị xương khớp khi về già'
            ],
            advice: [
                'Nghỉ ngơi và thư giãn đầy đủ',
                'Tập thể dục đều đặn',
                'Ăn uống điều độ và lành mạnh',
                'Khám sức khỏe định kỳ',
                'Tránh ăn uống không điều độ',
                'Chú ý đến hệ tiêu hóa và dạ dày'
            ],
            warnings: [
                'Tránh làm việc quá sức',
                'Cẩn trọng với các vấn đề về tiêu hóa',
                'Chú ý các dấu hiệu bất thường về sức khỏe',
                'Tránh ăn uống không điều độ'
            ]
        }
    }
};

/**
 * Lấy luận giải cho một cung cụ thể dựa trên mệnh
 */
export function getPalaceInterpretation(
    menh: MenhType,
    palaceId: string
): PalaceInterpretation | null {
    const interpretations = PALACE_INTERPRETATIONS[menh];
    if (!interpretations) return null;
    
    return interpretations[palaceId] || null;
}

/**
 * Lấy tất cả các luận giải cho một mệnh
 */
export function getAllInterpretationsForMenh(menh: MenhType): Record<string, PalaceInterpretation> {
    return PALACE_INTERPRETATIONS[menh] || {};
}

