import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { Card } from "@/core/components/ui/card";
import { useDistributorAssignment } from "@/modules/assignment/hooks/use-distributor-by-id";
import { useGetCurrentUserContext } from "@/core/providers/use-get-current-user";
import CircularLoading from "@/core/components/ui/circular-loading";
import { RichTextViewer } from "@/core/components/ui/input/app-rich-text-editor/components/Editor/rich-text-viewer";

interface DeliveryHistoryNotesProps {
  campaignId: string;
}

export const DeliveryHistoryNotes = ({
  campaignId,
}: DeliveryHistoryNotesProps) => {
  const { user, loading: userLoading } = useGetCurrentUserContext();

  const {
    data: assignmentData,
    loading: assignmentLoading,
    error: assignmentError,
  } = campaignId && user?.id
    ? useDistributorAssignment(campaignId, user.id)
    : { data: null, loading: false, error: null };

  return (
    <Card className="m-auto p-6 lg:max-w-[50%]">
      <Title text={"Catatan untuk Distributor"} />
      <Line />
      {(userLoading || assignmentLoading) && <CircularLoading />}

      {!userLoading && !assignmentLoading && (
        <>
          {assignmentData && !assignmentError && (
              <RichTextViewer content={assignmentData?.notes ?? ""} />
          )}
          {(!assignmentData || assignmentError) && (
            <p className="mt-3 text-center text-xs text-gray-500">
              Belum ada catatan
            </p>
          )}
        </>
      )}
    </Card>
  );
};
