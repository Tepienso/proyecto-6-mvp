"use client";

import { useEffect, useState } from "react";
import { fetchProfile } from "@/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile()
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <p role="alert" className="text-danger font-bold">
        Error: {error}
      </p>
    );
  }

  if (!profile) {
    return <div className="text-muted">Cargando perfil...</div>;
  }

  const date = new Date(profile.timestamp).toLocaleString("es-AR");

  return (
    <div className="p-6">
      <h1 className="text-3xl text-primary font-bold underline text-center mb-6">
        Perfil
      </h1>

      <div className="center">
        <div className="border rounded-lg p-6 max-w-md bg-light">
          <p>
            <span className="font-bold">Usuario:</span> {profile.user}
          </p>
          <p>
            <span className="font-bold">Estado:</span>{" "}
            <span
              className={profile.status === "ok" ? "text-success" : "text-danger"}
            >
              {profile.status}
            </span>
          </p>
          <p>
            <span className="font-bold">Última actualización:</span> {date}
          </p>
        </div>
      </div>
    </div>
  );
}
