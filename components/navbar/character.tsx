"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@nextui-org/button";
import { useMediaQuery } from "@react-hook/media-query";
import clsx from "clsx";
import { ClassNameProp } from "@/types";

interface CharacterTileProps extends ClassNameProp {
  iconCharacters: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const CharacterTile = (props: CharacterTileProps) => {
  const { iconCharacters, label, isSelected, onPress, className } = props;
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const Icon = () => {
    return (
      <div className="flex justify-center items-center">
        <span
          className={clsx(
            "text-primary-foreground dark:text-primary text-lg lg:text-xl font-semibold lg:w-12 lg:bg-primary/10 lgpx-1.5 lg:py-.5 lg:rounded-lg"
          )}
        >
          {iconCharacters}
        </span>
      </div>
    );
  };

  return (
    <>
      <Button
        isIconOnly={isTablet ? true : false}
        onPress={onPress}
        color="primary"
        size="lg"
        variant={isSelected ? "bordered" : "light"}
        startContent={isTablet ? null : <Icon />}
        className={clsx(
          "flex items-center lg:pr-4 lg:pl-1.5 gap-2.5 text-primary-foreground dark:text-primary lg:w-full",
          className
        )}
      >
        {isTablet ? (
          <Icon />
        ) : (
          <span className="text-lg font-medium tracking-widest w-28 text-start">
            {label}
          </span>
        )}
      </Button>
    </>
  );
};

export default CharacterTile;
