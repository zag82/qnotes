export interface Note {
  _id?: string;
  title: string;
  body: string;
  color: string;
  updated_at?: Date;
}

export interface Color {
  _id?: string;
  color: string;
  title: string;
}
