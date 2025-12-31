
import { supabaseServer } from '@/core/lib/supabase/supabase-server'
import { createCampaignDeliveryHistory } from '@/modules/campaign/pages/create_delivery_report/services/create-campaign-delivery-history'
import { saveCampaignDeliveryToBlockchain } from
    '@/modules/campaign/pages/create_delivery_report/services/save-campaign-delivery-to-blockchain'
import { generateCampaignDeliveryHash } from
    '@/modules/campaign/pages/create_delivery_report/utils/generate-campaign-delivery-hash'

jest.mock('@/core/lib/supabase/supabase-server')
jest.mock('@/modules/campaign/pages/create_delivery_report/services/save-campaign-delivery-to-blockchain')
jest.mock('@/modules/campaign/pages/create_delivery_report/utils/generate-campaign-delivery-hash')

describe('createCampaignDeliveryHistory', () => {
    const insertMock = jest.fn()
    const selectMock = jest.fn()
    const singleMock = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()

            ; (supabaseServer as jest.Mock).mockResolvedValue({
                from: () => ({
                    insert: insertMock,
                }),
            })

        insertMock.mockReturnValue({
            select: selectMock,
        })

        selectMock.mockReturnValue({
            single: singleMock,
        })
    })

    it('berhasil membuat campaign delivery history', async () => {
        ; (generateCampaignDeliveryHash as jest.Mock).mockReturnValue('hash123')

            ; (saveCampaignDeliveryToBlockchain as jest.Mock).mockResolvedValue({
                txHash: '0xtxhash',
                blockNumber: 123,
                gasUsed: '21000',
            })

        singleMock.mockResolvedValue({
            data: { id: 'cdh-1', title: 'Laporan' },
            error: null,
        })

        const result = await createCampaignDeliveryHistory({
            campaign_id: 'cmp-1',
            title: 'Laporan',
            note: 'Catatan',
            created_by: 'user-1',
        })

        expect(generateCampaignDeliveryHash).toHaveBeenCalled()
        expect(saveCampaignDeliveryToBlockchain).toHaveBeenCalled()
        expect(result.data.id).toBe('cdh-1')
        expect(result.blockchain_tx_hash).toBe('0xtxhash')
    })

    it('throw error jika supabase gagal', async () => {
        ; (generateCampaignDeliveryHash as jest.Mock).mockReturnValue('hash123')

            ; (saveCampaignDeliveryToBlockchain as jest.Mock).mockResolvedValue({
                txHash: '0xtxhash',
                blockNumber: 123,
                gasUsed: '21000',
            })

        singleMock.mockResolvedValue({
            data: null,
            error: { message: 'DB error' },
        })

        await expect(
            createCampaignDeliveryHistory({
                campaign_id: 'cmp-1',
                title: 'Laporan',
                created_by: 'user-1',
            })
        ).rejects.toThrow('DB error')
    })
})
