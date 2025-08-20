// src/components/Header/Header.tsx
import React, { useEffect, useState } from 'react';
import '../styles/header.css';

export type HeaderProps = {
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  // Optional controlled input:
  searchValue?: string;
  onSearchChange?: (value: string) => void;

  /** Right-side actions */
  notifications?: number;
  onNotificationsClick?: () => void;
  onSettingsClick?: () => void;
  onAvatarClick?: () => void;
  avatarUrl?: string;          // optional: show image if provided
  avatarInitials?: string;     // fallback initials if no image
  className?: string;
};

const Header: React.FC<HeaderProps> = ({
  searchPlaceholder = 'Search patients, appointments...',
  onSearch,
  searchValue,
  onSearchChange,
  notifications = 0,
  onNotificationsClick,
  onSettingsClick,
  onAvatarClick,
  avatarUrl,
  avatarInitials = 'DR',
  className,
}) => {
  const [localQuery, setLocalQuery] = useState(searchValue ?? '');

  useEffect(() => {
    if (searchValue !== undefined) setLocalQuery(searchValue);
  }, [searchValue]);

  const setQuery = (v: string) => {
    onSearchChange?.(v);
    if (searchValue === undefined) setLocalQuery(v);
  };

  const triggerSearch = () => {
    const q = (searchValue ?? localQuery).trim();
    if (q || onSearch) onSearch?.(q);
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerSearch();
    }
  };

  return (
    <header className={['header', className].filter(Boolean).join(' ')}>
      {/* Left: Search */}
      <div className="header-left">
        <div className="search-box">
          <i
            className="fas fa-search"
            aria-hidden="true"
            onClick={triggerSearch}
            role="img"
          />
          <input
            id="searchInput"
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue ?? localQuery}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Search"
          />
        </div>
      </div>

      {/* Right: Notifications, Settings, Avatar */}
      <div className="header-right">
        {/* Notifications */}
        <button
          type="button"
          className="header-btn"
          aria-label={
            notifications > 0
              ? `${notifications} unread notifications`
              : 'Notifications'
          }
          onClick={onNotificationsClick}
          title="Notifications"
        >
          <i className="fas fa-bell" aria-hidden="true" />
          {notifications > 0 && (
            <span className="notification-badge">{notifications}</span>
          )}
        </button>

        {/* Settings */}
        <button
          type="button"
          className="header-btn"
          aria-label="Settings"
          onClick={onSettingsClick}
          title="Settings"
        >
          <i className="fas fa-cog" aria-hidden="true" />
        </button>

        {/* Avatar */}
        <button
          type="button"
          className="avatar-btn"
          aria-label="Profile"
          onClick={onAvatarClick}
          title="Profile"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="Profile" />
          ) : (
            <span className="avatar-initials">{avatarInitials}</span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
