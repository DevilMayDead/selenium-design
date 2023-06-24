import './style/index.less';

type CompoundedComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLElement>
> & {
  /** @internal */
  __SELENIUM_BUTTON: boolean;
};

type Loading = number | boolean;

type LoadingConfigType = {
  loading: boolean;
  delay: number;
};

function getLoadingConfig(
  loading: BaseButtonProps['loading'],
): LoadingConfigType {
  if (typeof loading === 'object' && loading) {
    const delay = loading?.delay;
    const isDelay = !Number.isNaN(delay) && typeof delay === 'number';
    return {
      loading: false,
      delay: isDelay ? delay : 0,
    };
  }

  return {
    loading: !!loading,
    delay: 0,
  };
}

const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type = 'default',
    shape = 'default',
    size: customizeSize,
    className,
    status = 'default',
    children,
    block = false,
    htmlType = 'button',
    ...rest
  } = props;

  const { getPrefixCls, autoInsertSpaceInButton } =
    React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('btn', customizePrefixCls);

  const size = React.useContext(SizeContext);
  const sizeCls = customizeSize || size;

  const loadingOrDelay: LoadingConfigType = React.useMemo(
    () => getLoadingConfig(loading),
    [loading],
  );

  const [innerLoading, setLoading] = React.useState<Loading>(
    loadingOrDelay.loading,
  );
  const buttonRef =
    (ref as any) || React.createRef<HTMLAnchorElement | HTMLButtonElement>();

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>,
  ) => {
    const { onClick } = props;
    if (innerLoading) {
      e.preventDefault();
      return;
    }
    (
      onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    )?.(e);
  };

  console.log(
    {
      [`${prefixCls}-${type}`]: type,
    },
    type,
  );

  const classname = classNames(
    prefixCls,
    {
      [`${prefixCls}-${type}`]: type,
      // [`${prefixCls}-${shape}`]: shape && shape !== 'default',
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-block`]: block,
    },
    className,
  );

  return (
    <button
      className={classname}
      ref={buttonRef}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(InternalButton) as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

Button.__SELENIUM_BUTTON = true;

export type { ButtonProps };
export default Button;
