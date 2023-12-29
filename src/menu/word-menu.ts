import { MenuModel } from "../menu-type";

const wordMenu: MenuModel[] = [
  {
    id: "menu-file",
    text: "단어장",
    level: { value: 1, policy: "hide" },
    icon: {
      clazz: "material-icons",
      text: "dns",
    },
    visible: "always",
    children: [
      {
        id: "menu-new-word",
        text: "새 단어장",
        level: { value: 1, policy: "hide" },
        icon: {
          clazz: "material-icons",
          text: "note_add",
        },
        desc: "새로운 단어장을 만듭니다.",
        visible: "always",
        children: [
          {
            id: "idCreateBook",
            cmd: "idCreateBook",
            text: "만&nbsp;&nbsp;&nbsp;&nbsp;들&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기",
            props: {
              toggle: "modal",
              target: "#createBookModal",
            },
          },
        ],
      },
      {
        id: "menu-open-word",
        text: "불러오기",
        level: { value: 1, policy: "hide" },
        icon: {
          clazz: "material-icons",
          text: "folder_open",
        },
        desc: "이미 만들어져 있는 단어장을 엽니다.",
        visible: "always",
        children: [
          {
            id: "idOpenBook",
            cmd: "idOpenBook",
            text: "불&nbsp;&nbsp;러&nbsp;&nbsp;오&nbsp;&nbsp;기",
            props: {
              toggle: "modal",
              target: "#openBookModal",
            },
          },
        ],
      },
      {
        id: "menu-rename",
        text: "이름 바꾸기",
        level: { value: 1, policy: "hide" },
        icon: {
          clazz: "material-icons",
          text: "text_rotation_none",
        },
        desc: "현재 단어장의 이름을 변경합니다.",
        children: [
          {
            id: "renameBook",
            cmd: "renameBook",
            text: "이&nbsp;름&nbsp;바&nbsp;꾸&nbsp;기",
            props: {
              toggle: "modal",
              target: "#renameBookModal",
            },
          },
        ],
      },
      {
        id: "menu-saveas",
        text: "다른 이름으로 저장",
        teacherOnly: true,
        icon: {
          clazz: "material-icons",
          text: "file_copy",
        },
        desc: "현재 단어장의 복사본을 만듭니다.",
        children: [
          {
            id: "saveAsBook",
            cmd: "saveAsBook",
            text: "사&nbsp;본&nbsp;만&nbsp;들&nbsp;기",
            props: {
              toggle: "modal",
              target: "#saveAsBookModal",
            },
          },
        ],
      },
      {
        id: "menu-emptify",
        text: "비우기",
        icon: {
          clazz: "material-icons",
          text: "backspace",
        },
        desc: "현재 단어장 모든 어휘가 삭제됩니다.",
        children: [
          {
            id: "clearBook",
            cmd: "clear-book",
            text: "비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;우&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기",
            props: { toggle: "modal", target: "#clearBook" },
          },
        ],
      },
      {
        id: "menu-delete",
        text: "삭제하기",
        level: { value: 1, policy: "hide" },
        icon: { clazz: "material-icons", text: "delete" },
        desc: "현재 단어장을 삭제합니다.",
        children: [
          {
            id: "deleteBook",
            cmd: "deleteBook",
            text: "삭&nbsp;&nbsp;제&nbsp;&nbsp;하&nbsp;&nbsp;기",
            props: {
              toggle: "modal",
              target: "#deleteBookModal",
            },
          },
        ],
      },
      {
        id: "menu-present",
        text: "선물하기",
        icon: {
          clazz: "material-icons",
          text: "card_giftcard",
        },
        desc: "현재 단어장을 다른 사용자에게 선물합니다.",
        children: [
          {
            id: "presentThisBook",
            cmd: "presentThisBook",
            text: "선&nbsp;&nbsp;물&nbsp;&nbsp;하&nbsp;&nbsp;기",
            props: {
              toggle: "modal",
              target: "#presentBasketModal",
            },
          },
        ],
      },
      {
        id: "menu-export",
        text: "내보내기",
        icon: {
          clazz: "material-icons",
          text: "file_download",
        },
        desc: "현재 단어장의 상징을 파일이나 보드로 변환합니다.",
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
            id: "btnBoardExport",
            cmd: "btnBoardExport",
            text: "보드 만들기",
            props: {
              toggle: "modal",
              target: "#boardModal",
            },
          },
        ],
      },
    ],
  },
  {
    id: "menu-studyword",
    text: "학 습",
    visible: "loaded",
    children: [
      {
        id: "menu-list-words",
        text: "어휘 목록",
        level: { value: 1, policy: "hide" },
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
        level: { value: 1, policy: "hide" },
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
        level: { value: 1, policy: "hide" },
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
        level: { value: 1, policy: "hide" },
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
    id: "menu-sizing",
    clazz: "btnSizing",
    text: "크게",
    level: { value: 1, policy: "hide" },
    visible: "always",
    cmd: "sizing",
    icon: {
      clazz: "material-icons",
      text: "photo_size_select_large",
    },
    children: [],
  },
  {
    id: "menu-help",
    clazz: "btnHelp",
    text: "help",
    level: { value: 1, policy: "hide" },
    visible: "always",
    cmd: "help",
    icon: { clazz: "material-icons", text: "help" },
    children: [],
  },
  {
    id: "printBook",
    cmd: "printBook",
    clazz: "primary",
    text: "인쇄",
    icon: { clazz: "material-icons", text: "print" },
    children: [],
  },
];
export const word = MenuModel.build(wordMenu);
