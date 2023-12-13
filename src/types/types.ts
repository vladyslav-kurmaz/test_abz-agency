
export type TInitialState = {
  workers: TWorkers | null;
  maxCount: number;
  count: number;
  disabled: boolean;
  loading: boolean;
  error: boolean;
  position: TPosition[] | [];
  success: boolean;
  error409: boolean
}

export type TPosition = {
  id: number;
  name: string
}

export type TWorker = {
  email: string;
  id?: string;
  name: string;
  phone: string;
  photo: string | File;
  position: string;
  positions_id: string;
  registration_timestamp?: number
}

export type TWorkers = TWorker[] | null;

export type TToken = {
  success: boolean;
  token: string
}

export type TValidatinForm = {
  errorStatus: boolean
  message: string
  class: string
}

export type TStatusInfo = {
  name: boolean;
  email: boolean;
  phone: boolean;
  position: boolean;
  positions_id: boolean;
  photo: boolean;
}