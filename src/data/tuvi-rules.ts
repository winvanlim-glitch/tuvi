export interface TuViContent {
    summary: string;
    description: string;
    advice: string;
    luckyColors: string[];
    luckyNumbers: string[];
    direction: string;
}

export const MENH_RULES: Record<string, TuViContent> = {
    'Kim': {
        summary: 'Người mệnh Kim thường có tính cách cương trực, quyết đoán và trọng nghĩa khí.',
        description: 'Bạn là người có tư duy logic tốt, khả năng tổ chức và lãnh đạo. Tuy nhiên đôi khi hơi cứng nhắc và độc đoán.',
        advice: 'Nên học cách lắng nghe và linh hoạt hơn trong cách ứng xử. Tránh xung đột trực diện không cần thiết.',
        luckyColors: ['Trắng', 'Xám', 'Vàng', 'Nâu đất'],
        luckyNumbers: ['6', '7', '2', '5', '8'],
        direction: 'Tây, Tây Bắc'
    },
    'Mộc': {
        summary: 'Người mệnh Mộc có tính cách ôn hòa, điềm tĩnh và giàu lòng nhân ái.',
        description: 'Bạn thích sự tự do, ghét sự gò bó. Có tư duy sáng tạo và khả năng thích nghi cao.',
        advice: 'Cần kiên định hơn với mục tiêu của mình, tránh "cả thèm chóng chán".',
        luckyColors: ['Xanh lá', 'Đen', 'Xanh dương'],
        luckyNumbers: ['3', '4', '1', '9'],
        direction: 'Đông, Đông Nam'
    },
    'Thủy': {
        summary: 'Người mệnh Thủy thông minh, khéo léo và có khả năng giao tiếp tốt.',
        description: 'Bạn nhạy cảm, tinh tế và biết cách lắng nghe. Tuy nhiên đôi khi hay lo âu và suy nghĩ quá nhiều.',
        advice: 'Nên giữ tinh thần lạc quan, tránh để cảm xúc chi phối các quyết định quan trọng.',
        luckyColors: ['Đen', 'Xanh dương', 'Trắng', 'Xám'],
        luckyNumbers: ['1', '6', '7'],
        direction: 'Bắc'
    },
    'Hỏa': {
        summary: 'Người mệnh Hỏa nhiệt huyết, năng động và đầy đam mê.',
        description: 'Bạn luôn tràn đầy năng lượng, dám nghĩ dám làm và có tố chất truyền cảm hứng. Tuy nhiên tính khí có phần nóng nảy.',
        advice: 'Cần học cách kiềm chế cảm xúc ("giữ cái đầu lạnh"), tránh nóng vội hỏng việc lớn.',
        luckyColors: ['Đỏ', 'Cam', 'Hồng', 'Tím', 'Xanh lá'],
        luckyNumbers: ['9', '3', '4'],
        direction: 'Nam'
    },
    'Thổ': {
        summary: 'Người mệnh Thổ điềm đạm, vững vàng và đáng tin cậy.',
        description: 'Bạn sống thực tế, chân thành và luôn biết quan tâm đến người khác. Đôi khi hơi bảo thủ và chậm chạp trong thay đổi.',
        advice: 'Nên cởi mở hơn với những ý tưởng mới và chủ động nắm bắt cơ hội.',
        luckyColors: ['Vàng', 'Nâu', 'Đỏ', 'Cam', 'Hồng'],
        luckyNumbers: ['2', '5', '8', '9'],
        direction: 'Đông Bắc, Tây Nam'
    },
    'Chưa xác định': {
        summary: 'Đang cập nhật dữ liệu...',
        description: 'Vui lòng kiểm tra lại ngày sinh.',
        advice: '',
        luckyColors: [],
        luckyNumbers: [],
        direction: ''
    }
};

export interface PalaceDefinition {
    id: string;
    name: string;
    icon: string;
    description: string;
    priority: 'high' | 'normal';
}

export const PALACES: PalaceDefinition[] = [
    { id: 'menh', name: 'Mệnh', icon: 'person', description: 'Bản chất, tính cách gốc và định hướng cuộc đời.', priority: 'high' },
    { id: 'tai_bach', name: 'Tài Bạch', icon: 'attach_money', description: 'Tình hình tài chính, cách kiếm tiền và giữ tiền.', priority: 'high' },
    { id: 'quan_loc', name: 'Quan Lộc', icon: 'business_center', description: 'Sự nghiệp, công danh và địa vị xã hội.', priority: 'high' },
    { id: 'phu_the', name: 'Phu Thê', icon: 'favorite', description: 'Hôn nhân, người phối ngẫu và hạnh phúc gia đình.', priority: 'normal' },
    { id: 'phuc_duc', name: 'Phúc Đức', icon: 'temple_buddhist', description: 'May mắn, phúc phần tổ tiên, tinh thần.', priority: 'normal' },
    { id: 'thien_di', name: 'Thiên Di', icon: 'flight', description: 'Xuất hành, quan hệ xã hội bên ngoài.', priority: 'normal' },
    { id: 'dien_trach', name: 'Điền Trạch', icon: 'home', description: 'Nhà cửa, đất đai và tài sản cố định.', priority: 'normal' },
    { id: 'tu_tuc', name: 'Tử Tức', icon: 'child_care', description: 'Con cái, mối quan hệ với con cái.', priority: 'normal' },
    { id: 'phu_mau', name: 'Phụ Mẫu', icon: 'family_restroom', description: 'Cha mẹ, mối quan hệ với đấng sinh thành.', priority: 'normal' },
    { id: 'huynh_de', name: 'Huynh Đệ', icon: 'groups', description: 'Anh chị em ruột thịt, sự hỗ trợ từ người thân.', priority: 'normal' },
    { id: 'no_boc', name: 'Nô Bộc', icon: 'diversity_3', description: 'Bạn bè, đồng nghiệp, cấp dưới.', priority: 'normal' },
    { id: 'tat_ach', name: 'Tật Ách', icon: 'medical_services', description: 'Sức khỏe, bệnh tật và tai ương cần tránh.', priority: 'normal' },
];

export const MOCK_PALACE_CONTENT: Record<string, string> = {
    'menh': 'Bạn là người có ý chí vững vàng, độc lập và tự chủ trong mọi quyết định. Cuộc đời tuy có lúc thăng trầm nhưng nhờ bản lĩnh mạnh mẽ và khả năng vượt qua nghịch cảnh mà bạn luôn đứng vững. Bản chất của bạn thiên về tính cách lãnh đạo, thích làm chủ công việc của mình hơn là phụ thuộc vào người khác. Hậu vận về già sẽ an nhàn, phú quý đầy đủ nhờ sự tích lũy và nỗ lực không ngừng nghỉ trong giai đoạn đầu cuộc đời.',

    'tai_bach': 'Tài lộc của bạn ở mức khá giả, thường đến từ nhiều nguồn khác nhau, không chỉ phụ thuộc vào một con đường kiếm tiền duy nhất. Bạn có duyên với kinh doanh, đầu tư hoặc các hoạt động tạo ra thu nhập thụ động. Khả năng tài chính sẽ ngày càng tăng theo thời gian, đặc biệt sau tuổi 35. Tuy nhiên, bạn cần quản lý chi tiêu một cách chặt chẽ và có kế hoạch để tránh thất thoát tài sản do các khoản chi không cần thiết. Nên đầu tư vào bất động sản hoặc vàng để bảo toàn tài sản.',

    'quan_loc': 'Công danh sự nghiệp của bạn sẽ thăng tiến ổn định và bền vững. Bạn phù hợp với các nghề quản lý, tổ chức, hoặc kinh doanh độc lập nơi bạn có thể phát huy tối đa khả năng lãnh đạo và tầm nhìn chiến lược. Trong công việc, bạn thường gặp được quý nhân phù trợ vào những thời điểm quan trọng. Sự nghiệp có xu hướng phát triển mạnh nhất trong độ tuổi trung niên (35-50 tuổi). Hãy kiên trì với con đường đã chọn và không nên thay đổi hướng đi quá nhiều lần.',

    'phu_the': 'Tình duyên của bạn có xu hướng đến muộn nhưng khi đến sẽ rất bền vững và hạnh phúc. Người phối ngẫu của bạn sẽ là chỗ dựa tinh thần vững chắc, biết lo toan và vun vén cho gia đình. Họ có thể là người trầm tĩnh, chín chắn và có tư duy thực tế. Mối quan hệ hôn nhân của bạn sẽ trở nên hài hòa hơn sau khi trải qua giai đoạn từ 3-5 năm đầu, khi cả hai đã hiểu nhau sâu sắc hơn. Hãy kiên nhẫn và biết lắng nghe đối phương để xây dựng hạnh phúc lâu dài.',

    'phuc_duc': 'Bạn được hưởng phúc đức từ tổ tiên và gia đình, thường gặp dữ hóa lành trong những lúc khó khăn. Tâm tính của bạn lương thiện, thích giúp đỡ người khác mà không đòi hỏi đền đáp, chính vì vậy bạn thường gặp may mắn bất ngờ ở những thời điểm không ngờ tới. Tinh thần của bạn luôn lạc quan và biết tìm niềm vui trong cuộc sống đơn giản. Về già, bạn sẽ được tận hưởng tuổi thọ cao và sức khỏe tốt nhờ phước đức tích lũy.',

    'thien_di': 'Ra ngoài xa nhà thường đem lại may mắn và thành công cho bạn. Bạn được nhiều người quý mến và dễ dàng xây dựng mối quan hệ tốt đẹp ở những nơi mới. Nếu có cơ hội đi xa lập nghiệp hoặc công việc yêu cầu thường xuyên di chuyển, bạn sẽ gặp nhiều thuận lợi và phát triển tốt hơn so với ở lại quê nhà. Du lịch và khám phá những vùng đất mới cũng mang lại cho bạn nhiều cảm hứng và cơ hội kinh doanh. Hãy mạnh dạn bước ra khỏi vùng an toàn.',

    'dien_trach': 'Bạn có phúc lộc về đất đai và nhà cửa. Dù xuất phát điểm có thể khiêm tốn nhưng về sau bạn sẽ sở hữu nhiều bất động sản có giá trị. Ngôi nhà của bạn luôn ấm áp, êm ấm và là nơi mọi người muốn quay về. Gia đình bạn sống hòa thuận, ít tranh cãi và xung đột. Nên đầu tư vào việc mua đất hoặc nhà càng sớm càng tốt vì đây sẽ là nguồn tài sản bền vững và tăng giá theo thời gian. Tránh bán tài sản đất đai khi chưa thực sự cần thiết.',

    'tu_tuc': 'Con cái của bạn thông minh, học giỏi và hiếu thảo với cha mẹ. Bạn có duyên với việc nuôi dạy con thành người có ích cho xã hội. Con cái sẽ là niềm tự hào của bạn và về già sẽ lo lắng chu đáo cho bạn. Mối quan hệ giữa bạn và con cái rất tốt, dựa trên sự tôn trọng và yêu thương chân thành. Nếu chưa có con, đừng lo lắng vì khi duyên đến, bạn sẽ có con khỏe mạnh và thông minh. Hãy dành thời gian chất lượng cho con cái để xây dựng mối quan hệ bền chặt.',

    'phu_mau': 'Cha mẹ của bạn có sức khỏe tốt và sống thọ. Mối quan hệ giữa bạn và cha mẹ hòa thuận, tuy đôi khi có thể có những bất đồng nhỏ nhưng đều được giải quyết dễ dàng. Bạn được gia đình hậu thuẫn mạnh mẽ trong những quyết định quan trọng của cuộc đời. Cha mẹ là nguồn động viên tinh thần giúp bạn vượt qua khó khăn. Hãy dành thời gian quan tâm và chăm sóc cha mẹ khi họ về già, đó là cách đền đáp công ơn sinh thành dưỡng dục.',

    'huynh_de': 'Anh chị em ruột thịt của bạn rất hòa thuận và biết đùm bọc, giúp đỡ lẫn nhau trong cuộc sống. Mối quan hệ anh em là một trong những chỗ dựa tinh thần quan trọng của bạn. Có thể bạn sẽ hợp tác làm ăn với anh chị em trong một số giai đoạn của cuộc đời và đem lại kết quả tốt đẹp. Tuy nhiên, cần có sự minh bạch trong tài chính để tránh hiểu lầm không đáng có. Hãy luôn trân trọng tình cảm anh em vì đó là mối quan hệ máu mủ quý giá.',

    'no_boc': 'Bạn có nhiều bạn bè và người quen nhưng người tri kỷ thực sự thì ít. Cần cẩn trọng trong việc chọn đối tác làm ăn hoặc người giúp việc để tránh bị lợi dụng hoặc phản bội. Không nên tin tưởng hoàn toàn vào lời nói ngọt ngào mà hãy quan sát hành động thực tế. Tuy nhiên, những người bạn thật sự của bạn sẽ là những người rất chân thành và sẵn sàng giúp đỡ bạn khi khó khăn. Hãy biết phân biệt người thật lòng và người giả dối.',

    'tat_ach': 'Sức khỏe tổng thể của bạn tốt, ít ốm đau lặt vặt. Tuy nhiên, do làm việc nhiều và stress, bạn cần chú ý đến việc nghỉ ngơi và thư giãn đầy đủ. Các vấn đề về sức khỏe có thể xuất hiện chủ yếu liên quan đến hệ tiêu hóa (dạ dày, ruột) hoặc xương khớp khi bạn bước vào tuổi trung niên và về già. Nên duy trì thói quen tập thể dục đều đặn, ăn uống điều độ và khám sức khỏe định kỳ để phát hiện sớm các vấn đề tiềm ẩn. Tâm lý ổn định sẽ giúp sức khỏe thể chất tốt hơn.',
};

