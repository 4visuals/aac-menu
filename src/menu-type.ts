export type PageName =
  | "word"
  | "sentence"
  | "reading"
  | "pub"
  | "board"
  | "share";

export type MenuList = Record<PageName, MenuModel[]>;
export type IconType = {
  clazz: string;
  text: string;
};
export type CssSelector = string;
export type MenuProps = {
  toggle?: string;
  target?: CssSelector;
  backdrop?: "static";
  cmd?: string;
};
export class MenuModel {
  /**
   * [root][branch]
   */
  id?: string;
  box?: "box";
  value?: "Ara" | "Ewha" | "Son" | "Soy";
  prop?: { type: "radio"; name: "search-option" };
  /**
   * [root]
   */
  visible?: "always" | "loaded";
  /**
   * 레이블
   */
  text?: string;
  keepalive?: boolean = false;
  teacherOnly?: boolean = false;
  cmd?: string;
  /**
   * branch menu인 경우
   */
  icon?: IconType;
  /**
   * [branch] 마우스 올릴때 보여줄 설명
   */
  desc?: string;
  /**
   * leaf menu인 경우 학습 퀴즈 구분
   */
  clazz?:
    | "learn"
    | "quiz"
    | "btnHelp"
    | "primary"
    | "btnSizing"
    | "writing learn"
    | "writing quiz"
    | "warning"
    | "success";

  props?: MenuProps;
  children?: MenuModel[] = [];
}
