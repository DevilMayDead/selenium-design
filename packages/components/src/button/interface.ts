

const ButtonTypes = tuple(
  'default',
  'primary',
  'secondary',
  'tertiary',
  'link',
  'dashed',
  'text',
);
export type ButtonType = (typeof ButtonTypes)[number];

const ButtonStatusTypes = tuple('warning', 'danger', 'default');
export type ButtonStatus = (typeof ButtonStatusTypes)[number];

const ButtonShapes = tuple('circle', 'round', 'default');
export type ButtonShape = (typeof ButtonShapes)[number];

const ButtonHTMLTypes = ['submit', 'button', 'reset'] as const;
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

export interface BaseButtonProps {
  style?: React.CSSProperties;
  className?: string | string[];
  type?: ButtonType;
  status?: ButtonStatus;
  size: SizeType;
  shape: ButtonShape;
  href?: string;
  target?: string;
  anchorProps?: React.HTMLProps<HTMLAnchorElement>;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  block?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  prefixCls?: string;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  anchorProps?: React.HTMLProps<HTMLAnchorElement>;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>,
    'type' | 'onClick'
  >;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
