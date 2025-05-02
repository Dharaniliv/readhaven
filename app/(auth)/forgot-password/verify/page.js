
import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
