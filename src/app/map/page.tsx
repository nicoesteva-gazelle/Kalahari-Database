"use client";
import dynamic from "next/dynamic";

const ClientMap = dynamic(() => import("@/components/ClientMap"), { ssr: false });

export default function MapPage() {
  return (
    <div className="space-y-4">
      <p className="opacity-80">Click a region to see related records.</p>
      <ClientMap />
    </div>
  );
}