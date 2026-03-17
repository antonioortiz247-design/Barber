"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Booking() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    supabase.from("services").select("*").then(res => setServices(res.data || []));
  }, []);

  return (
    <div className="p-6">
      <h2>Servicios</h2>
      {services.map(s => <div key={s.id}>{s.name}</div>)}
    </div>
  );
}