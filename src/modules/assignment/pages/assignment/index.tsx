import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import AssignmentBody from "./components/assignment-body";

export const Assigment = () => {
  return (
    <BasePage>
      <Title size="lg" text="Penugasan Distribusi" />

      <AssignmentBody/>
    </BasePage>
  );
};
