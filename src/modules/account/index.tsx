import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import { AccountInformationCard } from "./components/account-information-card";
import { UpdatePasswordCard } from "./components/update-password-card";

export const Account = () => {
  return (
    <BasePage>
      {/* Header  */}

      {/* Body */}
      <AccountInformationCard />
      <UpdatePasswordCard />
    </BasePage>
  );
};
