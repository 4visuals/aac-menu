<svelte:options accessors={true} />

<script lang="ts">
  import type { Writable } from "svelte/store";
  import PopupMenu from "./menu/popup-menu.svelte";

  export let teacherState:Writable<boolean>;
  export let loadState:Writable<boolean>;
  export let chatState:Writable<boolean>;
  export let page:string;
  export let searchState:Writable<string>;

  let loaded = false; // [false, true, 'READING', 'SENTENCE']

  let activeMenu = null;
  loadState.subscribe((state) => {
    loaded = state;
  });

  let chatting = false;
  chatState.subscribe((state) => {
    chatting = state;
  });

  let isTeacher = false;
  teacherState.subscribe((state) => {
    isTeacher = state;
  });

  let word = [
    {
      id: "menu-file",
      text: "단어장",
      icon: {
        clazz: "material-icons",
        text: "dns",
      },
      visible: "always",
      children: [
        {
          id: "menu-new-word",
          text: "새 단어장",
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
      id: "menu-sizing",
      clazz: "btnSizing",
      text: "크게",
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

  let sentence = [
    {
      id: "menu-file",
      text: "바구니",
      icon: {
        clazz: "material-icons",
        text: "shopping_basket",
      },
      visible: "always",
      children: [
        {
          id: "menu-new-basket",
          text: "새 문장바구니",
          icon: {
            clazz: "material-icons",
            text: "note_add",
          },
          desc: "새로운 문장 바구니를 만듭니다.",
          visible: "always",
          children: [
            {
              id: "idCreateBasket",
              text: "만&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;들&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기",
              cmd: "idCreateBasket",
              props: {
                toggle: "modal",
                target: "#createBookModal",
              },
            },
          ],
        },
        {
          id: "menu-open-basket",
          text: "불러오기",
          icon: {
            clazz: "material-icons",
            text: "folder_open",
          },
          desc: "이미 만들어져 있는 문장 바구니를 엽니다.",
          visible: "always",
          children: [
            {
              id: "idOpenBasket",
              text: "불&nbsp;&nbsp;러&nbsp;&nbsp;오&nbsp;&nbsp;기",
              cmd: "idOpenBasket",
              props: {
                toggle: "modal",
                target: "#openBookModal",
              },
            },
          ],
        },
        {
          id: "menu-rename-basket",
          text: "이름 바꾸기",
          desc: "현재 문장 바구니의 이름을 변경합니다.",
          icon: {
            clazz: "material-icons",
            text: "text_rotation_none",
          },
          children: [
            {
              id: "idRenameBasket",
              text: "이&nbsp;름&nbsp;바&nbsp;꾸&nbsp;기",
              cmd: "idRenameBasket",
              props: {
                toggle: "modal",
                target: "#renameBookModal",
              },
            },
          ],
        },
        {
          id: "menu-saveas-basket",
          text: "다른 아름으로 저장",
          teacherOnly: true,
          icon: {
            clazz: "material-icons",
            text: "file_copy",
          },
          desc: "현재 문장 바구니의 복사본을 만듭니다.",
          children: [
            {
              id: "idSaveAsBasket",
              text: "사&nbsp;본&nbsp;만&nbsp;들&nbsp;기 ",
              cmd: "idSaveAsBasket",
              props: {
                toggle: "modal",
                target: "#saveAsBookModal",
              },
            },
          ],
        },
        {
          id: "menu-emptify-basket",
          text: "비우기",
          icon: {
            clazz: "material-icons",
            text: "backspace",
          },
          desc: "현재 문장 바구니의 모든 문장이 삭제됩니다.",
          children: [
            {
              id: "idClearBasket",
              text: "비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;우&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기",
              cmd: "idClearBasket",
              props: { toggle: "modal", target: "#clearBook" },
            },
          ],
        },
        {
          id: "menu-delete-bakset",
          text: "바구니 삭제",
          icon: {
            clazz: "material-icons",
            text: "delete",
          },
          desc: "현재 문장 바구니를 삭제합니다.",
          children: [
            {
              id: "idDeleteBasket",
              cmd: "idDeleteBasket",
              text: "삭&nbsp;&nbsp;제&nbsp;&nbsp;하&nbsp;&nbsp;기",
              props: {
                toggle: "modal",
                target: "#deleteBookModal",
              },
            },
          ],
        },
        {
          id: "menu-present-basket",
          text: "선물하기",
          icon: {
            clazz: "material-icons",
            text: "card_giftcard",
          },
          desc: "현재 문장 바구니를 다른 사용자에게 선물합니다.",
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
          id: "menu-export-basket",
          text: "내보내기",
          icon: {
            clazz: "material-icons",
            text: "file_download",
          },
          desc: "현재 문장 바구니의 모든 상징을 내보냅니다. 단어장으로 내보내거나 파일로 다운로드합니다.",
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
          desc: "공부할 문장을 선택합니다.",
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
              text: "&nbsp;&nbsp;쓰&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기&nbsp;&nbsp;",
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
    /*
    {
      id: "menu-print",
      text: "인쇄",
      children: [
        {
          id: 'menu-print-note',
          text: '학습지',
          icon: {
            clazz: "material-icons",
            text: "print" 
          },
          desc: '학습용 교재로 인쇄합니다.',
          children : [
            {
              id: 'btnPrintBasket',
              cmd: 'btnPrintBasket',
              text: '인쇄'
            }
          ]
        },
        {
          id: 'menu-print-sticker',
          text: '스티커/의사소통판/선잇기',
          icon: {
            clazz: "material-icons",
            text: "grid_on" 
          },
          desc: '스티커, 의사소통판 및 선잇기 화면으로 인쇄합니다.',
          children : [
            {
              id: 'btnPrintSticker',
              cmd: 'btnPrintSticker',
              text: '인쇄'
            }
          ]
        },
      ],
    },
    */
    {
      id: "menu-speak-sentence",
      cmd: "speak-sentence",
      icon: {
        clazz: "material-icons speak-all",
        text: "record_voice_over",
      },
      text: "읽기",
      children: [],
    },
    {
      id: "menu-save",
      cmd: "save-sentence",
      icon: { clazz: "material-icons", text: "save" },
      text: "저장",
      children: [],
    },
    {
      id: "menu-edit-sentence",
      cmd: "edit-sentence",
      icon: {
        clazz: "material-icons edit-default",
        text: "edit",
      },
      text: "편집",
      children: [],
    },
    {
      id: "menu-print-note",
      cmd: "btnPrintBasket",
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

  let reading = [
    {
      id: "menu-file",
      text: "책",
      icon: {
        clazz: "material-icons",
        text: "menu_book",
      },
      visible: "always",
      children: [
        {
          id: "menu-new-basket",
          text: "새 책",
          icon: {
            clazz: "material-icons",
            text: "note_add",
          },
          desc: "새로운 책을 만듭니다.",
          visible: "always",
          children: [
            {
              id: "idCreateBasket",
              text: "만&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;들&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기",
              cmd: "idCreateBasket",
              props: {
                toggle: "modal",
                target: "#createBookModal",
              },
            },
          ],
        },
        {
          id: "menu-open-basket",
          text: "불러오기",
          icon: {
            clazz: "material-icons",
            text: "folder_open",
          },
          desc: "이미 만들어져 있는 책을 엽니다.",
          visible: "always",
          children: [
            {
              id: "idOpenBasket",
              text: "불&nbsp;&nbsp;러&nbsp;&nbsp;오&nbsp;&nbsp;기",
              cmd: "idOpenBasket",
            },
          ],
        },
        {
          id: "menu-rename-basket",
          text: "이름 바꾸기",
          desc: "현재 책의 이름을 변경합니다.",
          icon: {
            clazz: "material-icons",
            text: "text_rotation_none",
          },
          children: [
            {
              id: "idRenameBasket",
              text: "이&nbsp;름&nbsp;바&nbsp;꾸&nbsp;기",
              cmd: "idRenameBasket",
              props: {
                toggle: "modal",
                target: "#renameBookModal",
              },
            },
          ],
        },
        {
          id: "menu-saveas-basket",
          text: "다른 이름으로 저장",
          teacherOnly: true,
          icon: {
            clazz: "material-icons",
            text: "file_copy",
          },
          desc: "현재 책의 복사본을 만듭니다.",
          children: [
            {
              id: "idSaveAsBasket",
              text: "사&nbsp;본&nbsp;만&nbsp;들&nbsp;기 ",
              cmd: "idSaveAsBasket",
              props: {
                toggle: "modal",
                target: "#saveAsBookModal",
              },
            },
          ],
        },
        {
          id: "menu-emptify-basket",
          text: "비우기",
          icon: {
            clazz: "material-icons",
            text: "backspace",
          },
          desc: "현재 책의 모든 내용을 삭제합니다.",
          children: [
            {
              id: "idClearBasket",
              text: "비&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;우&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기",
              cmd: "idClearBasket",
              props: { toggle: "modal", target: "#clearBook" },
            },
          ],
        },
        {
          id: "menu-delete-bakset",
          text: "삭제하기",
          icon: { clazz: "material-icons", text: "delete" },
          desc: "현재 책을 삭제합니다.",
          children: [
            {
              id: "idDeleteBasket",
              cmd: "idDeleteBasket",
              text: "삭&nbsp;&nbsp;제&nbsp;&nbsp;하&nbsp;&nbsp;기",
              props: {
                toggle: "modal",
                target: "#deleteBookModal",
              },
            },
          ],
        },
        {
          id: "menu-present-basket",
          text: "선물하기",
          icon: {
            clazz: "material-icons",
            text: "card_giftcard",
          },
          desc: "현재 책을 다른 사용자에게 선물합니다.",
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
          id: "menu-export-basket",
          text: "내보내기",
          icon: {
            clazz: "material-icons",
            text: "file_download",
          },
          desc: "현재 책의 모든 상징을 내보냅니다. 단어장으로 내보내거나 파일로 다운로드합니다.",
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
        {
          id: "menu-open-sentenceBasket",
          text: "문장바구니 불러오기",
          icon: {
            clazz: "material-icons",
            text: "folder_open",
          },
          desc: "이미 만들어져 있는 책을 엽니다.",
          visible: "always",
          children: [
            {
              id: "idOpenSentenceBasket",
              text: "문장바구니 불러오기",
              cmd: "idOpenSentenceBasket",
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
            }
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
          desc: "공부할 문장을 선택합니다.",
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
              text: "&nbsp;&nbsp;쓰&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기&nbsp;&nbsp;",
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
      id: "menu-search-config",
      text: "검 색",
      visible: "always",
      children: [
        {
          id: "menu-search-preference",
          text: "선호 상징",
          visible: "always",
          box: "box",
          icon: { clazz: "material-icons", text: "sort" },
          desc: "입력한 문장에 대해 선호하는 상징 목록을 지정합니다",
          children: [
            { id: "ara", value: "Ara", text: "Arasaac" },
            { id: "ewha", value: "Ewha", text: "이화-AAC" },
            { id: "son", value: "Son", text: "손담" },
            {
              id: "soy",
              value: "Soy",
              text: "SoyVisual",
            },
          ],
          prop: { type: "radio", name: "search-option" },
        },
      ],
    },
    {
      id: "menu-speak-sentence",
      cmd: "idSpeakAll",
      visible: "always",
      icon: {
        clazz: "material-icons",
        text: "record_voice_over",
      },
      text: "읽기",
      children: [],
    },
    {
      id: "menu-user-dict",
      cmd: "user-dict",
      visible: "always",
      icon: {
        clazz: "material-icons",
        text: "create_new_folder",
      },
      text: "사전",
      children: [],
    },
    {
      id: "menu-symbol-visible",
      cmd: "idClearSymbols",
      visible: "always",
      icon: { clazz: "material-icons", text: "image" },
      text: "상징",
      children: [],
    },
    {
      id: "menu-sizing",
      cmd: "sizing",
      visible: "always",
      icon: {
        clazz: "material-icons",
        text: "photo_size_select_large",
      },
      text: "크게",
      children: [],
    },
    {
      id: "menu-lock",
      cmd: "lock",
      visible: "always",
      icon: {
        clazz: "material-icons",
        text: "lock_open",
      },
      text: "해제",
      children: [],
    },
    {
      id: "menu-chat-mode",
      cmd: "idChat",
      icon: { clazz: "material-icons", text: "textsms" },
      text: "채팅",
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

  let pub = [
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
          desc: "공부할 문장을 선택합니다.",
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
              text: "&nbsp;&nbsp;쓰&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;기&nbsp;&nbsp;",
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
  let board = [
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
  let share = [
    board[0],
    board[1],
    board[2],
    board[3]
    //board[4]
  ]
  let menuList = { word, sentence, reading, pub, board, share };

  let menus = menuList[page];

  let prevMenu, nextMenu;

  const openMenuPopup = (menu) => {
    if (menu.visible !== "always" && !loaded) {
      return;
    }
    activeMenu = menu;
    let popups = filterMenu((m) => m.children.length > 0);
    const idx = popups.findIndex((m) => m === activeMenu);
    prevMenu = idx === 0 ? null : popups[idx - 1];
    nextMenu = idx + 1 === popups.length ? null : popups[idx + 1];

    document.body.classList.add("fill-h");
  };
  const clearMenu = (e) => {
    activeMenu = false;
    document.body.classList.remove("fill-h");
  };
  const filterMenu = (fn) => menus.filter(fn);

  const filterMenuWhenPub = () => {
    const filtered = filterMenu((m) => m.cmd);
    if ((page === "pub" || page === "reading") && loaded !== "SENTENCE") {
      const idx = filtered.findIndex((m) => m.id === "menu-print-sentence");
      filtered.splice(idx, 1);
    }
    return filtered;
  };
</script>

<div id="menu-wrapper">
  <div id="toolbar" class="d-flex no-bottom-radius">
    {#each filterMenu((m) => m.children.length > 0) as menu (menu.id)}
      <a
        class="tool-item"
        class:disabled={menu.visible !== "always" && !loaded}
        class:active={menu === activeMenu}
        id={menu.id}
        href={"#"}
        on:click|preventDefault={() => openMenuPopup(menu)}
      >
        {#if menu.icon}
          <span class="material-icons" style="vertical-align: middle"
            >{menu.icon.text}</span
          >
        {/if}
        {@html menu.text}</a
      >
    {/each}
    <div
      class:ml-auto={menus.filter((m) => m.children.length > 0).length > 0}
      class="text-nowrap cmd-bar"
    >
      <a href={"#"} class="ctrl tool-item" data-cmd="folding-cmd-bar"
        ><span class="material-icons">more_vert</span></a
      >
      <div class="cmd-bar-body">
        {#each filterMenuWhenPub() as menu (menu.id)}
          <a
            class="tool-item {menu.clazz || undefined} {menu.id ===
              'menu-chat-mode' && chatting
              ? 'enabled'
              : undefined}"
            class:disabled={menu.visible !== "always" && !loaded}
            href={"#"}
            on:click|preventDefault={() => {}}
            data-cmd={menu.cmd || undefined}
            data-toggle={menu.props && menu.props.toggle}
            data-target={menu.props && menu.props.target}
            ><span class="tool-icon {menu.icon.clazz || undefined}"
              >{menu.icon.text}</span
            >{#if menu.text}<span class="item-text"
                >{@html menu.text.trim()}</span
              >{/if}</a
          >
        {/each}
      </div>
    </div>
  </div>
</div>
{#if activeMenu}
  <PopupMenu
    on:close={clearMenu}
    on:active-menu={(e) => openMenuPopup(e.detail.menu)}
    teacher={teacherState}
    {loaded}
    {page}
    {searchState}
    menu={activeMenu}
  />
{/if}
