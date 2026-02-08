import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { problemSolutionData } from "./problemSolutionData";

export default function ProblemSolutionSection() {
  return (
    <div className="relative z-10 -mt-7 flex flex-col gap-13 p-3 md:p-6 lg:p-4 pb-6 rounded-card-large bg-white">
      {problemSolutionData.map((section) => (
        <Card
          key={section.title}
          className="p-0 bg-transparent border-0 shadow-none"
        >
          <div className="aspect-[0.89/1] rounded-card-medium bg-teal-500"></div>
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
