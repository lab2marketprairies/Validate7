import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import content from '@/content/hero.json';

export const Hero = () => {
    return (
        <section className="bg-white py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-onyx mb-4 tracking-tight">
                    {content.title}
                </h1>
                <p className="text-xl text-primary font-medium mb-8">
                    {content.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                    <Link href="/bootcamp">
                        <Button size="lg">
                            {content.buttons.bootcamp}
                        </Button>
                    </Link>
                    <Link href="/core-program">
                        <Button size="lg">
                            {content.buttons.core}
                        </Button>
                    </Link>
                    <Link href="/support-materials">
                        <Button size="lg">
                            {content.buttons.resources}
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
