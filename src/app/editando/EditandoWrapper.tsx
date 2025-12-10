"use client";

import React, { Suspense } from "react";
import EditandoContent from "./EditandoContent";

export default function EditandoWrapper() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <EditandoContent />
    </Suspense>
  );
}
