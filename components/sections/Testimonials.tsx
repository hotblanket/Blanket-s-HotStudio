
import React from 'react';

const reviews = [
  {
    name: '김개발',
    project: 'RPG 타이쿤 온라인',
    content: '의뢰했던 인벤토리 시스템이 기대 이상이었습니다. 특히 최적화가 너무 잘 되어 있어서 동접자가 몰리는 상황에서도 렉이 전혀 없네요. 다음 대규모 업데이트 때도 꼭 다시 찾을 예정입니다.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    rating: 5
  },
  {
    name: 'Studio Nexus',
    project: '워리어 시뮬레이터',
    content: '로블록스 UI의 한계를 본 것 같습니다. 외부 프로그램으로 작업한 것 같은 매끄러운 애니메이션과 직관적인 구성 덕분에 유저들의 상점 이용률이 30%나 상승했습니다.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aria',
    rating: 5
  },
  {
    name: '루아마스터',
    project: '서바이벌 아일랜드',
    content: '복잡한 시스템 설계를 부탁드렸는데, 코드 구조가 너무 깔끔해서 감탄했습니다. 단순히 기능 구현만 하는 게 아니라 유지보수까지 고려해주시는 모습에서 프로페셔널함을 느꼈습니다.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
    rating: 5
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-dark">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-brand font-bold uppercase tracking-widest text-sm mb-4">Reviews</h2>
        <h3 className="text-4xl md:text-5xl font-black mb-16">함께한 파트너들의 이야기</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="p-10 glass rounded-[3rem] text-left relative group hover:border-brand/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(239,68,68,0.1)]">
              {/* Quote Icon */}
              <div className="absolute top-8 right-10 text-brand opacity-10 group-hover:opacity-30 transition-opacity">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 7.34315 11.3602 6 13.017 6H19.017C20.6739 6 22.017 7.34315 22.017 9V15C22.017 17.7614 19.7784 20 17.017 20H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.017C5.46472 8 5.017 8.44772 5.017 9V12C5.017 12.5523 4.56928 13 4.017 13H2.017C1.46472 13 1.017 12.5523 1.017 12V9C1.017 7.34315 2.36015 6 4.017 6H10.017C11.6739 6 13.017 7.34315 13.017 9V15C13.017 17.7614 10.7784 20 8.017 20H5.017V21Z" />
                </svg>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-2xl bg-brand/10 p-1 border border-white/10" />
                <div>
                  <h4 className="font-bold text-lg">{r.name}</h4>
                  <p className="text-brand-light text-xs font-medium">{r.project}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-6">
                {[...Array(r.rating)].map((_, idx) => (
                  <svg key={idx} className="w-4 h-4 text-brand" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-gray-400 leading-loose">
                "{r.content}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <p className="text-gray-500 text-sm">
            현재까지 <span className="text-white font-bold">50개 이상의 프로젝트</span>에서 파트너들의 만족을 이끌어냈습니다.
          </p>
        </div>
      </div>
    </section>
  );
};
