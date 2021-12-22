import { useParams } from "react-router-dom";

export function TruckDetail() {
  let param = useParams();
  console.log("param::::", param);
  return <div>__________Detail_________</div>;
}
