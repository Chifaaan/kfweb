import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, LayoutGrid, ShoppingCart, History } from 'lucide-react';
import AppLogo from './app-logo';

const sections = [
    {
        title: "Menus",
        items: [
            { title: "Dashboard", href: "/dashboard", icon: LayoutGrid }
        ],
    },
    {
        title: "Pemesanan",
        items: [
            { title: "Medicines", href: "/pemesanan/medicines", icon: ShoppingCart },
            { title: "Orders History", href: "/pemesanan/history", icon: History },
        ],
    },
    {
        title: "Penerimaan",
        items: [
            { title: "Penerimaan Form", href: "/penerimaan", icon: BookOpen },
            { title: "Penerimaan History", href: "/penerimaan/history", icon: History },
        ],
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain sections={sections} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
