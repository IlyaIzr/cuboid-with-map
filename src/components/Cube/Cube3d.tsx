import { useContext, useRef } from "react";
import {
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Scene,
  ArcRotateCamera,
  Color4
} from "@babylonjs/core";
import SceneComponent from "babylonjs-hook";
import { AppContext } from "../../store/app";
import s from "./Cube3d.module.css";

const bgColor = [211 / 255, 257 / 255, 253 / 255, 1];

export const Cube3d = ({ controls }: { controls?: JSX.Element }) => {
  const box = useRef<Mesh | null>(null);
  const ctx = useContext(AppContext);

  const onSceneReady = (scene: Scene) => {
    const camera = new ArcRotateCamera(
      "arcRotateCamera",
      Math.PI / 2,
      Math.PI / 4,
      5,
      new Vector3(0, 1, 0),
      scene
    );

    const canvas = scene.getEngine().getRenderingCanvas();

    // This targets the camera to scene origin
    camera.setTarget(Vector3.Zero());

    // Adjust the mouse wheel sensitivity for zooming
    camera.wheelPrecision = 50;

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // Set the background color to white
    scene.clearColor = new Color4(
      bgColor[0],
      bgColor[1],
      bgColor[2],
      bgColor[3]
    );

    // This creates a light, aiming 0.5,1,0 - to the sky (non-mesh)
    const light = new HemisphericLight("light", new Vector3(0.5, 1, 0), scene);
    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.9;

    box.current = MeshBuilder.CreateBox(
      "cuboid",
      { width: 2, height: 2, depth: 2 },
      scene
    );
    // Move the box upward
    box.current.position.y = 0.5;

    // store refs in the context to use elsewhere
    ctx.materialRef = box.current;
    ctx.sceneRef = scene;
  };

  const onRender = (scene: Scene) => {
    if (box?.current) {
      // Rotate box
      box.current.rotation.y += scene.getEngine().getDeltaTime() * 0.0004;
    }
  };

  return (
    <div className={s.cubeWrap}>
      <SceneComponent
        antialias
        onSceneReady={onSceneReady}
        onRender={onRender}
        id="my-canvas"
        className={s.sceneCanvas}
      />

      {controls ? <div className={s.controls}>{controls}</div> : null}
    </div>
  );
};
