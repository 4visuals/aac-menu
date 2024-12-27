import { MenuModel } from "../menu-type";

const menus: MenuModel[] = [
  {
    id: "menu-file",
    text: "간행물",
    icon: {
      clazz: "material-icons",
      text: "menu_book",
    },
    visible: "always",
    children: [
      {
        id: "menu-open-book",
        text: "책꽂이",
        icon: {
          clazz: "material-icons",
          text: "note_add",
        },
        desc: "공개된 간행물을 열람합니다",
        visible: "always",
        children: [
          {
            id: "idOpenBook",
            text: "&nbsp;열&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기&nbsp;",
            cmd: "idOpenBook",
          },
        ],
      },
      {
        id: "menu-export-basket",
        text: "내보내기",
        icon: {
          clazz: "material-icons",
          text: "file_download",
        },
        desc: "간행물의 상징을 내보닙니다. 단어장으로 내보내거나 압축 파일로 내려받습니다",
        children: [
          {
            id: "btnSymbolExport",
            cmd: "btnSymbolExport",
            text: "상징&nbsp;&nbsp;다운로드",
            teacherOnly: true,
            props: {
              toggle: "modal",
              target: "#exportModal",
            },
          },
          {
            id: "btnExportWordBookDefault",
            cmd: "btnExportWordBookDefault",
            text: "단어장 만들기 (기본형)",
            props: {
              toggle: "modal",
              target: "#wordBookModalDefault",
            },
          },
          {
            id: "btnExportWordBookOrigin",
            cmd: "btnExportWordBookOrigin",
            text: "단어장 만들기 (활용형)",
            props: {
              toggle: "modal",
              target: "#wordBookModalOrigin",
            },
          },
        ],
      },
    ],
  },
  {
    id: "menu-studyword",
    text: "어 휘",
    visible: "loaded",
    children: [
      {
        id: "menu-list-words",
        text: "어휘 목록",
        keepalive: true,
        icon: { clazz: "material-icons", text: "subject" },
        desc: "학습할 어휘를 선택합니다.",
        children: [
          {
            id: "idWordList",
            cmd: "idWordList",
            text: "어&nbsp;&nbsp;휘&nbsp;&nbsp;목&nbsp;&nbsp;록",
            props: {
              toggle: "modal",
              target: "#wordListModal",
            },
          },
        ],
      },
      {
        id: "menu-list-cards",
        text: "낱말 카드",
        icon: {
          clazz: "material-icons",
          text: "grid_view",
        },
        desc: "카드를 보며 어휘를 익힙니다.",
        children: [
          {
            id: "readingCard",
            cmd: "readingCard",
            text: "낱&nbsp;&nbsp;말&nbsp;&nbsp;카&nbsp;&nbsp;드",
            props: { toggle: "modal", target: "#cardModal" },
          },
        ],
      },
      {
        id: "menu-study-word",
        text: "낱말 찾기",
        icon: {
          clazz: "material-icons",
          text: "font_download",
        },
        desc: "그림을 보고 낱말을 찾습니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "learningBook",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "quizBook",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-study-pic",
        text: "그림 찾기",
        icon: {
          clazz: "material-icons",
          text: "image_search",
        },
        desc: "낱말을 보고 그림을 찾습니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "learningPic",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "quizPic",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-study-char",
        text: "글자 맞추기",
        icon: {
          clazz: "material-icons",
          text: "format_size",
        },
        desc: "그림 또는 그림과 글자를 보고 낱글자를 찾습니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "learn-matchingChar",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "quiz-matchingChar",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-study-letter",
        text: "자모음 조합하기",
        icon: {
          clazz: "material-icons",
          text: "format_size",
        },
        desc: "그림 또는 그림과 글자를 보고 자모음을 조합합니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "learn-matchingLetter",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "quiz-matchingLetter",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-study-textWriting",
        text: "낱말 보고 쓰기",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        desc: "낱말을 보고 어휘를 입력합니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "learningTextWriting",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "quizTextWriting",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-study-symbolWriting",
        text: "그림 보고 쓰기",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        desc: "그림을 보고 어휘를 입력합니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "learningSymbolWriting",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "quizSymbolWriting",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-study-listeningWriting",
        text: "듣고 쓰기",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        desc: "어휘를 듣고 입력합니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "learningListeningWriting",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "quizListeningWriting",
            clazz: "quiz",
          },
        ],
      },
    ],
  },
  {
    id: "menu-sentence-study",
    text: "문 장",
    children: [
      {
        id: "menu-list-words",
        text: "문장 목록",
        keepalive: true,
        icon: { clazz: "material-icons", text: "subject" },
        desc: "학습할 문장을 선택합니다.",
        children: [
          {
            id: "idSentenceList",
            cmd: "idSentenceList",
            text: "문&nbsp;&nbsp;장&nbsp;&nbsp;목&nbsp;&nbsp;록",
            props: {
              toggle: "modal",
              target: "#sentenceListModal",
            },
          },
        ],
      },
      {
        id: "menu-sentence-cards",
        text: "문장 카드",
        icon: {
          clazz: "material-icons",
          text: "grid_view",
        },
        desc: "카드를 보며 문장을 익힙니다.",
        children: [
          {
            id: "sentenceCard",
            cmd: "sentenceCard",
            text: "문&nbsp;&nbsp;장&nbsp;&nbsp;카&nbsp;&nbsp;드",
            props: { toggle: "modal", target: "#sentenceCardModal" },
          },
          {
            id: "sentenceExercise",
            cmd: "sentenceExercise",
            text: "쓰&nbsp;&nbsp;기&nbsp;&nbsp;연&nbsp;&nbsp;습",
            props: {
              toggle: "modal",
              target: "#sentenceCardModal",
              backdrop: "static",
            },
          },
        ],
      },
      {
        id: "menu-sentence-lerning",
        text: "어절 학습",
        icon: {
          clazz: "material-icons",
          text: "app_registration",
        },
        desc: "제시된 장면을 의문사와 연결하여 어절 단위로 학습합니다.",
        children: [
          {
            id: "sentenceLearning",
            cmd: "sentenceLearning",
            text: " 듣기/말하기 ",
            props: {
              toggle: "modal",
              target: "#sentenceCardModal",
            },
          },
          {
            id: "eojeolSimpleLearning",
            cmd: "eojeolSimpleLearning",
            text: "선택하기1",
          },
          {
            id: "eojeolLearning",
            cmd: "eojeolLearning",
            text: "선택하기2",
          },
        ],
      },
      {
        id: "menu-question",
        text: "의문사 질문에 답하기",
        icon: {
          clazz: "material-icons",
          text: "contact_support",
        },
        desc: "의문사(누구,무엇,언제,어디)를 사용하는 질문에 적절한 답을 찾습니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "idQuestionLearning",
            clazz: "learn",
            props: { cmd: "question-learning" },
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "idQuestionQuiz",
            clazz: "quiz",
            props: { cmd: "question-quiz" },
          },
        ],
      },
      {
        id: "menu-sentence-ordering",
        text: "문장 순서 맞추기",
        icon: {
          clazz: "material-icons",
          text: "password",
        },
        desc: "어절의 순서를 맞추어 올바른 문장을 만듭니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "id-phrase-learning",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "id-phrase-quiz",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-symbol-sentence",
        text: "상징 보고 문장 고르기",
        icon: {
          clazz: "material-icons",
          text: "category",
        },
        desc: "제시된 상징을 보고 적절한 문장을 고릅니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "idSentenceLearning",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "idSentenceQuiz",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-scene-sentence",
        text: "장면 보고 문장 고르기",
        icon: {
          clazz: "material-icons",
          text: "panorama",
        },
        desc: "제시된 장면을 보고 적절한 문장을 고릅니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "idSceneLearing",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "idSceneQuiz",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-sentence-scene",
        text: "문장 보고 장면 고르기",
        icon: {
          clazz: "material-icons",
          text: "format_list_bulleted",
        },
        desc: "제시된 문장을 보고 적절한 장면을 고릅니다.",
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "idTextLearing",
            clazz: "learn",
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "idTextQuiz",
            clazz: "quiz",
          },
        ],
      },
      {
        id: "menu-sentence-writing-one",
        text: "장면과 문장 보고 쓰기",
        desc: "장면과 함께 제시된 문장을 보고 씁니다.",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "writing-scn-stc",
            clazz: "writing learn",
            props: { cmd: "text_learning" },
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "writing-scn-stc",
            clazz: "writing quiz",
            props: { cmd: "text_quiz" },
          },
        ],
      },
      {
        id: "menu-sentence-writing-two",
        text: "상징과 문장 보고 쓰기",
        desc: "상징과 함께 제시된 문장을 보고 씁니다.",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "writing-sym-stc",
            clazz: "writing learn",
            props: { cmd: "symboltext_learning" },
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "writing-sym-stc",
            clazz: "writing quiz",
            props: { cmd: "symboltext_quiz" },
          },
        ],
      },
      {
        id: "menu-sentence-writing-three",
        text: "상징 보고 쓰기",
        desc: "제시된 상징을 보고 문장을 씁니다.",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "writing-sym",
            clazz: "writing learn",
            props: { cmd: "symbol_learning" },
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "writing-sym",
            clazz: "writing quiz",
            props: { cmd: "symbol_quiz" },
          },
        ],
      },
      {
        id: "menu-sentence-writing-four",
        text: "장면 보고 쓰기",
        desc: "제시된 장면을 보고 문장을 씁니다.",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "writing-scene",
            clazz: "writing learn",
            props: { cmd: "scene_learning" },
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "writing-scene",
            clazz: "writing quiz",
            props: { cmd: "scene_quiz" },
          },
        ],
      },
      {
        id: "menu-sentence-writing-five",
        text: "듣고 쓰기",
        desc: "문장을 듣고 씁니다.",
        icon: {
          clazz: "material-icons",
          text: "keyboard",
        },
        children: [
          {
            text: "&nbsp;&nbsp;학&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;습&nbsp;&nbsp;",
            cmd: "writing-listening",
            clazz: "writing learn",
            props: { cmd: "listening_learning" },
          },
          {
            text: "&nbsp;&nbsp;퀴&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;즈&nbsp;&nbsp;",
            cmd: "writing-listening",
            clazz: "writing quiz",
            props: { cmd: "listening_quiz" },
          },
        ],
      },
    ],
  },
  {
    id: "menu-speak-sentence",
    cmd: "idSpeakAll",
    icon: {
      clazz: "material-icons",
      text: "record_voice_over",
    },
    text: "읽기",
    children: [],
  },
  {
    id: "menu-lock",
    cmd: "lock",
    icon: {
      clazz: "material-icons",
      text: "lock_open",
    },
    text: "해제",
    children: [],
  },
  {
    id: "menu-bookmark",
    cmd: "idBookmark",
    icon: {
      clazz: "material-icons",
      text: "star_border",
    },
    text: "즐겨찾기",
    teacherOnly: true,
    children: [],
  },
  {
    id: "menu-assignment",
    cmd: "assignment",
    visible: "always",
    icon: {
      clazz: "material-icons",
      text: "assignment_ind",
    },
    text: "과제",
    props: {
      toggle: "modal",
      target: "#student-reg-modal",
    },
    children: [],
  },
  {
    id: "menu-print-book",
    cmd: "btnPrintBook",
    clazz: "success",
    text: "책",
    icon: { clazz: "material-icons", text: "print" },
    children: [],
  },
  {
    id: "menu-print-sentence",
    cmd: "btnPrintSentence",
    clazz: "warning",
    text: "문장",
    icon: { clazz: "material-icons", text: "print" },
    children: [],
  },
  {
    id: "menu-print-sticker",
    cmd: "btnPrintSticker",
    clazz: "primary",
    text: "낱말",
    icon: { clazz: "material-icons", text: "print" },
    children: [],
  },
];

export const pub = MenuModel.build(menus);
