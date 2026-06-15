"use client";

import {
  getStargateQuantScore,
  getStargateQuantTotal,
} from "../stargateQuantScores";
import { useEffect, useState } from "react";
import { stargateCompanies } from "../stargateCompanies";

const evaluationCompanies = stargateCompanies;

type ScoreSet = {
  growth: number;
  tech: number;
  fit: number;
};

const emptyScores: ScoreSet = {
  growth: 0,
  tech: 0,
  fit: 0,
};

export default function Home() {
  const [judgeName, setJudgeName] = useState("");
  const [evaluationDate, setEvaluationDate] = useState("");
  const [evaluationType, setEvaluationType] = useState("STARGATE 서류평가");
  const [signatureImage, setSignatureImage] = useState<string | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [savedScores, setSavedScores] = useState<Record<string, ScoreSet>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
const storageKey =
  judgeName.trim() !== ""
    ? `stargate-document-evaluation-${judgeName}`
    : null;

useEffect(() => {
if (!storageKey) {
setSavedScores({});
setComments({});
return;
}

const savedData = localStorage.getItem(storageKey);

if (savedData) {
const parsedData = JSON.parse(savedData);

setSavedScores(parsedData.savedScores || {});
setComments(parsedData.comments || {});

} else {
setSavedScores({});
setComments({});
}
}, [storageKey]);

useEffect(() => {
if (!storageKey) return;

localStorage.setItem(
storageKey,
JSON.stringify({
savedScores,
comments,
})
);
}, [storageKey, savedScores, comments]);

const currentCompany = evaluationCompanies[currentIndex];
const currentComment = comments[currentCompany?.id] || "";
const currentScores = savedScores[currentCompany?.id] || emptyScores;

const currentQuantScore = getStargateQuantScore(currentCompany?.id);
const currentQuantTotal = getStargateQuantTotal(currentCompany?.id);

const scoreTotal =
  currentScores.growth +
  currentScores.tech +
  currentScores.fit;

const finalTotal =
  scoreTotal + currentQuantTotal;

const valueStyle = {
  fontWeight: 700,
  padding: "12px",
  borderBottom: "1px solid #d1d5db",
};

const lastLabelStyle = {
  backgroundColor: "#fdf2f2",
  color: "#111827",
  fontWeight: 700,
  padding: "12px",
  borderRight: "1px solid #d1d5db",
};

const lastValueStyle = {
  fontWeight: 700,
  padding: "12px",
};

  const handleScoreChange = (key: keyof ScoreSet, value: string, max: number) => {
    const numberValue = Math.max(0, Math.min(Number(value) || 0, max));

    setSavedScores({
      ...savedScores,
      [currentCompany.id]: {
        ...currentScores,
        [key]: numberValue,
      },
    });
  };

  if (!isStarted) {
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
                <option>STARGATE 서류평가</option>
                <option>STARGATE 발표평가</option>
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
              <label className="block mb-2 font-semibold">평가위원 서명</label>
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
                className="w-full border rounded-lg p-3"
              />

              {signatureImage && (
  <div className="mt-3 border rounded-lg p-3 bg-gray-50">
    <p className="text-sm text-gray-500 mb-2">등록된 서명</p>

    <img
      src={signatureImage}
      alt="서명"
      className="h-14 object-contain mb-3"
    />

    <button
      type="button"
      onClick={() => setSignatureImage(null)}
      className="px-3 py-2 bg-red-900 text-white rounded-lg text-sm font-semibold hover:bg-red-800"
    >
      서명 삭제
    </button>
  </div>
)}
            </div>
          </div>

          <button
            onClick={() => {
              if (evaluationType !== "STARGATE 서류평가") {
  alert("현재는 STARGATE 서류평가 화면입니다.");
  return;
}

              setIsStarted(true);
            }}
            className="w-full bg-red-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-800"
          >
            평가 시작
          </button>
        </div>
      </main>
    );
  }

  if (!currentCompany) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>평가 대상 기업이 없습니다.</p>
      </main>
    );
  }

  return (
      <>
    <div className="screen-only">
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
        <img
          src="/korea-campustown.png"
          alt="고려대 캠퍼스타운"
          className="absolute top-6 right-6 w-[130px] opacity-100 pointer-events-none"
        />

        <div className="mb-8 pr-40">
          <h1 className="text-3xl font-bold text-red-900 mb-2">
            고려대 캠퍼스타운 STARGATE 서류평가표
          </h1>
          <p className="text-gray-500">
            
          </p>
        </div>

        <section className="border rounded-xl overflow-hidden mb-8">
          <div className="bg-red-900 text-white px-5 py-3 font-bold">
            평가대상
          </div>

          <div className="grid grid-cols-[120px_1fr] text-sm">
            <div className="bg-red-50 text-red-900 font-bold p-3 border-r border-b">
              연번
            </div>
            <div className="p-3 border-b font-bold">{currentIndex + 1}</div>

            <div className="bg-red-50 text-red-900 font-bold p-3 border-r border-b">
              입주기업명
            </div>
            <div className="p-3 border-b font-bold">{currentCompany.name}</div>

            <div className="bg-red-50 text-red-900 font-bold p-3 border-r border-b">
              대표자명
            </div>
            <div className="p-3 border-b font-bold">{currentCompany.ceo}</div>

            <div className="bg-red-50 text-red-900 font-bold p-3 border-r border-b">
              평가트랙
            </div>
            <div className="p-3 border-b font-bold">  
  {currentCompany.track} 트랙
</div>

            <div className="bg-red-50 text-red-900 font-bold p-3 border-r ">
              아이템소개
            </div>
            <div className="p-3 leading-relaxed font-bold text-gray-900">{currentCompany.itemIntro}</div>
          </div>
        </section>

<section className="border rounded-xl overflow-hidden mb-8">
  <div className="bg-gray-900 text-white px-5 py-3 font-bold">
    정량평가
  </div>

  <table className="w-full border-collapse text-sm">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-3 text-left w-[220px]">평가항목</th>
        <th className="border p-3 text-left">세부 평가내용</th>
        <th className="border p-3 w-[90px]">배점</th>
        <th className="border p-3 w-[120px]">평가점수</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="border p-3 font-bold">활동보고서 제출</td>
        <td className="border p-3">활동보고서 제출 여부</td>
        <td className="border p-3 text-center font-bold">3점</td>
        <td className="border p-3 text-center font-bold">{currentQuantScore.report}점</td>
      </tr>

      <tr>
        <td className="border p-3 font-bold">공간 활용도</td>
        <td className="border p-3">입주공간 활용 및 공간관리</td>
        <td className="border p-3 text-center font-bold">3점</td>
        <td className="border p-3 text-center font-bold">{currentQuantScore.space}점</td>
      </tr>

      <tr>
        <td className="border p-3 font-bold">프로그램 참여도</td>
        <td className="border p-3">캠퍼스타운 프로그램 참여 및 협조도</td>
        <td className="border p-3 text-center font-bold">4점</td>
        <td className="border p-3 text-center font-bold">{currentQuantScore.program}점</td>
      </tr>

      <tr className="bg-red-50">
        <td colSpan={2} className="border p-3 text-right font-bold">
          정량평가 합계
        </td>
        <td className="border p-3 text-center font-bold">10점</td>
        <td className="border p-3 text-center text-2xl font-bold text-red-900">
          {currentQuantTotal}점
        </td>
      </tr>
    </tbody>
  </table>
</section>

        <section className="border rounded-xl overflow-hidden mb-8">
          <div className="bg-gray-900 text-white px-5 py-3 font-bold">
            평가항목
          </div>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left w-[220px]">평가항목</th>
                <th className="border p-3 text-left">세부 평가내용</th>
                <th className="border p-3 w-[90px]">배점</th>
                <th className="border p-3 w-[120px]">평가점수</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="border p-3 font-bold">기업역량 및 성장성</td>
                <td className="border p-3 font-bold">사업성, 성장 가능성, 실행력</td>
                <td className="border p-3 text-center font-bold">10점</td>
                <td className="border p-3">
                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={currentScores.growth}
                    onChange={(e) =>
                      handleScoreChange("growth", e.target.value, 15)
                    }
                    className="w-full border rounded-lg p-2 text-center font-bold"
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-3 font-bold">기술·서비스 경쟁력</td>
                <td className="border p-3 font-bold">
                  제품·서비스 완성도, 시장 경쟁력
                </td>
                <td className="border p-3 text-center font-bold">10점</td>
                <td className="border p-3">
                  <input
                    type="number"
                    min="0"
                    max="15"
                    value={currentScores.tech}
                    onChange={(e) =>
                      handleScoreChange("tech", e.target.value, 15)
                    }
                    className="w-full border rounded-lg p-2 text-center font-bold"
                  />
                </td>
              </tr>

              <tr>
                <td className="border p-3 font-bold">
                  참가계획의 적정성 및 트랙 적합성
                </td>
                <td className="border p-3 font-bold">
                  CES: 전시 및 글로벌 적합성 / ILS: 일본 시장 적합성
                </td>
                <td className="border p-3 text-center font-bold">10점</td>
                <td className="border p-3">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={currentScores.fit}
                    onChange={(e) =>
                      handleScoreChange("fit", e.target.value, 20)
                    }
                    className="w-full border rounded-lg p-2 text-center font-bold"
                  />
                </td>
              </tr>



              <tr className="bg-red-50">
                <td colSpan={2} className="border p-3 text-right font-bold">
                  총점
                </td>
                <td className="border p-3 text-center font-bold">30점</td>
                <td className="border p-3 text-center text-2xl font-bold text-red-900">
                  {scoreTotal}점
                </td>
              </tr>
            </tbody>
          </table>
        </section>

       <section className="border rounded-xl overflow-hidden mb-8">
  <div className="bg-gray-900 text-white px-5 py-3 font-bold">
    평가의견
  </div>

  <textarea
    value={currentComment}
    onChange={(e) =>
      setComments({
        ...comments,
        [currentCompany.id]: e.target.value,
      })
    }
    className="w-full min-h-[120px] p-4 font-bold outline-none"
    placeholder="평가의견을 입력하세요."
  />
</section> 

        <section className="flex justify-between items-end border-t pt-6">
          <div className="text-sm text-gray-600">
            <p>평가일자: {evaluationDate || "미입력"}</p>
          </div>

          <div className="flex items-end gap-0 text-lg font-semibold">
            <p>
              평 가 위 원 : {" "}
              <span className="font-bold tracking-[0.2em] ml-2">
                {judgeName || "미입력"}
              </span>
            </p>

            <div className="relative w-24 h-10 flex items-end justify-center">
              <span className="text-sm text-gray-600 translate-y-[4px]">
                (인)
              </span>

              {signatureImage && (
                <img
                  src={signatureImage}
                  alt="서명"
                  className="absolute top-[6px] left-0 w-full h-full object-contain z-10 opacity-90"
                />
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-between items-center mt-8">
  <button
    onClick={() => window.location.href = "/"}
    className="bg-gray-500 text-white px-5 py-3 rounded-lg font-bold"
  >
    메인으로
  </button>

  <div className="flex items-center gap-3">
    <button
  onClick={() => window.print()}
  className="bg-white border-2 border-red-900 text-red-900 px-5 py-3 rounded-lg font-bold"
>
  PDF출력
</button>
    <select
      value={currentIndex}
      onChange={(e) => setCurrentIndex(Number(e.target.value))}
      className="border rounded-lg px-4 py-3 font-bold"
    >
      {evaluationCompanies.map((company, index) => (
        <option key={company.id} value={index}>
          {index + 1}. {company.name} / {company.track} 트랙
        </option>
      ))}
    </select>

    <button
      onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
      className="bg-gray-800 text-white px-5 py-3 rounded-lg font-bold"
    >
      이전 평가
    </button>

    <button
      onClick={() =>
        setCurrentIndex((prev) =>
          Math.min(evaluationCompanies.length - 1, prev + 1)
        )
      }
      className="bg-red-900 text-white px-5 py-3 rounded-lg font-bold"
    >
      다음 평가
    </button>
  </div>
</div>
      </div>
    </main>
    </div>

<div className="print-only">
  {evaluationCompanies.map((company, index) => {
    const companyScores = savedScores[company.id] || emptyScores;
    const companyComment = comments[company.id] || "";
    const companyQuantScore = getStargateQuantScore(company.id);
const companyQuantTotal = getStargateQuantTotal(company.id);

const companyTotal =
  companyScores.growth +
  companyScores.tech +
  companyScores.fit;

const companyFinalTotal =
  companyTotal + companyQuantTotal;

return (
      <div
        key={company.id}
        className="bg-white p-2 text-black"
        style={{
          pageBreakAfter:
            index === evaluationCompanies.length - 1 ? "auto" : "always",
        }}
      >
        <div className="relative w-[180mm] mx-auto bg-white p-2">
          <img
            src="/korea-campustown.png"
            alt="고려대 캠퍼스타운"
            className="absolute top-0 right-0 w-[110px]"
          />

          <h1 className="text-3xl font-bold text-red-900 mb-5 mt-6 text-center">
            고려대 캠퍼스타운 STARGATE 서류평가표
          </h1>

<div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
  <div className="bg-red-900 text-white px-5 py-3 font-bold">
    평가대상
  </div>

  <table className="w-full border-collapse text-sm">
    <tbody>
      <tr className="bg-gray-100 text-center">
        <th className="border border-gray-300 p-3 w-[15%]">연번</th>
        <th className="border border-gray-300 p-3 w-[35%]">입주기업명</th>
        <th className="border border-gray-300 p-3 w-[25%]">대표자명</th>
        <th className="border border-gray-300 p-3 w-[25%]">평가트랙</th>
      </tr>

      <tr className="text-center font-bold">
        <td className="border border-gray-300 p-3">{index + 1}</td>
        <td className="border border-gray-300 p-3">{company.name}</td>
        <td className="border border-gray-300 p-3">{company.ceo}</td>
        <td className="border border-gray-300 p-3">
          {company.track} 트랙
        </td>
      </tr>

      <tr>
        <th className="border border-gray-300 p-3 bg-gray-100 text-center">
          아이템소개
        </th>
        <td colSpan={3} className="border border-gray-300 p-3 font-bold">
          {company.itemIntro}
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
  <div className="bg-gray-900 text-white px-5 py-3 font-bold">
    정량평가
  </div>

  <table className="w-full border-collapse text-sm">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-3 text-left w-[230px]">
          평가항목
        </th>

        <th className="border border-gray-300 p-3 text-left">
          세부 평가내용
        </th>

        <th className="border border-gray-300 p-3 w-[90px]">
          배점
        </th>

        <th className="border border-gray-300 p-3 w-[100px]">
          평가점수
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="border border-gray-300 p-3 font-bold">
          활동보고서 제출
        </td>

        <td className="border border-gray-300 p-3">
          활동보고서 제출 여부
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          3점
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          {companyQuantScore.report}점
        </td>
      </tr>

      <tr>
        <td className="border border-gray-300 p-3 font-bold">
          공간 활용도
        </td>

        <td className="border border-gray-300 p-3">
          입주공간 활용 및 공간관리
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          3점
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          {companyQuantScore.space}점
        </td>
      </tr>

      <tr>
        <td className="border border-gray-300 p-3 font-bold">
          프로그램 참여도
        </td>

        <td className="border border-gray-300 p-3">
          캠퍼스타운 프로그램 참여 및 협조도
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          4점
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          {companyQuantScore.program}점
        </td>
      </tr>

      <tr className="bg-red-50">
        <td
          colSpan={2}
          className="border border-gray-300 p-3 text-right font-bold"
        >
          정량평가 합계
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          10점
        </td>

        <td className="border border-gray-300 p-3 text-center text-2xl font-bold text-red-900">
          {companyQuantTotal}점
        </td>
      </tr>
    </tbody>
  </table>
</div>

<div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
  <div className="bg-gray-900 text-white px-5 py-3 font-bold">
    평가항목
  </div>

  <table className="w-full border-collapse text-sm">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 p-3 text-left w-[230px]">
          평가항목
        </th>

        <th className="border border-gray-300 p-3 text-left">
          세부 평가내용
        </th>

        <th className="border border-gray-300 p-3 w-[90px]">
          배점
        </th>

        <th className="border border-gray-300 p-3 w-[100px]">
          평가점수
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td className="border border-gray-300 p-3 font-bold">
          기업역량 및 성장성
        </td>

        <td className="border border-gray-300 p-3">
          사업성, 성장 가능성, 실행력
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          10점
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          {companyScores.growth}
        </td>
      </tr>

      <tr>
        <td className="border border-gray-300 p-3 font-bold">
          기술·서비스 경쟁력
        </td>

        <td className="border border-gray-300 p-3">
          제품·서비스 완성도, 시장 경쟁력
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          10점
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          {companyScores.tech}
        </td>
      </tr>

      <tr>
        <td className="border border-gray-300 p-3 font-bold">
          참가계획의 적정성 및 트랙 적합성
        </td>

        <td className="border border-gray-300 p-3">
          CES·ILS 참가목적의 적절성 및 계획의 구체성
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          10점
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          {companyScores.fit}
        </td>
      </tr>

      <tr className="bg-red-50">
        <td
          colSpan={2}
          className="border border-gray-300 p-3 text-right font-bold"
        >
          서류평가 합계
        </td>

        <td className="border border-gray-300 p-3 text-center font-bold">
          30점
        </td>

        <td className="border border-gray-300 p-3 text-center text-2xl font-bold text-red-900">
          {companyTotal}점
        </td>
      </tr>

      <tr className="bg-red-100">
  <td
    colSpan={2}
    className="border border-gray-300 p-3 text-right font-bold"
  >
    정량평가+서류평가 
  </td>

  <td className="border border-gray-300 p-3 text-center font-bold">
    40점
  </td>

  <td className="border border-gray-300 p-2 text-center text-2xl font-bold text-red-900">
  {companyFinalTotal}점
</td>
</tr>

    </tbody>
  </table>
</div>

          <div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-900 text-white px-5 py-3 font-bold">
              평가의견
            </div>

            <div className="p-4 min-h-[80px] font-bold whitespace-pre-wrap">
              {companyComment || " "}
            </div>
          </div>

          <div className="mt-6 text-center text-sm font-semibold">
            {evaluationDate
              ? evaluationDate.replaceAll("-", " . ")
              : "평가일자 미입력"}
          </div>

          <div className="mt-6 flex justify-end items-end text-lg font-bold">
            <span className="mr-4">평가위원 :</span>

            <span className="font-bold tracking-[0.2em] ml-4">
              {judgeName || "미입력"}
            </span>

            <div className="relative w-28 h-12 flex items-end justify-center">
              <span className="text-base font-bold text-gray-700">(인)</span>

              {signatureImage && (
                <img
                  src={signatureImage}
                  alt="서명"
                  className="absolute top-[2px] left-0 w-full h-full object-contain z-10 opacity-80"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  })}
</div>
  </>
);
}  