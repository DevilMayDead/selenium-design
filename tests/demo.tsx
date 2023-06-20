import {
  act,
  cleanup,
  render as reactRender,
  waitFor,
} from '@testing-library/react';
import glob from 'glob';
import React from 'react';

type Options = {
  skip?: boolean;
};

function demoTest(component: string, options: Options = {}) {
  const LINE_STR_COUNT = 20;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const originOffsetHeight = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'offsetHeight',
  )?.get;
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get() {
      let html = this.innerHTML;
      html = html.replace(/<[^>]*>/g, '');
      const lines = Math.ceil(html.length / LINE_STR_COUNT);
      return lines * 16;
    },
  });

  const originGetComputedStyle = window.getComputedStyle;
  window.getComputedStyle = (ele) => {
    const style = originGetComputedStyle(ele);
    style.lineHeight = '16px';
    return style;
  };

  beforeAll(() => {});

  afterEach(() => {
    logSpy.mockReset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
    logSpy.mockReset();
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      get: originOffsetHeight,
    });
    window.getComputedStyle = originGetComputedStyle;
  });

  const files = glob.sync(`./packages/**/${component}/**/demos/**/[!_]*.tsx`);
  console.log(files);

  files.push(...glob.sync(`./${component}/**/**/[!_]*.tsx`));

  const App = (props: { children: any; onInit: () => void }) => {
    React.useEffect(() => {
      props.onInit();
    }, []);

    return (
      <>
        <div>test</div>
        {props.children}
      </>
    );
  };

  describe(`${component} demo`, () => {
    files.forEach((file) => {
      let testMethod = options.skip === true ? test.skip : test;
      if (
        Array.isArray(options.skip) &&
        options.skip.some((opt) => file.includes(opt))
      ) {
        testMethod = test.skip;
      }
      testMethod(`📸 renders ${file} correctly`, async () => {
        jest.useFakeTimers().setSystemTime(Date.now());

        const fn = jest.fn();
        const Demo = require(`.${file}`).default;

        const wrapper = reactRender(
          <App onInit={fn}>
            <Demo />
          </App>,
        );

        act(() => {
          jest.runAllTimers();
        });

        await waitFor(
          () => {
            return wrapper.findAllByText('test');
          },
          { timeout: 3000 },
        );

        act(() => {
          jest.runAllTimers();
        });

        await waitFor(
          () => {
            return wrapper.findAllByText('test');
          },
          { timeout: 3000 },
        );

        await waitFor(() => {
          expect(fn).toBeCalled();
        });
        await waitFor(() => {
          expect(wrapper.asFragment()).toMatchSnapshot();
        });

        wrapper.unmount();
        jest.useRealTimers();
        cleanup();
      });
    });
  });
}

export default demoTest;
