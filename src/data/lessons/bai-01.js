const bai01 = {
  id: "bai-01",
  number: 1,
  title: "Bài 1",
  vocab: [
    { kana: "わたし", meaning: "tôi" },
    { kana: "あなた", meaning: "anh/chị, ông/bà, bạn (ngôi thứ II số ít)" },
    {
      kana: "あの ひと",
      kanji: "あの 人",
      meaning: "người kia, người đó, anh kia, chị kia",
      note: "あのかた（あの方）: vị kia - là cách nói lịch sự của あのひと",
    },
    {
      kana: "〜さん",
      meaning: "anh, chị, ông, bà (hậu tố thêm vào phía sau tên của người khác khi gọi thể hiện tính lịch sự)",
    },
    {
      kana: "〜ちゃん",
      meaning: "(hậu tố thêm vào phía sau tên của trẻ em thay cho 〜さん)",
    },
    {
      kana: "〜じん",
      kanji: "〜人",
      meaning: "(hậu tố mang nghĩa “người ~”; ví dụ アメリカじん: người Mỹ)",
    },
    {
      kana: "せんせい",
      kanji: "先生",
      meaning: "thầy/cô (không dùng khi giới thiệu về nghề giáo viên của chính mình)",
    },
    { kana: "きょうし", kanji: "教師", meaning: "giáo viên" },
    { kana: "がくせい", kanji: "学生", meaning: "học sinh, sinh viên" },
    { kana: "かいしゃいん", kanji: "会社員", meaning: "nhân viên công ty" },
    {
      kana: "しゃいん",
      kanji: "社員",
      meaning: "nhân viên Công ty ~ (dùng kèm theo tên công ty; ví dụ IMCの しゃいん)",
    },
    { kana: "ぎんこういん", kanji: "銀行員", meaning: "nhân viên ngân hàng" },
    { kana: "いしゃ", kanji: "医者", meaning: "bác sĩ" },
    { kana: "けんきゅうしゃ", kanji: "研究者", meaning: "nhà nghiên cứu" },
    { kana: "だいがく", kanji: "大学", meaning: "đại học, trường đại học" },
    { kana: "びょういん", kanji: "病院", meaning: "bệnh viện" },
    {
      kana: "だれ（どなた）",
      meaning: "ai (どなた là cách nói lịch sự của だれ, vị nào)",
    },
    { kana: "ー さい", kanji: "一 歳", meaning: "~ tuổi" },
    {
      kana: "なんさい（おいくつ）",
      kanji: "何歳",
      meaning: "mấy tuổi, bao nhiêu tuổi (おいくつ là cách nói lịch sự của なんさい)",
    },
    { kana: "はい", meaning: "vâng, dạ" },
    { kana: "いいえ", meaning: "không" },
  ],
  keyPhrases: [
    {
      jp: "初めまして。",
      vi: "Rất hân hạnh được gặp anh/chị.",
      note: "Đây là lời chào với người lần đầu tiên gặp, là câu nói đầu tiên khi giới thiệu về mình.",
    },
    { jp: "〜から 来ました。", vi: "Tôi đến từ ~." },
    {
      jp: "[どうぞ] よろしく [お願いします]。",
      vi: "Rất vui được làm quen với anh/chị.",
      note: "Rất mong được sự giúp đỡ của anh/chị. Luôn được dùng làm câu kết thúc sau khi giới thiệu về mình.",
    },
    {
      jp: "失礼ですが",
      vi: "Xin lỗi….",
      note: "dùng khi hỏi ai đó về thông tin cá nhân như là tên hoặc địa chỉ của họ",
    },
    { jp: "お名前は？", vi: "Tên anh/chị là gì?" },
    { jp: "こちらは 〜さんです。", vi: "Đây là anh/chị/ông/bà ~." },
  ],
  countryVocab: [
    { jp: "アメリカ", vi: "Mỹ" },
    { jp: "イギリス", vi: "Anh" },
    { jp: "インド", vi: "Ấn Độ" },
    { jp: "インドネシア", vi: "In-đô-nê-xi-a" },
    { jp: "韓国", vi: "Hàn Quốc" },
    { jp: "タイ", vi: "Thái Lan" },
    { jp: "中国", vi: "Trung Quốc" },
    { jp: "ドイツ", vi: "Đức" },
    { jp: "日本", vi: "Nhật Bản" },
    { jp: "ブラジル", vi: "Braxin" },
  ],
  fictionalNames: [
    { jp: "IMC／パワー電気／ブラジルエアー", vi: "tên công ty giả định" },
    { jp: "AKC", vi: "tên tổ chức giả định" },
    { jp: "神戸病院", vi: "tên bệnh viện giả định" },
    { jp: "さくら大学／富士大学", vi: "tên đại học giả định" },
  ],
  translation: {
    patterns: [
      "Tôi là Mike Miller.",
      "Anh Santos không phải là sinh viên.",
      "Anh Miller có phải là nhân viên công ty không?",
      "Anh Santos cũng là nhân viên công ty.",
    ],
    examples: [
      {
        question: "Anh có phải là anh Mike Miller không?",
        answer: "…Vâng, tôi là Mike Miller.",
      },
      {
        question: "Anh Miller, anh có phải là sinh viên không?",
        answer: "…Không, tôi không phải là sinh viên.",
      },
      {
        question: "Ông Wang có phải là nhân viên ngân hàng không?",
        answer: "…Không, ông Wang không phải là nhân viên ngân hàng. Ông ấy là bác sĩ.",
      },
      {
        question: "Vị kia là ai?",
        answer: "…Đó là ông Watt. Ông ấy là giảng viên của Trường Đại học Sakura.",
      },
      {
        question: "Anh Guputa có phải là nhân viên công ty không?",
        answer:
          "…Vâng, (anh ấy) là nhân viên công ty.\nChị Karina cũng là nhân viên công ty à?\n…Không. (Chị Karina) là sinh viên.",
      },
      {
        question: "Em Teresa mấy tuổi?",
        answer: "…(Em ấy) 9 tuổi.",
      },
    ],
    dialogue: {
      title: "Rất vui được làm quen với chị",
      lines: [
        { speaker: "Sato", text: "Chào anh!" },
        { speaker: "Yamada", text: "Chào chị!" },
        { speaker: "Yamada", text: "Chị Sato, đây là anh Mike Miller." },
        {
          speaker: "Miller",
          text: "Rất vui được làm quen với chị. Tôi là Mike Miller.\nTôi đến từ Mỹ.\nRất mong sẽ nhận được sự giúp đỡ của chị.",
        },
        {
          speaker: "Sato",
          text: "Tôi là Keiko Sato.\nRất vui được làm quen với anh.",
        },
      ],
    },
  },
  reference: {
    title: "国・人・ことば — Nước, người & ngôn ngữ",
    columns: ["Nước", "Người", "Ngôn ngữ"],
    rows: [
      ["アメリカ (Mỹ)", "アメリカ人", "英語 (tiếng Anh)"],
      ["イギリス (Anh)", "イギリス人", "英語 (tiếng Anh)"],
      ["イタリア (Ý)", "イタリア人", "イタリア語 (tiếng Ý)"],
      ["イラン (Iran)", "イラン人", "ペルシア語 (tiếng Ba Tư)"],
      ["インド (Ấn Độ)", "インド人", "ヒンディー語 (tiếng Hin-đi)"],
      ["インドネシア (In-đô-nê-xi-a)", "インドネシア人", "インドネシア語 (tiếng In-đô-nê-xi-a)"],
      ["エジプト (Ai Cập)", "エジプト人", "アラビア語 (tiếng Ả-rập)"],
      ["オーストラリア (Úc)", "オーストラリア人", "英語 (tiếng Anh)"],
      ["カナダ (Canada)", "カナダ人", "英語 (tiếng Anh) / フランス語 (tiếng Pháp)"],
      ["韓国 (Hàn Quốc)", "韓国人", "韓国語 (tiếng Hàn Quốc)"],
      ["サウジアラビア (Ả-rập Xê-út)", "サウジアラビア人", "アラビア語 (tiếng Ả-rập)"],
      ["シンガポール (Singapore)", "シンガポール人", "英語 (tiếng Anh)"],
      ["スペイン (Tây Ban Nha)", "スペイン人", "スペイン語 (tiếng Tây Ban Nha)"],
      ["タイ (Thái Lan)", "タイ人", "タイ語 (tiếng Thái)"],
      ["中国 (Trung Quốc)", "中国人", "中国語 (tiếng Trung Quốc)"],
      ["ドイツ (Đức)", "ドイツ人", "ドイツ語 (tiếng Đức)"],
      ["日本 (Nhật Bản)", "日本人", "日本語 (tiếng Nhật)"],
      ["フランス (Pháp)", "フランス人", "フランス語 (tiếng Pháp)"],
      ["フィリピン (Philippine)", "フィリピン人", "フィリピノ語 (tiếng Philippine)"],
      ["ブラジル (Braxin)", "ブラジル人", "ポルトガル語 (tiếng Bồ Đào Nha)"],
      ["ベトナム (Việt Nam)", "ベトナム人", "ベトナム語 (tiếng Việt)"],
      ["マレーシア (Malaysia)", "マレーシア人", "マレーシア語 (tiếng Mã Lai)"],
      ["メキシコ (Mexico)", "メキシコ人", "スペイン語 (tiếng Tây Ban Nha)"],
      ["ロシア (Nga)", "ロシア人", "ロシア語 (tiếng Nga)"],
    ],
  },
  grammar: [
    {
      number: 1,
      pattern: "Danh từ1 は Danh từ2 です",
      sections: [
        {
          subtitle: "Trợ từ は",
          body: "Trợ từ は biểu thị rằng danh từ đứng trước nó là chủ đề của câu văn. Người nói đặt は sau chủ đề mà mình muốn nói đến và xây dựng thành câu văn bằng cách thêm vào phía sau は những thông tin trần thuật vị ngữ.",
          examples: [{ jp: "① わたしは マイク・ミラーです。", vi: "Tôi là Mike Miller." }],
          note: "Trợ từ は phát âm là わ.",
        },
        {
          subtitle: "です",
          body: "Danh từ đi cùng です để tạo thành vị ngữ. です vừa biểu thị ý nghĩa phán đoán, khẳng định, vừa biểu thị thái độ lịch sự đối với người nghe. です biến đổi hình thức trong câu phủ định (xem mục 2) và trong biểu thị thì quá khứ (xem Bài 12).",
          examples: [{ jp: "② わたしは 会社員です。", vi: "Tôi là nhân viên công ty." }],
        },
      ],
    },
    {
      number: 2,
      pattern: "Danh từ1 は Danh từ2 じゃ（では）ありません",
      sections: [
        {
          body: "じゃ（では）ありません là thể phủ định của です。じゃありません thường được sử dụng trong hội thoại hàng ngày, còn ではありません được sử dụng trong các bài phát biểu trang trọng hay trong văn viết.",
          examples: [{ jp: "③ サントスさんは 学生じゃ ありません。", vi: "Anh Santos không phải là sinh viên." }],
          note: "Trợ từ は trong では đọc là わ.",
        },
      ],
    },
    {
      number: 3,
      pattern: "Danh từ1 は Danh từ2 ですか（câu nghi vấn）",
      sections: [
        {
          subtitle: "Trợ từ か",
          body: "Trợ từ か được dùng để biểu thị sự không chắc chắn, sự nghi vấn của người nói. Câu nghi vấn được tạo thành bằng cách thêm か vào cuối câu. Trong câu nghi vấn, phần cuối câu được đọc với giọng cao hơn.",
        },
        {
          subtitle: "Câu nghi vấn để xác nhận xem nội dung của câu văn là đúng hay sai",
          body: "Tạo thành câu nghi vấn bằng cách dùng trợ từ か ở cuối câu mà không thay đổi trật tự từ trong câu. Câu nghi vấn loại này xác nhận xem nội dung của câu văn là đúng hay sai, trường hợp đúng thì trả lời là はい, không đúng thì trả lời là いいえ。",
          examples: [
            { jp: "④ ミラーさんは アメリカ人ですか。", vi: "Anh Miller có phải là người Mỹ không?" },
            { jp: "……はい、アメリカ人です。", vi: "…Vâng, anh ấy là người Mỹ." },
            { jp: "⑤ ミラーさんは 先生ですか。", vi: "Anh Miller có phải là giáo viên không?" },
            { jp: "……いいえ、先生じゃ ありません。", vi: "…Không, anh ấy không phải là giáo viên." },
          ],
        },
        {
          subtitle: "Câu nghi vấn có từ nghi vấn",
          body: "Thay nghi vấn từ vào vị trí của nội dung mà bạn muốn hỏi, thêm trợ từ か vào cuối câu. Trật tự từ không thay đổi.",
          examples: [
            { jp: "⑥ あの 方は どなたですか。", vi: "Người kia là ai?" },
            { jp: "……[あの 方は] ミラーさんです。", vi: "…Người đó là anh Miller." },
          ],
        },
      ],
    },
    {
      number: 4,
      pattern: "Danh từ も",
      sections: [
        {
          body: "Trợ từ も được dùng khi trình bày một nội dung tương tự như ở câu văn trước.",
          examples: [
            {
              jp: "⑦ ミラーさんは 会社員です。グプタさんも 会社員です。",
              vi: "Anh Miller là nhân viên công ty. Anh Gupta cũng là nhân viên công ty.",
            },
          ],
        },
      ],
    },
    {
      number: 5,
      pattern: "Danh từ1 の Danh từ2",
      sections: [
        {
          body: "Trong trường hợp Danh từ1 ở trước bổ nghĩa cho Danh từ2 ở sau thì hai danh từ đó được nối với nhau bằng trợ từ の. Ở bài 1, Danh từ1 biểu thị nơi sở thuộc của Danh từ2.",
          examples: [{ jp: "⑧ ミラーさんは IMCの 社員です。", vi: "Anh Miller là nhân viên công ty IMC." }],
        },
      ],
    },
    {
      number: 6,
      pattern: "〜さん",
      sections: [
        {
          body: "Trong tiếng Nhật, từ さん được dùng sau họ hoặc tên của người nghe hoặc người ở ngôi thứ 3. Vì sử dụng さん để thể hiện tính lịch sự nên không dùng sau họ hoặc tên của chính người nói. Đối với trẻ em thì từ ちゃん với sắc thái thân mật sẽ được dùng thay cho さん.",
          examples: [{ jp: "⑨ あの 方は ミラーさんです。", vi: "Người kia là anh Miller." }],
        },
        {
          body: "Khi gọi, nếu trường hợp đã biết họ hoặc tên của người nghe thì không dùng あなた mà thêm さん vào sau họ hoặc tên người đó để gọi.",
          examples: [
            { jp: "⑩ 鈴木：ミラーさんは 学生ですか。", vi: "Suzuki: Anh Miller có phải là sinh viên không?" },
            { jp: "ミラー：いいえ、会社員です。", vi: "Miller: Không, tôi là nhân viên công ty." },
          ],
          note: "あなた được sử dụng trong những quan hệ cực kỳ thân mật như vợ chồng, người yêu, v.v.. Do đó cần thiết phải chú ý khi sử dụng ngoài những trường hợp trên vì có thể sẽ gây cho đối phương ấn tượng không tốt.",
        },
      ],
    },
  ],
};

export default bai01;
