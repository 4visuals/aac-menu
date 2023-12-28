let sentence = [
  {
    id: "menu-file",
    text: "바구니",
    visible: "always",
    children: [
      {
        id: "menu-new-basket",
        text: "새 바구니",
        desc: "새로운 문장 바구니를 만듭니다",
        visible: "always",
        children: [
          {
            id: "idCreateBasket",
            text: "만들기",
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
        desc: "저장된 문장 바구니를 불러옵니다",
        visible: "always",
        children: [
          {
            id: "idOpenBasket",
            text: "불러오기",
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
        text: "아름 바꾸기",
        desc: "문장 바구니의 이름을 변경합니다",
        children: [
          {
            id: "idRenameBasket",
            text: "이름변경",
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
        desc: "문장 바구니의 복사본을 생성합니다",
        children: [
          {
            id: "idSaveAsBasket",
            text: "복사하기",
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
        text: "바구니 비우기",
        desc: "문장 바구니의 내용을 비웁니다",
        children: [
          {
            id: "idClearBasket",
            text: "비우기",
            cmd: "idClearBasket",
            props: {
              toggle: "modal",
              target: "#clearBook",
            },
          },
        ],
      },
      {
        id: "menu-delete-bakset",
        text: "삭제하기",
        desc: "문장 바구니를 삭제합니다",
        children: [
          {
            id: "idDeleteBasket",
            cmd: "idDeleteBasket",
            text: "삭제하기",
            props: {
              toggle: "modal",
              target: "#deleteBookModal",
            },
          },
        ],
      },
      {
        id: "menu-present-basket",
        text: "바구니 선물하기",
        desc: "문장 바구니를 다른 사용자에게 선물합니다",
        children: [
          {
            id: "presentThisBook",
            cmd: "presentThisBook",
            text: "선물하기",
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
        desc:
          "문장 바구니의 상징을 내보닙니다. 단어장으로 내보내거나 압축 파일로 내려받습니다",
        children: [
          {
            id: "btnExportWordBook",
            cmd: "btnExportWordBook",
            text: "단어장으로",
            props: {
              toggle: "modal",
              target: "#wordBookModal",
            },
          },
          {
            id: "btnSymbolExport",
            cmd: "btnSymbolExport",
            text: "내려받기",
            props: {
              toggle: "modal",
              target: "#exportModal",
            },
          },
        ],
      },
    ],
  },
  {
    id: "menu-word-study",
    text: "어휘",
    children: [],
  },
  {
    id: "menu-sentence-study",
    text: "문장",
    children: [],
  },
  {
    id: "menu-print",
    text: "인쇄",
    children: [],
  },
];
