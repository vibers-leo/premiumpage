
import Link from 'next/link';
import Image from 'next/image';
import { HeroSection } from "@gentop/components/hero-section";
import { getTranslation } from "@gentop/lib/translations";
import { BackgroundBeams } from '@gentop/components/ui/background-beams';
import { GlobalCatalogNavigator } from '@gentop/components/global-catalog-navigator';
import { getPrevNextPages } from '@gentop/lib/catalog-pages';

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }];
}


export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getTranslation(lang);
  const navigation = getPrevNextPages('home', undefined, lang);

  return (
    <div className="h-screen bg-background relative transition-colors duration-300 overflow-hidden flex flex-col">
      <BackgroundBeams className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-none opacity-50 dark:opacity-100" />

      {/* Hero Section Container */}
      <div className="flex-1 overflow-hidden relative z-10">
        <HeroSection lang={lang} nextPage={navigation.next} />
      </div>

      {/* Global Catalog Navigator (Fixed) */}
      <GlobalCatalogNavigator
        prevPage={navigation.prev}
        nextPage={navigation.next}
        currentPage={navigation.current}
        totalPages={navigation.total}
      />
    </div>
  );
}
