"use client";

import React, { Suspense } from "react";
import EditandoContent from "./EditandoContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <EditandoContent />
    </Suspense>
  );
}

