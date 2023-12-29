import { MenuModel } from "../menu-type";

const menus: MenuModel[] = [
  {
    id: "menu-studyword",
    text: "학 습",
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
    id: "menu-play-box",
    cmd: "play",
    visible: "always",
    icon: {
      clazz: "material-icons",
      text: "smart_display",
    },
    text: "문장만들기",
    children: [],
  },
  {
    id: "menu-symbol-text",
    cmd: "text",
    visible: "always",
    icon: {
      clazz: "material-icons",
      text: "category",
    },
    text: "상징",
    children: [],
  },
  {
    id: "menu-column-sizer",
    cmd: "column-sizer",
    visible: "always",
    icon: {
      clazz: "material-icons",
      text: "view_column",
    },
    text: "열 조정",
    children: [],
  },
];

export const board = MenuModel.build(menus);
