"use client";
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
  const isMobile = useMediaQuery("(max-width: 625px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const Icon = () => {
    return (
      <div className="flex justify-center items-center">
        <span
          className={clsx(
            "text-primary-foreground dark:text-primary text-2xl sm:text-lg lg:text-xl font-semibold lg:w-12 lg:bg-secondary/10 dark:lg:bg-primary/10 lgpx-1.5 lg:py-.5 lg:rounded-lg"
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
        color="secondary"
        variant={isSelected ? "bordered" : "light"}
        startContent={isTablet ? null : <Icon />}
        radius="lg"
        className={clsx(
          "flex items-center lg:pr-4 lg:pl-1.5 gap-2.5 text-primary-foreground dark:text-primary lg:w-full h-14 w-14 lg:h-12",
          { "bg-secondary/20 dark:bg-secondary/10": isSelected },
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
