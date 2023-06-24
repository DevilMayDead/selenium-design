export type MergePropsOptions = {
  _ignorePropsFromGlobal?: boolean;
};

export default function useMergeProps<PropsType>(
  componentProps: PropsType & MergePropsOptions,
  defaultProps: Partial<PropsType>,
  globalComponentConfig: Partial<PropsType>,
) {
  const { _ignorePropsFromGlobal } = componentProps;
  const _defaultProps = React.useMemo(() => {
    return {
      ...defaultProps,
      ...(_ignorePropsFromGlobal ? {} : globalComponentConfig),
    };
  }, [defaultProps, globalComponentConfig, _ignorePropsFromGlobal]);

  return React.useMemo(() => {
    // Must remove property of MergePropsOptions before passing it to component
    const mProps = omit(componentProps, [
      '_ignorePropsFromGlobal',
    ]) as PropsType;

    for (const propName in _defaultProps) {
      if (mProps[propName] === undefined) {
        mProps[propName] = _defaultProps[propName]!;
      }
    }

    return mProps;
  }, [componentProps, _defaultProps]);
}
