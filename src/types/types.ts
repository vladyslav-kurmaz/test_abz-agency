
export interface IInitialState {
  workers: WorkersType | null;
  count: number;
  disabled: boolean;
  loading: boolean;
  error: boolean;
  position: IPosition[] | [];
  success: boolean;
  error409: boolean
}

export interface IPosition {
  id: number;
  name: string
}

export interface IWorker{
  email: string;
  id?: string;
  name: string;
  phone: string;
  photo: string | File;
  position: string;
  positions_id: string;
  registration_timestamp?: number
}

export type WorkersType = IWorker[] | null;

export interface IToken {
  success: boolean;
  token: string
}