export interface CampaignDeliveryHistory {
  id: string;
  campaign_id: string;
  title: string;
  note: string | null;
  delivery_hash: string;
  blockchain_tx_hash: string | null;
  created_by: string;
  created_at: string;
}
