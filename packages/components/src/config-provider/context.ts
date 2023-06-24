const defaultGetPrefixCls = (
  suffixCls?: string,
  customizePrefixCls?: string,
) => {
  if (customizePrefixCls) return customizePrefixCls;

  return suffixCls ? `selenium-${suffixCls}` : 'selenium';
};

export const ConfigContext = React.createContext<ConfigProviderProps>({
  getPrefixCls: defaultGetPrefixCls,
});

export const { Consumer: ConfigConsumer } = ConfigContext;
