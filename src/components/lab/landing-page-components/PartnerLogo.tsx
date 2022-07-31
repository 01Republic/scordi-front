import { FC } from "react";
import { ChildrenProp } from "../../util/children-prop.type";
import styles from "../../../styles/Home.module.css";

export const PartnerLogo: FC<{
  name: string,
  active?: boolean
} & ChildrenProp> = ({ name, active = false }) => (
  <div className={`${styles.partnerLogoText} ${active ? styles.partnerLogoTextActive : ''}`}>
    {name}
  </div>
)
