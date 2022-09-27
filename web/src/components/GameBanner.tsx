interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner({ bannerUrl, title, adsCount }: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden max-w-[180px] xl:max-w-[200px] lg:max-w-full block mx-2"
    >
      <img src={bannerUrl} alt={title} className="w-full" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 right-0 left-0">
        <strong className="font-bold text-white block lg:text-sm">{title}</strong>
        <span className="text-zinc-300 text-sm block">{adsCount} anúncios</span>
      </div>
    </a>
  );
}
