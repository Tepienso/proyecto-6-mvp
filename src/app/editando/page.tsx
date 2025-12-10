import React, { Suspense } from "react";
import EditandoPageClient from "./EditandoPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <EditandoPageClient />
    </Suspense>
  );
}
