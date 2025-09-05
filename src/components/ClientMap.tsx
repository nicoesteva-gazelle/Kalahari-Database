"use client";
import { MapContainer, TileLayer, GeoJSON, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
import * as L from "leaflet";

// --- Polygons ---
const features: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    { type:"Feature", properties:{ name:"Okavango Delta" }, geometry:{ type:"Polygon", coordinates:[[[21.5,-19.0],[23.5,-19.0],[23.5,-20.5],[21.5,-20.5],[21.5,-19.0]]] } },
    { type:"Feature", properties:{ name:"Kalahari North"  }, geometry:{ type:"Polygon", coordinates:[[[20.0,-22.0],[23.0,-22.0],[23.0,-23.5],[20.0,-23.5],[20.0,-22.0]]] } },
    { type:"Feature", properties:{ name:"Kalahari South"  }, geometry:{ type:"Polygon", coordinates:[[[20.0,-24.5],[23.0,-24.5],[23.0,-26.0],[20.0,-26.0],[20.0,-24.5]]] } },
    { type:"Feature", properties:{ name:"Ghanzi"          }, geometry:{ type:"Polygon", coordinates:[[[21.0,-21.5],[22.5,-21.5],[22.5,-22.8],[21.0,-22.8],[21.0,-21.5]]] } },
    { type:"Feature", properties:{ name:"Kgalagadi"       }, geometry:{ type:"Polygon", coordinates:[[[20.0,-26.1],[23.0,-26.1],[23.0,-27.3],[20.0,-27.3],[20.0,-26.1]]] } },
  ],
};

// --- Emoji pins ---
type Pin = { name: string; pos: [number, number]; emoji?: string };
const pins: Pin[] = [
  { name: "Okavango Delta", pos: [22.5, -19.75], emoji: "🐘" },
  { name: "Kalahari North", pos: [21.5, -22.75], emoji: "🦁" },
  { name: "Kalahari South", pos: [21.5, -25.25], emoji: "🦁" },
  { name: "Ghanzi",         pos: [21.75, -22.15], emoji: "🐄" },
];

function emojiIcon(emoji: string): L.DivIcon {
  return L.divIcon({
    html: `<span class="emoji-pin">${emoji}</span>`,
    className: "emoji-pin-wrap",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

function isPath(layer: L.Layer): layer is L.Path {
  return typeof (layer as L.Path).setStyle === "function";
}

// --- EmojiMarker subcomponent (so we can call useMap) ---
function EmojiMarker({ pin }: { pin: Pin }) {
  const map = useMap();
  if (!pin.emoji) return null;
  return (
    <Marker
      position={[pin.pos[1], pin.pos[0]]}
      icon={emojiIcon(pin.emoji)}
      eventHandlers={{
        click: () => {
          const link = `/browse?region=${encodeURIComponent(pin.name)}`;
          const popupHtml = `<div style="min-width:160px">
            <div style="font-weight:600;margin-bottom:6px">${pin.name}</div>
            <a href="${link}" style="color:#047857;text-decoration:underline">Explore →</a>
          </div>`;
          L.popup().setLatLng([pin.pos[1], pin.pos[0]]).setContent(popupHtml).openOn(map);
        }
      }}
    >
      <Tooltip direction="top" offset={[0, -6]} permanent={false} opacity={0.9}>
        {pin.name}
      </Tooltip>
    </Marker>
  );
}

export default function ClientMap() {
  if (typeof window === "undefined") return null;

  const baseStyle: L.PathOptions = { color:"#047857", weight:2, fillColor:"#10b981", fillOpacity:0.25 };
  const hoverStyle: L.PathOptions = { color:"#065f46", weight:3, fillColor:"#34d399", fillOpacity:0.35 };

  return (
    <div style={{ position:"relative" }}>
      <MapContainer
        center={[-22.2, 22.2]}
        zoom={6}
        style={{ height: 520, width: "100%", borderRadius: "22px", overflow: "hidden", border:"1px solid var(--border)" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={features}
          style={() => baseStyle}
          onEachFeature={(feature: Feature<Geometry, GeoJsonProperties>, layer: L.Layer) => {
            const regName = (feature.properties && (feature.properties as Record<string, unknown>)["name"]) as string | undefined;
            if (!regName) return;
            layer.on("mouseover", () => { if (isPath(layer)) { layer.setStyle(hoverStyle); layer.bindTooltip(regName, { direction:"top", sticky:true } as L.TooltipOptions).openTooltip(); }});
            layer.on("mouseout", () => { if (isPath(layer)) { layer.setStyle(baseStyle); layer.closeTooltip(); }});
            layer.on("click", () => {
              if (isPath(layer)) {
                const html = `<div style="min-width:160px"><div style="font-weight:600;margin-bottom:6px">${regName}</div>
                <a href="/browse?region=${encodeURIComponent(regName)}" style="color:#047857;text-decoration:underline">Explore →</a></div>`;
                layer.bindPopup(html, {} as L.PopupOptions).openPopup();
              }
            });
          }}
        />
        {pins.map(pin => <EmojiMarker key={pin.name} pin={pin} />)}
      </MapContainer>

      {/* Legend */}
      <div style={{position:"absolute", right:12, top:12, background:"var(--card)",border:"1px solid var(--border)", borderRadius:12, padding:"8px 10px", boxShadow:"0 1px 0 rgba(0,0,0,.04)", fontSize:13}}>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><span className="emoji-pin">🐘</span><span>Okavango</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}><span className="emoji-pin">🦁</span><span>Kalahari (N & S)</span></div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}><span className="emoji-pin">🐄</span><span>Ghanzi</span></div>
      </div>

      <style>{`
        .emoji-pin-wrap { filter: drop-shadow(0 2px 2px rgba(0,0,0,.25)); }
        .emoji-pin { font-size: 24px; line-height: 1; }
      `}</style>
    </div>
  );
}