"use client";

import { useEffect, useRef } from "react";
import {
  AmbientLight,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { createBordeauxB } from "@/lib/bordeaux-b";
import { readHeroProgress } from "@/lib/scroll";

const FOV = 28;
const CAMERA_Z = 6;

function viewHalf() {
  return Math.tan(MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
}

export default function LogoMark() {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = mount.current;
    if (!parent) return;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    const canvas = renderer.domElement;
    canvas.style.pointerEvents = "none";
    parent.appendChild(canvas);

    const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
    camera.position.z = CAMERA_Z;

    const scene = new Scene();
    scene.add(new AmbientLight(0xffffff, 0.72));
    const key = new DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    scene.add(key);
    const fill = new DirectionalLight(0xffffff, 0.6);
    fill.position.set(-4, -1, 3);
    scene.add(fill);

    const geo = new ExtrudeGeometry(createBordeauxB(), {
      depth: 18,
      bevelEnabled: true,
      bevelThickness: 0.35,
      bevelSize: 0.2,
      bevelOffset: 0,
      bevelSegments: 2,
      curveSegments: 12,
    });
    geo.computeBoundingBox();
    const box = geo.boundingBox!;
    const cx = (box.min.x + box.max.x) / 2;
    const cz = (box.min.z + box.max.z) / 2;
    const height = box.max.y - box.min.y;
    const fit = (viewHalf() * 2 * 0.98) / height;
    geo.translate(-cx, -box.min.y, -cz);
    geo.scale(fit, fit, fit);

    const material = new MeshStandardMaterial({
      color: "#5a2f37",
      roughness: 0.42,
      metalness: 0.16,
      side: DoubleSide,
    });
    const group = new Group();
    group.add(new Mesh(geo, material));
    scene.add(group);

    let frame = 0;
    const draw = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (w > 0 && h > 0 && canvas.width !== Math.floor(w * pixelRatio)) {
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      const progress = readHeroProgress();
      group.position.y = -viewHalf();
      group.rotation.y = progress * Math.PI * 2;
      group.scale.setScalar(1 - 0.58 * progress);
      renderer.render(scene, camera);
      parent.parentElement?.classList.add("is-ready");
      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      geo.dispose();
      material.dispose();
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return <div ref={mount} style={{ width: "100%", height: "100%" }} />;
}
