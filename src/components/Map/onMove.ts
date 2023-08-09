import { setDataToUrl } from "../../store/urs";
import type { Map } from "mapbox-gl";

export function mapOnMove(map: Map) {
  function mapMoveEndHandler() {
    const { lng, lat } = map.getCenter();
    const zoom = map.getZoom();
    const coords = {
      lat: +lat.toFixed(5),
      lng: +lng.toFixed(5),
      zoom: +zoom.toFixed(1)
    };
    setDataToUrl(coords);
  }
  map.on("moveend", mapMoveEndHandler);

  return () => {
    map.off("moveend", mapMoveEndHandler);
  };
}
