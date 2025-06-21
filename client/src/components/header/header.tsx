import { JSX, useState, useRef, useEffect } from 'react';
import { Logo } from '../logo/logo';
import { Link } from 'react-router-dom';
import LogoutButton from '../logout-button/logout-button';
import styles from './header.module.css';

function Header(): JSX.Element {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <nav className={styles['menu-list']}>
          <ul>
            <li><Link to="/">Обзор</Link></li>
            <li><Link to="/bills">Счета</Link></li>
            <li><Link to="/transaction">Транзакции</Link></li>
            <li><Link to="/analiticks">Аналитика</Link></li>
          </ul>
        </nav>
        <div className={styles['header-right']}>
          <div
            className={styles['header-account']}
            ref={dropdownRef}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setDropdownOpen((prev) => !prev);
              }}
            >
              <img src="image/User-Icon-Grey.png" alt="Аккаунт" />
            </a>
            {dropdownOpen && (
              <div className={styles.dropdown}>
                <LogoutButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;