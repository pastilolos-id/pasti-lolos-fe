import { Table } from "@/components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";
import { bumnColumns, bumnTableData, cpnsColumns, cpnsTableData } from "./data";

export default function RankingSection({
  className,
}: React.ComponentProps<"section">) {
  return (
    <Tabs
      defaultValue="bumn"
      className={cn(
        "order-1 md:order-2",
        "bg-[linear-gradient(180deg,#448AFF_0%,#25A0AB_50.96%,#25A0AB_100%)] rounded-3xl p-3",
        className,
      )}
    >
      <div className="bg-primary-5 rounded-b-3xl py-3 mb-3">
        <h2 className="text-white text-2xl w-full min-w-80 mx-auto font-bold text-center tracking-[0.4] mb-4">
          🏆 Ranking Tryout 🏆
        </h2>
        <TabsList>
          <TabsTrigger value="bumn">BUMN</TabsTrigger>
          <TabsTrigger value="cpns">CPNS</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="bumn">
        <Table columns={bumnColumns} data={bumnTableData} withNumber />
      </TabsContent>

      <TabsContent value="cpns">
        <Table columns={cpnsColumns} data={cpnsTableData} withNumber />
      </TabsContent>
    </Tabs>
  );
}
