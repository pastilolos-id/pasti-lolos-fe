import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { problemSolutionData } from "./problemSolutionData";

export default function ProblemSolutionSection() {
  return (
    <div className="relative z-10 -mt-10 flex flex-col gap-13 p-3 md:p-6 lg:p-4 pb-6 rounded-card-large bg-white">
      {problemSolutionData.map((section) => (
        <Card key={section.title} className="p-0 border-0 shadow-none">
          <Image
            src={section.image}
            alt={section.title}
            className="w-full h-full object-cover  rounded-card-medium bg-gradient-problem-solution-card"
          />
          <div>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 text-white text-sm font-bold">
              {section.itemList.map((item, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: false positive
                  key={index}
                  className={`flex gap-3 items-center p-4 w-full grow ${section.id === 1 ? "bg-red" : "bg-green"} rounded-full`}
                >
                  <p>O</p>
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
