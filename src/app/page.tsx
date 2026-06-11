"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [judgeName, setJudgeName] = useState("");
  const [evaluationDate, setEvaluationDate] = useState("");
  const [evaluationType, setEvaluationType] = useState("2026 STARGATE 서류평가");
  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  const handleStart = () => {
  if (evaluationType === "2026 STARGATE 발표평가") {
    router.push("/stargate-presentation");
    return;
  }

  alert(`${evaluationType} 이번 평가 대상이 아닙니다.`);
};

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-red-900 mb-3 whitespace-nowrap">
          고려대학교 캠퍼스타운 평가시스템
        </h1>

        <p className="text-gray-500 mb-8">
          평가위원 정보와 평가 유형을 선택한 뒤 평가를 시작하세요.
        </p>

        <div className="space-y-5 mb-8">
          <div>
            <label className="block mb-2 font-semibold">평가 유형</label>
            <select
              value={evaluationType}
              onChange={(e) => setEvaluationType(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option>2026 STARGATE 서류평가</option>
              <option>2026 STARGATE 발표평가</option>
              <option>2026 입주연장평가</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">평가위원명</label>
            <input
              value={judgeName}
              onChange={(e) => setJudgeName(e.target.value)}
              className="w-full border rounded-lg p-3"
              placeholder="평가위원명을 입력하세요"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">평가일자</label>
            <input
              type="date"
              value={evaluationDate}
              onChange={(e) => setEvaluationDate(e.target.value)}
              className="w-full border rounded-lg p-3"
            />
          </div>
          <div>
  <label className="block mb-2 font-semibold">
    평가위원 서명
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onloadend = () => {
        setSignatureImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }}
    className="w-full border rounded-lg p-2"
  />

  {signatureImage && (
    <div className="mt-3 border rounded-lg p-3 bg-gray-50">
      <p className="text-sm text-gray-500 mb-2">
        등록된 서명
      </p>

      <img
        src={signatureImage}
        alt="서명"
        className="h-16 object-contain"
      />
    </div>
  )}
</div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-red-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800"
        >
          평가 시작
        </button>
      </div>
    </main>
  );
}