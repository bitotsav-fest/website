"use client"

import * as React from "react"
import { Home, Calendar, Ticket, Info, Music } from "lucide-react"
import { AnimeNavBar } from "@/components/ui/anime-navbar"

const items = [
  {
    name: "Home",
    url: "/",
    href: "/",
    icon: Home,
  },
  {
    name: "Events",
    url: "/events",
    href: "/events",
    icon: Calendar,
  },
  {
    name: "Tickets",
    url: "/tickets",
    href: "/tickets",
    icon: Ticket,
  },
  {
    name: "Concerts",
    url: "/concerts",
    href: "/concerts",
    icon: Music,
  },
  {
    name: "About",
    url: "/about",
    href: "/about",
    icon: Info,
  },
]

export function Nav() {
  return <AnimeNavBar items={items} defaultActive="Home" />
}
