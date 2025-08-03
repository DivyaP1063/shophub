import React, { useState } from 'react';
import { Package, User, BarChart3, DollarSign, ShoppingBag, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  userRole: 'seller' | 'buyer';
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const sellerItems = [
    { title: "Products", url: "/seller/products", icon: Package },
    { title: "Sales", url: "/seller/sales", icon: DollarSign },
    { title: "Analytics", url: "/seller/analytics", icon: BarChart3 },
    { title: "Profile", url: "/seller/profile", icon: User },
  ];

  const buyerItems = [
    { title: "Orders", url: "/buyer/orders", icon: ShoppingBag },
    { title: "Profile", url: "/buyer/profile", icon: User },
  ];

  const items = userRole === 'seller' ? sellerItems : buyerItems;

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4  text-gray-800 bg-white p-2 z-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-40  bg-white border-r shadow-md transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar>
          <SidebarHeader className="p-6 border-b">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  {userRole === 'seller' ? 'S' : 'B'}
                </span>
              </div>
              <h2 className="text-lg font-semibold capitalize">
                {userRole} Dashboard
              </h2>
            </div>
          </SidebarHeader>
          <button
        className="fixed top-[22.5px] right-2  text-gray-800  p-2 "
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.url}
                        className="w-full"
                        onClick={() => setIsOpen(false)} // Optional: auto-close on click
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon className="w-4 h-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </div>
    </>
  );
}
