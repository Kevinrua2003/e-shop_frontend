'use client'

import Container from "@/UI/container/components/Container";
import CategoryNavItem from "./CategoryNavItem";
import { MdAllInbox, MdDesktopWindows, MdLaptop, MdMiscellaneousServices, MdPhone, MdTv, MdWatch } from "react-icons/md";
import { useEffect } from "react";
import { useProductsFilter } from "@/hooks/products/useProductsFilter";

const CategoryNav = () => {
  const {category, handleSetCategory} = useProductsFilter();

  useEffect(()=>{
    console.log(category);


    
  }, [category])


  return (
    <div className="w-full shadow-sm top-20 pt-4">
            <Container>
              <div className="flex flex-row justify-between items-center md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
                <div onClick={() => handleSetCategory("All")}>
                    <CategoryNavItem icon={MdAllInbox} label={"All"} key={'All'} selected={category === 'All'}/>
                </div>
                <div onClick={() => handleSetCategory("Phone")}>
                    <CategoryNavItem icon={MdPhone} label={"Phone"} key={'Phone'} selected={category === 'Phone'} />
                </div>
                <div onClick={() => handleSetCategory("TV")}>
                    <CategoryNavItem icon={MdTv} label={"TV"} key={'TV'} selected={category === 'TV'}/>
                </div>
                <div onClick={() => handleSetCategory("Watch")}>
                    <CategoryNavItem icon={MdWatch} label={"Watch"} key={'Watch'} selected={category === 'Watch'} />
                </div>
                <div onClick={() => handleSetCategory("Laptops")}>
                    <CategoryNavItem icon={MdLaptop} label={"Laptops"} key={'Laptops'} selected={category === 'Laptops'} />
                </div>
                <div onClick={() => handleSetCategory("Desktop")}>
                    <CategoryNavItem icon={MdDesktopWindows} label={"Desktop"} key={'Desktop'} selected={category === 'Desktop'} />
                </div>
                <div onClick={() => handleSetCategory("Accesories")}>
                    <CategoryNavItem icon={MdMiscellaneousServices} label={"Accesories"} key={'Accesories'} selected={category === 'Accesories'} />
                </div>
              </div>
            </Container>
        </div>
  );
};

export default CategoryNav;
