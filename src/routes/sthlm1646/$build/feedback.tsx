import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FeedbackDialog } from "@/components/feedback-dialog";

// The game's Done button opens this, so testers land on the popup with their files ready.
// Not pre-rendered: GitHub Pages serves the SPA shell (404.html) for it.
export const Route = createFileRoute("/sthlm1646/$build/feedback")({
  head: ({ params }) => ({
    meta: [
      { title: `Feedback ${params.build} - Stockholm1646 - Ratter Studios` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FeedbackRoute,
});

function FeedbackRoute() {
  const { build } = Route.useParams();
  const navigate = useNavigate();

  return (
    <FeedbackDialog
      build={build}
      onClose={() => navigate({ to: "/sthlm1646", resetScroll: false })}
    />
  );
}
