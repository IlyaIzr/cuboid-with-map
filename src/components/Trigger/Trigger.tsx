import { useContext } from "react";
import { Color3, StandardMaterial, Texture } from "@babylonjs/core";
import { AppContext } from "../../store/app";
import s from "./Trigger.module.css";

export function Trigger() {
  const ctx = useContext(AppContext);

  const resetToGreen = (e: any) => {
    if (ctx.materialRef && ctx.sceneRef) {
      const material = new StandardMaterial("boxMaterial", ctx.sceneRef);
      material.diffuseColor = new Color3(0.5, 0.8, 0.2); // Set the color of the material

      ctx.materialRef.material = material;
    }
  };

  const onClick = async (e: any) => {
    // Apply map material
    if (ctx.materialRef && ctx.sceneRef && ctx.mapRef) {
      // Create a dynamic texture from the canvas
      const canvas = ctx.mapRef.getCanvas();
      console.log(canvas);

      // TODO TEMP DEBUG CODE
      const canvasImageUrl = ctx.mapRef.getCanvas().toDataURL("image/png");

      // Create a standard material and apply the dynamic texture as the diffuse texture
      const material = new StandardMaterial("material", ctx.sceneRef);

      // Create a texture from the image URL
      const texture = new Texture(canvasImageUrl, ctx.sceneRef);
      // Apply the texture to the material
      material.diffuseTexture = texture;

      ctx.materialRef.material = material;
    }
  };

  return (
    <div className={s.triggers}>
      <button onClick={resetToGreen}>Green box</button>
      <button onClick={onClick}>Apply map material</button>
    </div>
  );
}
