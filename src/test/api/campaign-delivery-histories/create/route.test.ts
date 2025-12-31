jest.mock(
  '@/modules/campaign/pages/create_delivery_report/services/create-campaign-delivery-history',
  () => ({
    createCampaignDeliveryHistory: jest.fn(),
  })
)


import { POST } from '@/app/api/campaign-delivery-histories/create/route'
import { createCampaignDeliveryHistory } from
  '@/modules/campaign/pages/create_delivery_report/services/create-campaign-delivery-history'

describe('POST createCampaignDeliveryHistory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('400 jika payload tidak lengkap', async () => {
    const req = {
      json: async () => ({})
    } as any

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(400)
    expect(json.error).toBeDefined()
  })

  it('200 jika berhasil', async () => {
    ;(createCampaignDeliveryHistory as jest.Mock).mockResolvedValue({
      data: { id: 'cdh-1' },
      blockchain_tx_hash: '0xtx',
    })

    const req = {
      json: async () => ({
        campaign_id: 'cmp-1',
        title: 'Laporan',
        created_by: 'user-1',
      }),
    } as any

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(200)
    expect(json.success).toBe(true)
    expect(json.blockchain_tx_hash).toBe('0xtx')
  })

  it('500 jika service throw error', async () => {
    ;(createCampaignDeliveryHistory as jest.Mock)
      .mockRejectedValue(new Error('boom'))

    const req = {
      json: async () => ({
        campaign_id: 'cmp-1',
        title: 'Laporan',
        created_by: 'user-1',
      }),
    } as any

    const res = await POST(req)
    const json = await res.json()

    expect(res.status).toBe(500)
    expect(json.error).toBe('boom')
  })
})
