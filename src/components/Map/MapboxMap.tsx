import { useCallback, useContext, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { AppContext } from "../../store/app";
import { DEFAULT_CENTER, DEFAULT_ZOOM } from "./const";
import { mapOnMove } from "./onMove";
import type { Map } from "mapbox-gl";
import s from "./MapboxMap.module.css";
import { getDataFromUrl } from "../../store/urs";

mapboxgl.accessToken =
  process.env.REACT_APP_MAPBOX_TOKEN || "your own mapbox token";

const mapStyles = [
  { id: "satellite-streets-v12", name: "Satelite" },
  { id: "light-v11", name: "Light" },
  { id: "dark-v11", name: "Dark" },
  { id: "streets-v12", name: "Streets" },
  { id: "outdoors-v12", name: "Outdoors" }
];

export function MapboxMap() {
  const ctx = useContext(AppContext);
  const setMapRef = useCallback((mapRef: Map) => (ctx.mapRef = mapRef), []);

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map | null>(null);

  // Init map
  useEffect(() => {
    if (map.current) return;

    const { lng, lat, zoom } = getDataFromUrl();
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng || DEFAULT_CENTER.lng, lat || DEFAULT_CENTER.lat],
      zoom: zoom || DEFAULT_ZOOM,
      preserveDrawingBuffer: true
    });
    setMapRef(map.current);
    // for debug purposes
    // @ts-ignore
    window.mapInstance = map.current;

    mapOnMove(map.current);
  }, [setMapRef]);

  const onStyleClick = (id: string) => () =>
    map.current?.setStyle("mapbox://styles/mapbox/" + id);

  return (
    <div className={s.mapWrap}>
      <div ref={mapContainer} className={s.mapContainer} />
      <div className={s.styleControl}>
        {mapStyles.map(({ id, name }) => (
          <button key={id} onClick={onStyleClick(id)}>
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
