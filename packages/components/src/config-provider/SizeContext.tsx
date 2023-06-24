import { tuple } from '../_utils/tuple';

const SizeTypes = tuple('mini', 'small', 'middle', 'large');
export type SizeType = (typeof SizeTypes)[number] | undefined;

const SizeContext = React.createContext<SizeType>(undefined);

export interface SizeContextProps {
  size?: SizeType;
  children?: React.ReactNode;
}

export const SizeContextProvider: React.FC<SizeContextProps> = ({
  children,
  size,
}) => {
  const originSize = React.useContext<SizeType>(SizeContext);

  return (
    <SizeContext.Provider value={size || originSize}>
      {children}
    </SizeContext.Provider>
  );
};

export default SizeContext;
