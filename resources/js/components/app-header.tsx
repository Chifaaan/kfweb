import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData, type CartItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { History, Menu, Search, ShoppingCart, Pill } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import AppLogo from './app-logo';
import AppLogoIcon from './app-logo-icon';
import Fuse from "fuse.js";

const sections = [
    {
        title: "Pemesanan",
        items: [
            { title: "Medicines", href: "/pemesanan/medicines", icon: Pill },
            { title: "Orders History", href: "/pemesanan/history", icon: History },
        ],
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Cart',
        href: '/pemesanan/cart',
        icon: ShoppingCart,
    },
];

const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [animateBadge, setAnimateBadge] = useState(false);

    // === Search Update ===
    const [searchQuery, setSearchQuery] = useState('');
const [searchResults, setSearchResults] = useState<{ id: number; name: string }[]>([]);
const [showResults, setShowResults] = useState(false);
const searchRef = useRef<HTMLDivElement>(null);

const products = [
  { id: 1, name: "Paracetamol", category: "Obat" },
  { id: 2, name: "Amoxicillin", category: "Antibiotik" },
  { id: 3, name: "Ibuprofen", category: "Obat nyeri" },
  { id: 4, name: "Vitamin C", category: "Suplemen" },
  { id: 5, name: "Tissue Basah", category: "Kebersihan" },
];

useEffect(() => {
  if (searchQuery.trim().length > 0) {
    const fuse = new Fuse(products, {
      keys: ["name", "category"], // bisa cari berdasarkan nama & kategori
      threshold: 0.4,             // semakin kecil makin ketat, 0.4 cukup longgar
    });

    const results = fuse.search(searchQuery).map(res => res.item);

    setSearchResults(results);
    setShowResults(true);
  } else {
    setSearchResults([]);
    setShowResults(false);
  }
}, [searchQuery]);

    // Tutup dropdown kalau klik di luar
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Load cart items from localStorage
    useEffect(() => {
        const loadCartItems = () => {
            try {
                const storedCart = localStorage.getItem('cart');
                if (storedCart) {
                    setCartItems(JSON.parse(storedCart));
                }
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
                setCartItems([]);
            }
        };

        loadCartItems();

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'cart') {
                loadCartItems();
                setAnimateBadge(true);
                setTimeout(() => setAnimateBadge(false), 300);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    useEffect(() => {
        if (cartItems.length > 0 && cartItems.some(item => item.quantity > 0)) {
            setAnimateBadge(true);
            setTimeout(() => setAnimateBadge(false), 300);
        }
    }, [cartItems]);

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <AppLogoIcon className="h-6 w-6 fill-current text-black dark:text-white" />
                                </SheetHeader>

                                <div className="flex h-full flex-1 flex-col items-center justify-center space-y-6 p-4">
                                    {sections.map((section) => (
                                        <div key={section.title} className="flex flex-col items-center space-y-2">
                                            <span className="text-xs font-semibold uppercase text-neutral-500">{section.title}</span>
                                            {section.items.map((item) => (
                                                <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium">
                                                    {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Logo */}
                    <Link href="/dashboard" prefetch className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-center justify-center">
                            <NavigationMenuList className="flex h-full items-center justify-center space-x-2">
                                {sections.flatMap((section) =>
                                    section.items.map((item) => (
                                        <NavigationMenuItem key={item.href} className="relative flex h-full items-center">
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    page.url === item.href && activeItemStyles,
                                                    'h-9 cursor-pointer px-3',
                                                )}
                                            >
                                                {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                                                {item.title}
                                            </Link>
                                            {page.url === item.href && (
                                                <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                            )}
                                        </NavigationMenuItem>
                                    )),
                                )}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Right side */}
                    <div className="ml-auto flex items-center space-x-2">

                        {/* === Search Update === */}
                        <div className="relative w-48 md:w-72" ref={searchRef}>
                            <div className="flex items-center rounded-md border border-neutral-300 bg-white px-2 dark:bg-neutral-800 dark:border-neutral-700">
                                <Search className="mr-2 h-4 w-4 text-neutral-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari produk..."
                                    className="w-full bg-transparent py-1 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none dark:text-white"
                                />
                            </div>

                            {showResults && (
                                <div className="absolute top-11 left-0 w-full rounded-md border bg-white shadow-md dark:bg-neutral-900 dark:border-neutral-700 z-50">
                                    {searchResults.length > 0 ? (
                                        searchResults.map((product) => (
                                            <Link
                                                key={product.id}
                                                href={`/produk/${product.id}`}
                                                className="block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                            >
                                                {product.name}
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="px-4 py-2 text-sm text-neutral-500 dark:text-neutral-400">
                                            Produk tidak ditemukan
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart Button - visible on mobile */}
                        <div className="flex lg:hidden">
                            {rightNavItems.map((item) => (
                                <div key={item.title} className="relative">
                                    <Link
                                        href={item.href}
                                        className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        <span className="sr-only">{item.title}</span>
                                        {item.icon && <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />}
                                    </Link>
                                    {totalItems > 0 && (
                                        <span className={`absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-white transition-all duration-300 ${animateBadge ? 'scale-125' : 'scale-100'}`} />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Cart Button - visible on desktop */}
                        <div className="hidden lg:flex">
                            {rightNavItems.map((item) => (
                                <TooltipProvider key={item.title} delayDuration={0}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="relative">
                                                <Link
                                                    href={item.href}
                                                    className="group ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium text-accent-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                >
                                                    <span className="sr-only">{item.title}</span>
                                                    {item.icon && <Icon iconNode={item.icon} className="size-5 opacity-80 group-hover:opacity-100" />}
                                                </Link>
                                                {totalItems > 0 && (
                                                    <span className={`absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-xs text-white transition-all duration-300 ${animateBadge ? 'scale-125' : 'scale-100'}`} />
                                                )}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{item.title}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
