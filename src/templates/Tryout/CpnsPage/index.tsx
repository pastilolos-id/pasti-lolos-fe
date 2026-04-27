import { getTryoutListContent } from "../data";
import TryoutLayout from "../TryoutLayout";

export default function CpnsPage() {
  const content = getTryoutListContent("cpns");

  return (
    <TryoutLayout
      category="cpns"
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
        detailHref: `/tryout/cpns/${item.id}`,
      }))}
    />
  );
}
