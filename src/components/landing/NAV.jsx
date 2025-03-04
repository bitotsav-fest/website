"use client"

import * as React from "react"
import { Home, Calendar, Ticket, Info, Music,Images } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"

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
  {
    name: "Gallery",
    url: "/gallery",
    href: "/gallery",
    icon: Images,
  }
]

export function Nav() {
  return <Navbar items={items} />
}
