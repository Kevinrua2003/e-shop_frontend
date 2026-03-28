'use client'

import Container from "@/UI/container/components/Container";
import CategoryNavItem from "./CategoryNavItem";
import { MdAllInbox, MdDesktopWindows, MdLaptop, MdMiscellaneousServices, MdPhone, MdTv, MdWatch } from "react-icons/md";
import { useProductsFilter } from "@/hooks/products/useProductsFilter";

const CategoryNav = () => {
  const {category, handleSetCategory} = useProductsFilter();

  const categories = [
    { id: 'All', icon: MdAllInbox, label: 'All' },
    { id: 'Phone', icon: MdPhone, label: 'Phones' },
    { id: 'TV', icon: MdTv, label: 'TVs' },
    { id: 'Watch', icon: MdWatch, label: 'Watches' },
    { id: 'Laptops', icon: MdLaptop, label: 'Laptops' },
    { id: 'Desktop', icon: MdDesktopWindows, label: 'Desktops' },
    { id: 'Accesories', icon: MdMiscellaneousServices, label: 'Accessories' },
  ];

  return (
    <nav className="
        w-full
        border-b border-[hsl(var(--border-subtle))]
    ">
        <Container>
            <div className="
                flex flex-row 
                justify-start md:justify-center 
                items-center 
                gap-2 md:gap-4 
                overflow-x-auto 
                py-3
                scrollbar-hide
            ">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => handleSetCategory(cat.id)}
                        className="
                            flex-shrink-0
                            px-3 py-1.5
                            rounded-[var(--radius-md)]
                            text-sm
                            font-medium
                            transition-all duration-200
                            whitespace-nowrap
                            ${category === cat.id
                                ? 'bg-[hsl(var(--accent))] text-white'
                                : 'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--surface-hover))]'
                            }
                        "
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </Container>
    </nav>
  );
};

export default CategoryNav;
