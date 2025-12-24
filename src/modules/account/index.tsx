import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import { AccountInformationCard } from "./components/account-information-card";
import { UpdatePasswordCard } from "./components/update-password-card";
import { MarginBottomBottomBar } from "@/core/components/ui/margin-bottom-bottom-bar";

export const Account = () => {
  return (
    <BasePage>
      {/* Header  */}

      {/* Body */}
      <AccountInformationCard />
      <UpdatePasswordCard />
      <MarginBottomBottomBar />
    </BasePage>
  );
};
