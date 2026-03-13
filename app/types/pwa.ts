export interface PwaTabItem {
  key: string
  label: string
  icon: string
  activeIcon?: string
  to?: string
  badge?: number | string
  badgeDot?: boolean
  disabled?: boolean
}
