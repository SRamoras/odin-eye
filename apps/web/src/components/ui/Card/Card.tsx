import SpotlightCard from "../../reactbits/SpotlightCard";
import styles from "./Card.module.css";

interface CardProps {
  spotlight?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Card({ spotlight = false, className, children }: CardProps) {
  const classes = className ? `${styles.card} ${className}` : styles.card;

  if (spotlight) {
    return (
      <SpotlightCard className={classes} spotlightColor="rgba(255, 255, 255, 0.08)">
        {children}
      </SpotlightCard>
    );
  }

  return <div className={classes}>{children}</div>;
}
