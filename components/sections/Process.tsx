
import React from 'react';

const steps = [
  { step: '01', title: '상담 및 요구사항 분석', desc: '아이디어를 구체화하고 작업 범위를 확정합니다.' },
  { step: '02', title: '기획 및 설계', desc: 'UI 프로토타입과 시스템 구조를 설계합니다.' },
  { step: '03', title: '본 개발', desc: '최신 표준에 맞춰 정밀한 개발을 진행합니다.' },
  { step: '04', title: '테스트 및 피드백', desc: '버그 수정 및 유저 피드백 기반 보완 작업을 거칩니다.' },
  { step: '05', title: '최종 납품 및 사후관리', desc: '프로젝트 적용 및 필요 시 유지보수를 지원합니다.' }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-dark">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <h2 className="text-brand font-bold uppercase tracking-widest text-sm mb-4">Workflow</h2>
            <h3 className="text-4xl font-black mb-6">성공을 위한<br />철저한 개발 프로세스</h3>
            <p className="text-gray-400 leading-relaxed mb-8">체계적인 단계를 거쳐 의뢰인의 상상을 현실로 만들어드립니다.</p>
            <div className="p-6 bg-brand/10 border border-brand/20 rounded-2xl">
              <p className="text-brand-light text-sm font-bold">"최상의 퀄리티는 소통에서 시작됩니다."</p>
            </div>
          </div>
          
          <div className="md:w-2/3 grid gap-4">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-6 p-6 glass rounded-2xl items-center group">
                <span className="text-3xl font-black text-white/10 group-hover:text-brand/30 transition-colors">{s.step}</span>
                <div>
                  <h4 className="font-bold mb-1">{s.title}</h4>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
