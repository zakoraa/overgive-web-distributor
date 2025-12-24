import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import AssignmentBody from "./components/assignment-body";
import { CampaignAssignmentProvider } from "./providers/campaign-assignment-provider";
import { MarginBottomBottomBar } from "@/core/components/ui/margin-bottom-bottom-bar";

export const Assigment = () => {
  return (
    <BasePage>
      <Title size="lg" text="Penugasan Distribusi" />
      <CampaignAssignmentProvider>
        <AssignmentBody />
      </CampaignAssignmentProvider>
      <MarginBottomBottomBar />
    </BasePage>
  );
};
