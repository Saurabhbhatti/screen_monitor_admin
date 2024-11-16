import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from './redux/rootReducer';
import { toggleAnimation, toggleLayout, toggleMenu, toggleNavbar, toggleRTL, toggleSemidark, toggleTheme } from './redux/themeConfigSlice';
import store from './redux/store';

function App({ children }: PropsWithChildren) {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem('layout') || themeConfig.layout)
    );
    dispatch(
      toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass)
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem('animation') || themeConfig.animation
      )
    );
    dispatch(
      toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar)
    );
    dispatch(
      toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark)
    );
  }, [
    dispatch,
    themeConfig.theme,
    themeConfig.menu,
    themeConfig.layout,
    themeConfig.rtlClass,
    themeConfig.animation,
    themeConfig.navbar,
    themeConfig.semidark,
  ]);

  return (
    <div
      className={`${(store.getState().themeConfig.sidebar && 'toggle-sidebar') || ''
        } ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass
        } main-section antialiased relative font-nunito text-sm font-normal`}
    >
      {children}
    </div>
  );
}

export default App;
