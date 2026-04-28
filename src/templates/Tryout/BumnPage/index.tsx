import { getTryoutListContent } from "../data";
import TryoutLayout from "../TryoutLayout";

export default function BumnPage() {
  const content = getTryoutListContent("bumn");

  return (
    <TryoutLayout
      category="bumn"
      bannerSubtitle={content.bannerSubtitle}
      bannerTitle={content.bannerTitle}
      cards={content.items.map((item) => ({
        id: item.id,
        title: item.title,
        totalQuestions: item.totalQuestions,
        durationMinutes: item.durationMinutes,
        price: item.price,
        specialPrice: item.specialPrice,
        originalPrice: item.originalPrice,
        detailHref: `/tryout/bumn/${item.id}/preview`,
      }))}
    />
  );
}
