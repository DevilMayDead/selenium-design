

const ConfigProvider: React.FC<ConfigProviderProps> & {
  ConfigContext: typeof ConfigContext;
  SizeContext: typeof SizeContext;
} = (props) => {
  const { prefixCls, children, componentSize } = props;

  function getPrefixCls(suffixCls?: string, customizePrefixCls?: string) {
    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `selenium-${suffixCls}` : 'selenium';
  }

  const config: ConfigProviderProps = {
    ...omit(props, ['children']),
    getPrefixCls: getPrefixCls,
  };

  let child = children;

  if (componentSize) {
    child = (
      <SizeContextProvider size={componentSize}>{child}</SizeContextProvider>
    );
  }

  return (
    <ConfigContext.Provider value={config}>{child}</ConfigContext.Provider>
  );
};

ConfigProvider.SizeContext = SizeContext;
ConfigProvider.ConfigContext = ConfigContext;

if (process.env.NODE_ENV !== 'production') {
  ConfigProvider.displayName = 'ConfigProvider';
}

export default ConfigProvider;
