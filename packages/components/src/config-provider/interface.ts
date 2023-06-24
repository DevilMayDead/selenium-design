import type * as React from 'react';
import type { SizeType } from './SizeContext';

export interface ConfigProviderProps {
  /**
   * @zh 当按钮的子元素是两个中文汉字时，自动在两个中文汉字间插入一个空格
   * @en When the child element of the button is two Chinese characters, automatically insert a space between the two Chinese characters.
   * @defaultValue true
   */
  autoInsertSpaceInButton?: boolean;
  /**
   * @zh 全局组件类名前缀
   * @en Global ClassName prefix
   * @defaultValue selenium
   */
  prefixCls?: string;
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
  /**
   * @zh 全局弹出框挂载的父级节点。
   * @en The parent node of the global popup.
   * @defaultValue () => document.body
   */
  getPopupContainer?: (node: HTMLElement) => Element;
  children?: React.ReactNode;
  componentSize?: SizeType;
}
