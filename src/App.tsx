import { AppContext, defaultValue } from "./store/app";
import { Cube3d } from "./components/Cube/Cube3d";
import { Trigger } from "./components/Trigger/Trigger";
import { MapboxMap } from "./components/Map/MapboxMap";
import "mapbox-gl/dist/mapbox-gl.css";
import s from "./App.module.css";
import "./styles.css";

export default function App() {
  return (
    <AppContext.Provider value={defaultValue}>
      <div className={`App ${s.mainWrap}`}>
        <h1>Cuboid with map</h1>
        <div className={s.contentWrap}>
          <Cube3d controls={<Trigger />} />
          <MapboxMap />
        </div>
      </div>
    </AppContext.Provider>
  );
}
