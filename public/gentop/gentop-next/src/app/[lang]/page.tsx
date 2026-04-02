
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from "@/components/hero-section";
import { getTranslation } from "@/lib/translations";
import { BackgroundBeams } from '@/components/ui/background-beams';
import { GlobalCatalogNavigator } from '@/components/global-catalog-navigator';
import { getPrevNextPages } from '@/lib/catalog-pages';

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}


export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getTranslation(lang);

  return (
    <div className="h-screen bg-background relative transition-colors duration-300 overflow-hidden flex flex-col">
      {/* Hero Section Container */}
      <div className="flex-1 overflow-hidden relative z-10">
        <HeroSection lang={lang} />
      </div>

      {/* Global Catalog Navigator (Fixed) */}
      {(() => {
        const navigation = getPrevNextPages('home', undefined, lang);
        return (
          <GlobalCatalogNavigator
            prevPage={navigation.prev}
            nextPage={navigation.next}
            currentPage={navigation.current}
            totalPages={navigation.total}
          />
        );
      })()}
    </div>
  );
}
