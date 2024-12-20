export interface NavBarProps {
  navigationItems: NavigationItem[];
  className: string;
}

export interface NavigationItem {
  label: string;
  icon: React.ReactElement;
  path: string;
  disabled: boolean;
}
