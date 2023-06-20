import { Button } from '@selenium-design/components';
import { act, render } from '@testing-library/react';

jest.mock('antd/lib/grid/hooks/useBreakpoint');

describe('Button', () => {
  it('button render', async () => {
    const fn = jest.fn();

    const wrapper = render(<Button onClick={fn}>123</Button>);
    await wrapper.findAllByText('123');

    act(() => {
      wrapper.baseElement.querySelector('button')?.click();
    });

    expect(fn).toBeCalled();
  });
});
