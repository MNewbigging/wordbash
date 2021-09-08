export enum LetterStatus {
  INACTIVE = 'inactive',
  NORMAL = 'normal',
  ACTIVE = 'active',
}

export interface Letter {
  id: string;
  letter: string;
  status: LetterStatus;
}
