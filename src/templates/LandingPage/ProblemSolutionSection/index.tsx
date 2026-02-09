import Image from "next/image";
import { Icon } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { problemSolutionData } from "./problemSolutionData";

export default function ProblemSolutionSection() {
  return (
    <div className="relative z-10 -mt-10 flex flex-col gap-13 p-3 md:p-6 lg:p-4 pb-6 md:pb-13 lg:pb-4 rounded-card-large bg-white">
      {problemSolutionData.map((section) => (
        <Card
          key={section.title}
          className="p-0 border-0 shadow-none gap-8 lg:gap-0 lg:flex-row lg:items-center"
        >
          <picture
            className={`${section.id === 1 ? "lg:order-1" : "lg:order-2"} flex-1/2`}
          >
            {/* Tablet dan Desktop: Layar 768px ke atas */}
            <source
              srcSet={section.image.desktop.src}
              media="(min-width: 768px)"
            />
            <Image
              src={section.image.mobile}
              alt={section.title}
              className="w-full h-full object-cover rounded-card-medium bg-gradient-problem-solution-card"
            />
          </picture>

          <div
            className={`${section.id === 1 ? "lg:order-2" : "lg:order-1"} flex-1/2 flex flex-col gap-6 md:gap-8 lg:gap-11 md:px-8 lg:px-13`}
          >
            <CardHeader>
              <CardTitle className="md:text-h3 md:px-0">
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 md:px-0 text-white text-sm md:text-base font-bold">
              {section.itemList.map((item, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                  key={index}
                  className={`flex gap-3 items-center p-4 w-full grow ${section.id === 1 ? "bg-red" : "bg-green"} rounded-full`}
                >
                  <Icon name={section.icon} />
                  <p>{item}</p>
                </div>
              ))}
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  );
}
