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
  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");

  const Icon = () => {
    return (
      <div className="flex items-center justify-center">
        <span
          className={clsx(
            "lgpx-1.5 lg:py-.5 text-2xl font-semibold text-primary-foreground dark:text-primary sm:text-xl lg:w-12 lg:rounded-lg lg:bg-secondary/10 dark:lg:bg-primary/10",
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
          "flex h-14 w-14 items-center gap-2.5 text-primary-foreground dark:text-primary lg:h-12 lg:w-full lg:pl-1.5 lg:pr-4",
          { "bg-secondary/20 dark:bg-secondary/10": isSelected },
          className,
        )}
      >
        {isTablet ? (
          <Icon />
        ) : (
          <span className="w-28 text-start text-lg font-medium tracking-widest">
            {label}
          </span>
        )}
      </Button>
    </>
  );
};

export default CharacterTile;
