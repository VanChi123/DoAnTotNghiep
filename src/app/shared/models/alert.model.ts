export type AlertButtonColor = 'default' | 'primary' | 'accent' | 'warn';

export interface AlertButton {
  name: string;
  color: AlertButtonColor;
  value?: any;
  index?: number;
  icon?: string;
}

export interface AlertCommon {
  title: string | null;
  message: string | null;
  buttons?: AlertButton[];
  value?: any;
  icon?: any;
}
