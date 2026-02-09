import { Icon } from "@/components";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { featuresData } from "./featuresData";

export default function Features() {
  return (
    <div className="relative z-10 -mt-5 md:-mt-4 lg:mt-0 rounded-card-large bg-primary-3 pt-13 px-3 pb-6 md:px-6 md:pt-17.5 lg:px-17.5 lg:pb-17.5 lg:pt-22.5">
      <h2 className="text-h4 md:text-h3 lg:text-h2 max-w-152.5 text-center text-white mb-8 md:mb-13 mx-auto">
        Fitur yang Membantu Kamu Lebih Percaya Diri
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featuresData.map((feature) => (
          <Card
            key={feature.title}
            className="rounded-card-medium border border-card-border inset-shadow-card  md:py-11"
          >
            <CardHeader className="px-6 md:px-11 gap-6">
              <div className="rounded-full bg-primary-5 w-fit p-6">
                <Icon name={feature.icon} fill="white" size={44} />
              </div>
              <CardTitle>
                <h3 className="text-h5">{feature.title}</h3>
              </CardTitle>
              <CardDescription>{feature.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
