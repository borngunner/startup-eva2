"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-red-900 mb-3">
          고려대학교 캠퍼스타운 평가시스템
        </h1>

        <p className="text-gray-500 mb-8">
          평가 프로그램을 선택한 뒤, 세부 평가 유형을 선택해주세요.
        </p>

        <div className="grid gap-4 mb-8">
          <button
            onClick={() => setSelectedMenu("stargate")}
            className="w-full border-2 border-red-900 text-red-900 py-5 rounded-xl font-bold text-xl hover:bg-red-50"
          >
            STARGATE 평가
          </button>

          <button
            onClick={() => alert("입주연장평가는 아직 개최되지 않았습니다.")}
            className="w-full border border-gray-300 text-gray-700 py-5 rounded-xl font-bold text-xl hover:bg-gray-50"
          >
            입주연장평가
          </button>
        </div>

        {selectedMenu === "stargate" && (
          <div className="border rounded-2xl p-6 bg-gray-50">
            <h2 className="text-2xl font-bold text-red-900 mb-4">
              STARGATE 평가
            </h2>

            <div className="grid gap-4">
              <button
  onClick={() => router.push("/stargate-document")}
  className="w-full bg-[#0B1736] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#162654]"
>
  STARGATE 서류평가
</button>

              <button
                onClick={() => router.push("/stargate-presentation")}
                className="w-full bg-red-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800"
              >
                STARGATE 발표평가
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}