import { TemplateRenderer } from "./templates";
import { useResume } from "@/Providers/resume-provider";
import { TEMPLATE_IDS } from "@/shared/lib/resume-types";
import { Button } from "@/shared/ui/button";
import { Printer, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { A4ScaleWrapper } from "./A4ScaleWrapper";

export function ResumePreview() {
  const { active, updateActive } = useResume();
  const swiperRef = useRef<SwiperType | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const currentIndex = Math.max(0, (TEMPLATE_IDS as readonly string[]).indexOf(active.selectedTemplateId || "minimalist"));

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== currentIndex) {
      swiperRef.current.slideTo(currentIndex);
    }
  }, [currentIndex]);

  const handleSlideChange = (swiper: SwiperType) => {
    const newTemplateId = TEMPLATE_IDS[swiper.activeIndex];
    if (newTemplateId !== active.selectedTemplateId) {
      updateActive({ selectedTemplateId: newTemplateId });
    }
  };

  return (
    <div className="h-full relative flex flex-col bg-muted/40 w-full overflow-hidden group">

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-2 sm:left-4 flex items-center z-20 no-print pointer-events-none">
        <Button
          onClick={() => swiperRef.current?.slidePrev()}
          size="icon"
          variant="outline"
          className="rounded-full shadow-lg h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-md pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-200 -ml-4 group-hover:ml-0 hover:bg-background hover:scale-110 border-muted"
        >
          <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
      </div>

      <div className="absolute inset-y-0 right-2 sm:right-4 flex items-center z-20 no-print pointer-events-none">
        <Button
          onClick={() => swiperRef.current?.slideNext()}
          size="icon"
          variant="outline"
          className="rounded-full shadow-lg h-10 w-10 sm:h-12 sm:w-12 bg-background/90 backdrop-blur-md pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-200 -mr-4 group-hover:mr-0 hover:bg-background hover:scale-110 border-muted"
        >
          <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
        </Button>
      </div>

      <div className="flex-1 w-full h-full relative">
        <Swiper
          modules={[Pagination, Navigation]}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={handleSlideChange}
          initialSlide={currentIndex}
          className="w-full h-full"
        >
          {TEMPLATE_IDS.map(templateId => (
            <SwiperSlide key={templateId} className="w-full h-full overflow-y-auto resume-page-wrap scrollbar-none flex items-start justify-center">
              <A4ScaleWrapper>
                <div id={`resume-print-root-${templateId}`} className="resume-page">
                  <TemplateRenderer profile={{ ...active, selectedTemplateId: templateId }} />
                </div>
              </A4ScaleWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Enhanced Floating Print Button */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 no-print max-md:hidden">
        <Button
          onClick={handlePrint}
          size="lg"
          className="shadow-2xl rounded-full px-6 gap-3 h-14 bg-primary hover:bg-primary/90 text-primary-foreground hover:-translate-y-1 transition-all duration-300"
        >
          <Printer className="h-5 w-5" />
          <span className="font-semibold text-base">Print PDF</span>
        </Button>
      </div>

    </div>
  );
}