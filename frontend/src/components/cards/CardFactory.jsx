import CoverageCard from "./CoverageCard";
import TowerCard from "./TowerCard";
import IncidentCard from "./IncidentCard";

export default function CardFactory({ item }) {
  switch (item.type) {
    case "coverage":
      return <CoverageCard data={item} />;
    case "tower":
      return <TowerCard data={item} />;
    case "incident":
      return <IncidentCard data={item} />;
    default:
      return null;
  }
}
