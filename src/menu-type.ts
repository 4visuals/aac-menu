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
export type MenuLevel = {
  value: number;
  policy: "disable" | "hide";
};
export class MenuModel {
  /**
   * [root][branch]
   */
  id?: string;
  /**
   * 이용 가능한 userLevel.
   * 값이 32이면 교사(32), 유료이용자(64)만 이용 가능. 일반 사용자(1)는 이용 불가
   */
  level?: MenuLevel = { value: 32, policy: "hide" };
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

  constructor(dto: MenuModel) {
    Object.assign(this, dto);
    if (this.children) {
      this.children = this.children.map((child) => new MenuModel(child));
    }
  }

  static build(menus: MenuModel[]) {
    return menus.map((dto) => new MenuModel(dto));
  }
}
export type UserRole =
  | "BOARD"
  | "WORD"
  | "SENTENCE"
  | "READING"
  | "PUB"
  | "USERCONFIG"
  | "ADMIN";
export class User {
  seq: number;
  guest: boolean;
  joinDate: string;
  password: string;
  phoneNumber: string;
  region: string;
  roles: UserRole[];
  school: string;
  /**
   * 학생이면 true
   */
  student: boolean;
  /**
   * 선생님이면 true
   */
  teacher: boolean;
  teacherSeq: number;
  userEmail: string;
  userId: string;
  userLevel: number;
  userName: string;

  constructor(dto: User) {
    Object.assign(this, dto);
  }

  static wrap(dto: User) {
    return new User(dto);
  }
}
