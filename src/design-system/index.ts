// src/design-system/index.ts
"use client";

// 1. Re-export all core Kumo components & utilities
export * from "@cloudflare/kumo";

// 2. Re-export Phosphor icons under Icon namespace or individually, resolving collisions:
// Both @cloudflare/kumo and @phosphor-icons/react export components named:
// Link, Table, Tabs, Radio, Code, CodeBlock, Empty, Sidebar, ClipboardText.
// We export Kumo's UI components primarily, and re-export the Phosphor icon set cleanly:
export * as Icons from "@phosphor-icons/react";
export {
  // Frequently used icons with non-colliding names or direct convenience imports
  CheckCircle as CheckCircleIcon,
  XCircle as XCircleIcon,
  User as UserIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  CaretRight as CaretRightIcon,
  CaretDown as CaretDownIcon,
  ArrowRight as ArrowRightIcon,
  ArrowLeft as ArrowLeftIcon,
  MagnifyingGlass as SearchIcon,
  Plus as PlusIcon,
  Trash as TrashIcon,
  Gear as GearIcon,
  SignOut as SignOutIcon,
  Bell as BellIcon,
  QrCode as QrCodeIcon,
  House as HomeIcon,
  GraduationCap as GraduationCapIcon,
  Heart as HeartIcon,
  Drop as DropIcon,
  Clock as ClockIcon,
  Phone as PhoneIcon,
  Envelope as EnvelopeIcon,
  MapPin as MapPinIcon,
  Sparkle as SparkleIcon,
  ChartBar as ChartBarIcon,
} from "@phosphor-icons/react";
