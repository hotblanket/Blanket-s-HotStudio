
import React from 'react';

const services = [
  {
    title: '시스템 프로그래밍',
    desc: '데이터 저장, 인벤토리, 상점 등 로블록스의 핵심 메커니즘을 최적화된 코드로 개발합니다.',
    icon: '💻'
  },
  {
    title: 'UI/UX 디자인 & 제작',
    desc: '모든 플랫폼에 대응하는 감각적이고 편리한 사용자 인터페이스를 직접 디자인하고 구현합니다.',
    icon: '✨'
  },
  {
    title: '특수 효과 (VFX)',
    desc: '파티클과 트윈 애니메이션을 활용하여 플레이어의 몰입감을 극대화하는 연출을 제공합니다.',
    icon: '🔥'
  },
  {
    title: '보안 & 최적화',
    desc: 'RemoteEvent 보안과 메모리 최적화를 통해 쾌적하고 안전한 게임 환경을 보장합니다.',
    icon: '🛡️'
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-brand font-bold uppercase tracking-widest text-sm mb-4">What I Do</h2>
          <h3 className="text-4xl md:text-5xl font-black">전문 서비스 영역</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <div key={idx} className="p-8 glass rounded-3xl group hover:border-brand/50 transition-all">
              <div className="text-4xl mb-6">{s.icon}</div>
              <h4 className="text-xl font-bold mb-4 group-hover:text-brand transition-colors">{s.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
