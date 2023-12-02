"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    //1. define empty query
    let currentQuery = {};

    //2. check if there is params, and parse it to object
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    //3. spread the current query and add a category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    //4.check if the category is already selected
    if (params?.get("category") === label) {
      //remove it if clicking on it
      delete updatedQuery.category;
    }

    //5.generate url with the lastest query
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      //skip the empty query
      { skipNull: true }
    );

    //6.pass the url in router
    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
  `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
