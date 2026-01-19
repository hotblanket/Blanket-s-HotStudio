
import React from 'react';

export const About: React.FC = () => {
  const stacks = ['Luau', 'Python', 'Blender', 'UI', 'HTML'];

  return (
    <section id="about" className="py-24 bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="glass p-12 md:p-16 rounded-[3rem] flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden shrink-0 border-4 border-white/5">
            <img src="https://picsum.photos/seed/profile/400/400" alt="Blanket" className="w-full h-full object-cover" />
          </div>

          <div>
            <h2 className="text-brand font-bold uppercase tracking-widest text-sm mb-4">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-black mb-6">안녕하세요, 개발자 Blanket입니다.</h3>
            <div className="text-gray-400 leading-loose space-y-4 mb-8">
              <p>
                저는 약 9년간 로블록스를 즐기며 정말 많은 게임을 경험해왔습니다. 하지만 비슷한 콘셉트의 게임이 반복되다 보니 점점 흥미가 줄어, 한때는 로블록스를 그만둘까 고민하기도 했습니다. 
              </p>
              <p>
                그러던 중 우연히 Roblox Studio를 접하면서 모델링과 스크립트를 배우기 시작했고, 자연스럽게 로블록스를 넘어 다양한 외부 프로그램까지 다루게 되었습니다. 
              </p>
              <p>
                그래도 아직은 많이 부족하다고 느껴 더 많은 경험과 성장을 위해 이 홈페이지를 만들었습니다. 함께 배우고 성장해 주실 개발자분들의 소중한 문의를 기다리겠습니다. 감사합니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {stacks.map(s => (
                <span key={s} className="px-4 py-1.5 bg-brand/10 text-brand-light text-xs font-bold rounded-full border border-brand/20">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
