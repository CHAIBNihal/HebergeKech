"use client"
import style from "./menuLink.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation"
interface MenuItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

interface MenuLinkProps {
  item: MenuItem;
}
const MenuLink = ({item}:MenuLinkProps) => {

  const pathname = usePathname()

  
  return (
    <Link href={item.path} className={`${style.container} ${pathname === item.path && style.active}`}>
        {item.icon}
        {item.title}
    </Link>
  )
}

export default MenuLink