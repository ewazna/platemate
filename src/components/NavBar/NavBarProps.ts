export interface NavBarProps {
  navigationItems: NavigationItem[];
  className: string;
}

export interface NavigationItem {
  icon: React.ReactElement;
  path: string;
  disabled: boolean;
}
