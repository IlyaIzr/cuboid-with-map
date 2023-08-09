import { Mesh, Scene } from "@babylonjs/core";
import mapboxgl from "mapbox-gl";
import { createContext } from "react";

type AppContextType = {
  materialRef: null | Mesh;
  sceneRef: null | Scene;
  mapRef: null | mapboxgl.Map;
};
export const defaultValue: AppContextType = {
  materialRef: null,
  sceneRef: null,
  mapRef: null
};

export const AppContext = createContext(defaultValue);
