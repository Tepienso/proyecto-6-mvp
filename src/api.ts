// src/api.ts

export async function fetchProfile() {
  try {
    // Ruta relativa: funciona en local y en producción
    const res = await fetch("/api/profile");

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return res.json();
  } catch (err: any) {
    throw new Error(err.message || "Error desconocido al obtener perfil");
  }
}
